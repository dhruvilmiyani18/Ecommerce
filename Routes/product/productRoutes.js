const express = require('express');

const routes = express.Router();
const product =require('../../model/product')

const productController = require('../../Controller/product/productController');

routes.get('/add_product',productController.add_product);

routes.post('/getTypeAndBrandData',productController.getTypeAndBrandData);

routes.post('/productInsertData',product.productImagesuploaded, productController.productInsertData);

routes.get('/view_product',productController.view_product);

routes.get('/productDelete/:id',productController.productDelete);

module.exports = routes;