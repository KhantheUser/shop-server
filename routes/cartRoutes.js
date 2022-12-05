const express = require('express');
const { updateCart, createCart, deleteCart, getCart, getAllCarts } = require('../controllers/cartController');
const { verifyToken, verifyTokenAuthorization } = require('./verifyToken');
const routes = express.Router();



routes.route('/')
.post(verifyToken,createCart)
.get(verifyToken,getAllCarts)

routes.route('/:id')
.delete(verifyToken,deleteCart)
.patch(verifyToken,updateCart)

routes.route('/:userId')
.get(verifyToken,getCart)
module.exports = routes