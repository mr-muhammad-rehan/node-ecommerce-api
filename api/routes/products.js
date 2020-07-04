
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Products Requests'
    })
});


router.post('/', (req, res, next) => {
    const product = {
      name: req.body.name,
      price: req.body.price,
    }
    console.log(req.body)

    res.status(201).json({
        message: 'Handling Products Requests POST',
        createdProduct:product
    })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "Responsind to Id",
        id: id
    })
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