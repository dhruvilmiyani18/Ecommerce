const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path')

const ProductSingleImage = '/uploads/product/singleimg';
const ProductMultipleImg = '/uploads/product/multipleimg';

const productSchema = mongoose.Schema({
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
    typeId :{
        type :mongoose.Schema.Types.ObjectId,
        ref :'type',
        required : true
    },
    brandId :{
        type :mongoose.Schema.Types.ObjectId,
        ref :'brand',
        required : true
    } ,
    productname :{
        type : String,
        required :true
    },
    productprice :{
        type : String,
        required :true
    },
    OldPrice :{
        type:String,
        required : true
    },
    description :{
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
    },
    singleImage :{
        type : String,
        required :true
    },
    multipleImage :{
        type :Array,
        required :true
    }

})

const ImagesStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        // console.log(file.fieldname);
        if(file.fieldname =='singleImage'){
            cb(null,path.join(__dirname,'..',ProductSingleImage));
        }
        else{
            cb(null,path.join(__dirname,'..',ProductMultipleImg));
        }
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname +'-'+Date.now());
    }
})

productSchema.statics.productImagesuploaded = multer({storage :ImagesStorage}).fields([{name :'singleImage',maxCount :1},{name : 'multipleImage', maxCount : 5}]);

productSchema.statics.singleproductImg = ProductSingleImage;
productSchema.statics.multipleImg = ProductMultipleImg;

const product = mongoose.model('product' , productSchema);

module.exports = product;