const express = require('express');

const routes = express.Router();

const subcategoryCntroller = require('../../Controller/subCategory/subcategory');

routes.get('/add_subcategory',subcategoryCntroller.add_subcategory);

routes.post('/subcategory_insertdata',subcategoryCntroller.subcategory_insertdata);

routes.get('/view_subcategory',subcategoryCntroller.view_subcategory)

routes.get('/subCatDelete/:id',subcategoryCntroller.subCatDelete);



module.exports= routes;


