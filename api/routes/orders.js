const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/products');

route.get('/', (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .exec()
        .then((orders) => {
            const response = {
                count: orders.length,
                orders: orders.map((doc) => {
                    return {
                        _id: doc._id,
                        product: doc.productId,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            }
            res.status(200)
                .json(response);
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        });
});

route.post('/', (req, res, next) => {

    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(401).json({
                    message: "Product Not Found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then((result) => {
            res.status(201).json({
                message: "Order Created",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })



});

route.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .select('product quantity _id')
        .exec()
        .then((order) => {
            if (!order) {
                res.status(404).json({
                    message: "Order Not Found"
                });
            } else {
                res.status(200).json({
                    order: order,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/'
                    }
                });
            }

        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

route.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    Order.deleteOne({ _id: orderId })
        .exec()
        .then((response) => {
            res.status(201).json(
                {
                    message: 'Order Deleted',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/',
                        body: { productId: "ID", quantity: "Number" }
                    }
                }
            );
        }).catch((err) => {
            res.status(201).json({
                message: err
            });
        })

});

module.exports = route;