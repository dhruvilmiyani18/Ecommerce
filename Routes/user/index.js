const express = require('express');
const passport = require('passport');

const routes = express.Router();

const userController = require('../../Controller/user/userController');


routes.get('/',userController.dashbord)


routes.get('/product/:id/:subId/:extraId',userController.product);

routes.post('/findBrandWisedata',userController.findBrandWisedata);

routes.get('/productView/:productid',userController.viewDetail);

routes.get('/register',userController.register);

routes.post('/insertRegisterData',userController.insertRegisterData);

routes.get('/userlogin',userController.userlogin);

routes.post('/insertLoginData',passport.authenticate('user-login',{failureRedirect: "/user/userlogin",failureFlash : "Invalid user email & password"  }),userController.insertLoginData);

routes.get('/logout', async (req,res,next)=>{
    req.logout(function(err){
        if(err){
            console.log(err);
        }
        next();
    });
    return res.redirect('/user');
});

routes.get('/cart',userController.cart);

routes.post('/addToCart',userController.addToCart);

routes.get('/removeProductCart/:id',userController.removeProductCart);

routes.post('/productQuantity',userController.productQuantity);

module.exports = routes;    

