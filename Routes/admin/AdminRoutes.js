const express = require('express');

const Routes = express.Router();

const admin = require('../../model/admin');

const passport = require('../../Config/passport-local');

const AdminController = require('../../Controller/Admin/AdminCnt');
const routes = require('../category/categoryRoutes');

Routes.get('/dashbord',passport.checkAuthenticatedUser, AdminController.Dashbord);

Routes.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        
        return res.redirect('/dashbord')
    }
    return res.render('admin/login')
});


Routes.post('/loginInsertData', passport.authenticate("admin-login", { failureRedirect: "/" }), AdminController.loginInsertData);

Routes.get('/adminForm',passport.checkAuthenticatedUser, AdminController.GetAdminForm);

Routes.get('/Getadmintable',passport.checkAuthenticatedUser, AdminController.GetAdminTable);
Routes.get('/adminDelete/:id',AdminController.adminDelete);

Routes.post('/adminFormInsertData', admin.adminUploadsImage, AdminController.adminFormInsertData,);



Routes.use('/category',passport.checkAuthenticatedUser,require('../category/categoryRoutes'));
Routes.use('/subcategory',passport.checkAuthenticatedUser,require('../subcategory/subcategoryRoutes'));
Routes.use('/extracategory',passport.checkAuthenticatedUser,require('../extracategory/extracategoryRoutes'));
Routes.use('/brand',passport.checkAuthenticatedUser,require('../brand/brandRoutes'));
Routes.use('/type',passport.checkAuthenticatedUser,require('../type/typeRoutes'));
Routes.use('/product',passport.checkAuthenticatedUser,require('../product/productRoutes'));

Routes.get('/adminlogout', async (req,res,next)=>{
    req.logout(function(err){
        if(err){
            console.log(err);
        }
        next();
    });
    return res.redirect('/');
});

Routes.get('/chengePassword',AdminController.chengePassword);

Routes.post('/insertChangePassword',AdminController.insertChangePassword);


module.exports = Routes;
