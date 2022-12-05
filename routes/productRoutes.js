const express = require('express');

const { createProduct, deleteProduct, updateProduct, getAllProducts, getProduct } = require('../controllers/productController');
const { verifyToken, verifyTokenAuthorization } = require('./verifyToken');
const routes = express.Router();

routes.route('/')
.post(verifyToken,verifyTokenAuthorization,createProduct)
.get(getAllProducts)

routes.route('/:id')
.delete(verifyToken,verifyTokenAuthorization,deleteProduct)
.patch(verifyToken,verifyTokenAuthorization,updateProduct)
.get(getProduct)

module.exports = routes