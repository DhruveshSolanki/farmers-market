const express = require('express');
const authCtrl = require('../controllers/auth.controller.js')
const router = express.Router();

const productCtrl = require('../controllers/product.controller.js');

//create product endpoint
router.route('/')
    .get(authCtrl.requireSignin, productCtrl.getAllProducts)
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.createProduct)

//update product by id 
router.route('/:id')
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.updateProduct)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.deleteProduct)

//update product stock by id 
router.route('/:id/stock')
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.updateProductStock);

//update product stock by id
router.route('/:id/stock')
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.updateProductStock);

//update product price by id
router.route('/:id/price')
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.updateProductPrice);

module.exports = router;