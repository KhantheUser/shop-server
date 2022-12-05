const express = require('express');
const { createOrder, updateOrder, deleteOrder, getOrder, getAllOrders, getMonthly } = require('../controllers/orderController');
const { verifyToken, verifyTokenAuthorization } = require('./verifyToken');
const routes = express.Router();


routes.route('/')
.post(verifyToken,verifyTokenAuthorization,createOrder)
.get(verifyToken,verifyTokenAuthorization,getAllOrders)

routes.route('/:id')
.delete(verifyToken,verifyTokenAuthorization,deleteOrder)
.patch(verifyToken,verifyTokenAuthorization,updateOrder)

routes.route('/:userId')
.get(verifyToken,verifyTokenAuthorization,getOrder)

routes.route('/find/income')
.get(verifyToken,verifyTokenAuthorization,getMonthly)
module.exports = routes