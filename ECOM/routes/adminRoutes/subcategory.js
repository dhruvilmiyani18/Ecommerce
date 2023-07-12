const express = require('express');

const routes = express.Router();
const subcategoryController = require('../../controllers/AdminController/subcategoryController')


routes.get('/add_subcategory',  subcategoryController.add_subcategory);


module.exports = routes;