const express = require('express');
const route = express.Router(); 

const checkAuth = require('../middleware/check-auth');
 
const OrderController = require('../controller/orders');

route.get('/', checkAuth, OrderController.get_all);

route.post('/', checkAuth, OrderController.create_new);

route.get('/:orderId', checkAuth, OrderController.order_by_id);

route.delete('/:orderId', checkAuth, OrderController.delete);

module.exports = route;