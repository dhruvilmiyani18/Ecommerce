const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    subcategory :{
        type :String,
        required :true
    },
    categoryId:{
        type :mongoose.Schema.Types.ObjectId,
        ref :'category',
        required :true
    },
    isActive :{
        type :Boolean,
        required: true
    },
    createdAt :{
        type : String,
        required : true
    },
    updatedDate :{
        type :String,
        required :true
    }
   

});


const subCategory = mongoose.model('subCategory' , subCategorySchema);

module.exports= subCategory;