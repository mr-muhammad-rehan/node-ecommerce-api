
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');


router.get('/', (req, res, next) => {

    res.status(200).json({
        message: 'Handling Products Requests'
    })
});


router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Product Created',
                createdProduct: product
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
            }else{
                res.status(401).json({message: 'No valid entry found for given ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "Update Responce to Id",
        id: id
    })
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "Update Responce to Id",
        id: id
    })
});


module.exports = router;