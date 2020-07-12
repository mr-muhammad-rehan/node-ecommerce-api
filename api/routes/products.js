
const express = require('express');
const router = express.Router(); 

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
 
const ProductController = require('../controller/products');

const storageConf = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {

        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //reject File
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File not found'), false);
    }
}

const upload = multer({
    storage: storageConf,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
});



router.get('/', ProductController.get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductController.add_product);

router.get('/:productId', ProductController.get_by_id);

router.patch('/:productId', checkAuth, upload.single('productImage'),   ProductController.update);

router.delete('/:productId',  checkAuth, ProductController.delete);



module.exports = router;