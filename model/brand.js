const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    subcategoryId :{
        type :mongoose.Schema.Types.ObjectId,
        ref :'subCategory',
        required : true
    },
    extracategoryId :{
        type :mongoose.Schema.Types.ObjectId,
        ref :'extraCategory',
        required :true
    },
    brandname :{
        type :String,
        required : true
    },
    createdAt :{
        type :String,
        required :true
    },
    updatedAt :{
        type :String,
        required :true
    },
    isActive :{
        type :Boolean,
        required :true
    }
})

const brand = mongoose.model('brand', brandSchema);

module.exports = brand;