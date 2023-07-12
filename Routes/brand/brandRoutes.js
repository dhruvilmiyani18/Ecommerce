const express = require('express');

const routes = express.Router();

const brandController = require('../../Controller/brand/brandController');

routes.get('/add_brand',brandController.add_brand);

routes.post('/getExtraCategory',brandController.getExtraCategory);

routes.post('/insertBrand',brandController.insertBrand);

routes.get('/viewbrand',brandController.viewbrand);

routes.get('/brandDelete/:id',brandController.brandDelete);

module.exports = routes;