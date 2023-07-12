const category = require('../../model/category');

const subcategory = require('../../model/subcategory');

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});

module.exports.add_subcategory = async (req,res)=>{
    let categorydata = await category.find({});
  
    return res.render('admin/form/add_subcategory',{categorydata : categorydata})
    
}

module.exports.subcategory_insertdata= async(req,res)=>{
    // console.log(req.body);

    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedDate = nDate;

    let subcategoryData = await subcategory.create(req.body);
    console.log(subcategoryData)

    if(subcategoryData){
        return res.redirect('back')
    }
    
}

module.exports.view_subcategory = async (req,res)=>{
   



  if(req.query.active){
    console.log('active');
   let action = await subcategory.findByIdAndUpdate(req.query.active,{
    isActive : false,
   })
}

if(req.query.deactive){
    console.log('deactive');
    let action = await subcategory.findByIdAndUpdate(req.query.deactive,{
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


let data = await subcategory.find({
$or: [
    { subcategory: { $regex: search, $options: 'i' } }
]
})
.limit(limit * 1)
.skip((page - 1) * limit)
.exec()


let count = await subcategory.find({
$or: [
    { subcategory: { $regex: search, $options: 'i' } }
]
})
.countDocuments()

if (data) {
return res.render('admin/table/subcategorytable', {
    record: data,
    totalPage: Math.ceil(count / limit),
    searchData: search
})
}
}

module.exports.subCatDelete = async(req,res)=>{
    // console.log(req.params);

    let sd = await subcategory.findByIdAndDelete(req.params.id);
    return res.redirect('back')
}