const express = require('express');
const app = express();
const morgen = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

app.use(morgen('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//Mongo
mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@node-ecom-cluster.jmrtf.mongodb.net/' + process.env.MONGO_DB_NAME + '?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

//CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authrization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Header', 'PUT, GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//Routs
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});


module.exports = app;


