const express = require('express');

const routes = express.Router();

const typeController = require('../../Controller/type/typeController');


routes.get('/add_type',typeController.add_type);

routes.post('/getsubcategorydata',typeController.getsubcategorydata);

routes.post('/insertType',typeController.insertType);

routes.get('/view_type',typeController.view_type);

routes.get('/typeDelete/:id',typeController.typeDelete);

module.exports = routes;