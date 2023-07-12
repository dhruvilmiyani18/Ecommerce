const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/Ecommerce");

const db = mongoose.connection;


db.once('open', function(err){
    if(err){
        console.log("Something wrong");
        return false;
    }
    console.log("Connected");
})

module.exports = db;