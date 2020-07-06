const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

route.get('/', (req, res, next) => {

    res.status(200).json({
        message: "responce to order get"
    })
});

route.post('/', (req, res, next) => {

    order.find()
        .exec()
        .then((result)=>{
            res.status(200).json(result);
        }).error();
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
    res.status(201).json({
        message: "responce to order post"
    })
});

route.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(201).json({
        message: "responce to order delete"
    })
});

module.exports = route;