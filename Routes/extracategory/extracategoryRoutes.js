const express = require('express');

const routes = express.Router();

const extracategoryController = require('../../Controller/extraCategory/extracategoryController');



routes.get('/add_extracategory',extracategoryController.add_extracategory);

routes.post('/getsubcategory', extracategoryController.getsubcategory);

routes.post('/insertExtraCategory',extracategoryController.insertExtraCategory);

routes.get('/view_extracategory',extracategoryController.view_extracategory);

routes.get('/ExtraCatDelete/:id',extracategoryController.ExtraCatDelete);

module.exports= routes;

