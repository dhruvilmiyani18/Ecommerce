const express = require('express');

const routes = express.Router();

const Category = require('../../models/Category');

const categoryController = require('../../controllers/AdminController/categoryController');


routes.get('/add_category',  categoryController.add_category);

routes.post('/insertCategory',Category.uploadedAvatar, categoryController.insertCategory);

routes.get("/view_category", categoryController.view_category);

routes.post("/deactiveMultiRecord", categoryController.deactiveMultiRecord);
module.exports = routes;