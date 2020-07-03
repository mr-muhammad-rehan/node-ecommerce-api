const express = require('express');
const route = express.Router();
 

route.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "responce to order get"
    })
});

route.post('/', (req, res, next)=>{
    res.status(201).json({
        message: "responce to order post"
    })
});

route.get('/:orderId', (req, res, next)=>{
    const orderId = req.params.orderId;
    res.status(201).json({
        message: "responce to order post"
    })
});

route.delete('/:orderId', (req, res, next)=>{
    const orderId = req.params.orderId;
    res.status(201).json({
        message: "responce to order delete"
    })
});

module.exports = route;