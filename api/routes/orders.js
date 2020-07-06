const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const order = require('../models/order');
const e = require('express');

route.get('/', (req, res, next) => {
    order.find()
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

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });

    order.save()
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

route.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    order.findById(orderId)
        .select('product quantity _id')
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err)=>{
            res.status(500).json(err);
        });
});

route.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    order.deleteOne({_id: orderId})
    .exec()
    .then((response)=>{
        
    })
    res.status(201).json({
        message: "responce to order delete"
    })
});

module.exports = route;