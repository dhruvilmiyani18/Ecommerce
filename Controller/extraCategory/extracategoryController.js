const category = require('../../model/category');

const subcategory = require('../../model/subcategory');

const extraCategory = require('../../model/extracategory');

const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});



module.exports.add_extracategory = async (req, res) => {
  // console.log(req.body)
  var categoryData = await category.find({});
  return res.render('admin/form/add_extracategory', { categoryData: categoryData })
}


module.exports.getsubcategory = async (req, res) => {
  // console.log(req.body)
  let subCatData = await subcategory.find({ categoryId: req.body.categoryId });

  var option = `<option value=''>--Select Subcategory--</option>`;
  for (var sub of subCatData) {
    option += `<option value='${sub.id}'> ${sub.subcategory} </option>`;
  }

  return res.json(option);

}

module.exports.insertExtraCategory =async (req, res) => {
  // console.log(req.body)
    
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;
    req.body.isActive = true;
  
  let data = await extraCategory.create(req.body);

  if(data){
    return res.redirect('back')
  }
}
module.exports.view_extracategory = async(req,res)=>{
 

  if(req.query.active){
    console.log('active');
   let action = await extraCategory.findByIdAndUpdate(req.query.active,{
    isActive : false,
   })
}

if(req.query.deactive){
    console.log('deactive');
    let action = await extraCategory.findByIdAndUpdate(req.query.deactive,{
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
let limit = 2;


let data = await extraCategory.find({
$or: [
    { extracategoryName: { $regex: search, $options: 'i' } }
]
})
.limit(limit * 1)
.skip((page - 1) * limit)
.exec()


let count = await extraCategory.find({
$or: [
    { extracategoryName: { $regex: search, $options: 'i' } }
]
})
.countDocuments()

if (data) {
return res.render('admin/table/extracategorytable', {
    record: data,
    totalPage: Math.ceil(count / limit),
    searchData: search
})
}
}

module.exports.ExtraCatDelete = async (req,res)=>{
  // console.log(req.params);
  let ed = await extraCategory.findByIdAndDelete(req.params.id);
  return res.redirect('back')
}