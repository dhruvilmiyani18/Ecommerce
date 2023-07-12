

const mongoose = require('mongoose');

const multer = require('multer');
const AvatarPath = '../uploads/admin';
const path = require('path');

const adminchema = mongoose.Schema({
  name :{
    type : String,
    required :true
  },
  email :{
    type : String,
    required :true
  },
  password :{
    type : String,
    required :true
  },
  AdminImages:{
    type : String,
    required :true
  },
  mnumber :{
    type: Number,
    required:true
  },
  city :{
    type : String,
    required : true
  },
  isActive :{
    type :Boolean,
    required :true
  },
  crateAt :{
    type : String,
    required :true
  },
  updatedAt :{
    type :String,
    required :true
  },
  role :{
    type :String,
    required :true
  }
})


const  Images = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,path.join(__dirname,AvatarPath));
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
        
    }
})

adminchema.statics.adminUploadsImage = multer({storage : Images}).single('AdminImages');
adminchema.statics.adminImagePath = AvatarPath;

 
const admin = mongoose.model('admin', adminchema);

module.exports = admin;


