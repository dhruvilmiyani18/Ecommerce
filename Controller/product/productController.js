const category = require('../../model/category');
const brand = require('../../model/brand');
const type = require('../../model/type');
const product = require('../../model/product');

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });
  


module.exports.add_product = async (req, res) => {

    let categoryData = await category.find({});

    return res.render('admin/form/add_product', { 'categoryData': categoryData });
}

module.exports.getTypeAndBrandData = async (req, res) => {

    // console.log(req.body.extracategoryId);

    let branddata = await brand.find({ extracategoryId: req.body.extracategoryId });
    // console.log(branddata);
    let typedata = await type.find({ 'extracategoryId': req.body.extracategoryId });
    // console.log(typedata);

    return res.render('admin/form/getbrandandtypeajex',
        {
            'branddata': branddata,
            'typedata': typedata
        }
    );
}

module.exports.productInsertData = async (req,res)=>{

  // console.log(req.files.singleImage);
  // console.log('br bhbhvv');
  // console.log(req.files.multipleImage);

  let singleImgstore ='';
  if(req.files.singleImage ){
    singleImgstore = product.singleproductImg+'/'+req.files.singleImage[0].filename;
  
  }

  let multimg = [];
  if(req.files.multipleImage){
    for(var i=0; i<req.files.multipleImage.length; i++){
     multimg.push(product.multipleImg+'/'+req.files.multipleImage[i].filename);
    }
  }
  // console.log(singleImgstore);
  console.log(multimg);
    
  req.body.singleImage = singleImgstore;
    req.body.multipleImage = multimg;

    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    
    req.body.isActive = true;

  let data = await product.create(req.body);
 console.log(data)
  if(data){
    return res.redirect('back');
  }
}
module.exports.view_product = async(req,res)=>{

  if(req.query.active){
    console.log('active');
   let action = await product.findByIdAndUpdate(req.query.active,{
    isActive : false,
   })
}

if(req.query.deactive){
    console.log('deactive');
    let action = await product.findByIdAndUpdate(req.query.deactive,{
     isActive : true,
    })
 }

var search = '';
if (req.query.search) {
search = req.query.search;
}

var page = 1;
if (req.query.page) {
page = req.query.page
}
let limit = 5;


let data = await product.find({
$or: [
    { productname: { $regex: search, $options: 'i' } }
]
})
.limit(limit * 1)
.skip((page - 1) * limit)
.exec()


let count = await product.find({
$or: [
    { productname: { $regex: search, $options: 'i' } }
]
})
.countDocuments()

if (data) {
return res.render('admin/table/producttable', {
    record: data,
    totalPage: Math.ceil(count / limit),
    searchData: search
})
}
}
module.exports.productDelete = async(req,res)=>{
  // console.log(req.params);
  let pd = await product.findByIdAndDelete(req.params.id);
  return res.redirect('back')
}





