const mongoose = require('mongoose');

const AVATAR_PATH = "/uploads/Category";

const multer = require('multer');

const path = require('path');

const CategoryController = mongoose.Schema({
    category_name : {
        type : String,
        required : true,
    },
   
    categoryImage : {
        type : String,
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
    }
});

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

CategoryController.statics.uploadedAvatar = multer({storage:storage}).single('categoryImage');
CategoryController.statics.avatarPath = AVATAR_PATH;

const Category = mongoose.model('Category', CategoryController);

module.exports = Category;