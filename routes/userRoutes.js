const express = require('express');
const { upDateUser, deleteUser, getUser, getAllUser, getStats } = require('../controllers/userController');
const routes = express.Router();
const {verifyTokenAuthorization,verifyToken} = require('./verifyToken')

routes.route('/')
.get(verifyToken,verifyTokenAuthorization,getAllUser)

routes.route('/:id')
.patch(verifyToken,verifyTokenAuthorization,upDateUser)
.delete(verifyToken,verifyTokenAuthorization,deleteUser)
.get(verifyToken,verifyTokenAuthorization,getUser)


routes.route('/find/stats')
.get(verifyToken,getStats)

module.exports = routes