const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const Admin = require('../model/admin');

const user = require('../model/user/user')

const bcrypt = require('bcrypt');

passport.use('admin-login', new passportLocal({
    usernameField: 'email'
}, async function (email, password, done) {
    let admin = await Admin.findOne({ email: email });
    console.log('admin');
    if (!admin || admin.password != password) {
        console.log('ok')
        return done(null, false);
    }
    else {
        return done(null, admin);
    }
}))

passport.use('user-login', new passportLocal({
    usernameField: 'email'
}, async function (email, password, done) {

    let userdata = await user.findOne({ email: email });

    if (!userdata || userdata.password != password) {
     
        return done(null, false);
    }
    else {
        return done(null, userdata);
    }
}))

passport.serializeUser(function (admin, done) {
    return done(null, admin.id);
})

passport.deserializeUser(async function (id, done) {
    let AdminData = await Admin.findById(id);
    if (AdminData) {
        return done(null, AdminData);
    }
    else {
        let UserData = await user.findById(id);
        if(UserData){
            
            return done(null,UserData);
        }
        else{
            return done(null,false);
        }
    }
})

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
    }
    next();
}


passport.checkAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.redirect('/');
    }
}

// data show
passport.getdata = (req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user.role == 'Admin'){
            res.locals.Admin = req.user;
        }
        else{
            res.locals.user = req.user;
        }

    }
    next();
  }

module.exports = passport;