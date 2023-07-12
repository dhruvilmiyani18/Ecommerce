
const mongoose = require('mongoose');

const multer = require('multer');
const path =require('path');
const AvatarPath = '../uploads/category';

const categorySchema = mongoose.Schema({
    category :{
        type :String,
        required :true
    },
    categoryImages :{
        type :String,
        required :true
    },
    isActive :{
        type :Boolean,
        required :true
    },
    createAt :{
        type :String,
        required :true
    },
    updatedAt :{
        type :String,
        required: true
    }
    
})

const Images = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,path.join(__dirname,AvatarPath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})

categorySchema.statics.categoryUploadImg = multer({storage : Images}).single('categoryImages');
categorySchema.statics.adminImagePath = AvatarPath;

const category = mongoose.model('category' ,categorySchema);

module.exports = category;