const mongoose = require('mongoose');


const ExtraCategorySchema = mongoose.Schema({
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        require :true
    },
    subcategoryId :{
        type :mongoose.Schema.Types.ObjectId,
        ref :'subCategory',
        require :true
    },
    extracategoryName :{
        type :String,
        required : true
    },
    createdAt :{
        type :String,
        required : true
    },
    updatedAt :{
        type :String,
        required : true
    },
    isActive :{
        type :Boolean,
        required :true
    }  
})

const extraCategory = mongoose.model('extraCategory',ExtraCategorySchema);

module.exports = extraCategory;