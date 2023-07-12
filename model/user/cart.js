const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    product_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"product",
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    
    isActive :{
        type : Boolean,
        required : true
    },
    createdAt : {
        type : String,
        required : true
    },
    updatedAt : {
        type : String,
        required : true
    },
    order_status:{
        type : String,
        required : true
    }
  
})

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;