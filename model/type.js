const mongoose = require('mongoose');

const typeschema = mongoose.Schema({
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : true,
    },
    subcategoryId :{
        type :mongoose.Schema.Types.ObjectId,
        ref :'subCategory',
        required : true
    },
    extracategoryId :{
        type :mongoose.Schema.Types.ObjectId,
        ref :'extraCategory',
        required : true
    },
    typename :{
        type : String,
        required :true
    },
    isActive :{
        type :Boolean,
        required :true
    },
    createdAt :{
        type : String,
        required :true
    },
    updatedAt :{
        type : String,
        required :true
    }

})

const type = mongoose.model('type' , typeschema);

module.exports= type;