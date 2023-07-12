const express = require('express');

const routes = express.Router();


const categoryController = require('../../Controller/category/categoryController');
const category = require('../../model/category');

routes.get('/add_category',categoryController.add_category);
routes.get('/view_category',categoryController.view_category);

routes.post('/category_insrtData',category.categoryUploadImg, categoryController.category_insrtData);

routes.get('/categoryDelete/:id',categoryController.categoryDelete);

module.exports= routes;