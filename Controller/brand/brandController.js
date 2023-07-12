const category = require('../../model/category');
const extracategory = require('../../model/extracategory');
const brand = require('../../model/brand');

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });

module.exports.add_brand = async (req, res) => {
    let categoryData = await category.find({});

    return res.render('admin/form/add_brand',
        {
            'categoryData': categoryData,
        }
    );
}

module.exports.getExtraCategory = async (req,res)=>{
    // console.log(req.body.subcategoryId);
    let extraCategoryData = await extracategory.find({subcategoryId : req.body.subcategoryId})
    // console.log(extraCategoryData)

    let  option = `<option value=''>--Select ExtraCategory-- </option> `
    for (var ecd of extraCategoryData){
    option += `<option value='${ecd.id}'> ${ecd.extracategoryName} </option>`
    }

    return res.json(option);
}

module.exports.insertBrand = async (req,res)=>{
    // console.log(req.body);

    req.body.createdAt = nDate ;
    req.body.updatedAt =nDate ;
    req.body.isActive = true

    let data = await brand.create(req.body);

    if(data){
        return res.redirect('back')
    }
}

module.exports.viewbrand = async (req,res)=>{
   
  

    if(req.query.active){
        console.log('active');
       let action = await brand.findByIdAndUpdate(req.query.active,{
        isActive : false,
       })
    }

    if(req.query.deactive){
        console.log('deactive');
        let action = await brand.findByIdAndUpdate(req.query.deactive,{
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


let data = await brand.find({
    $or: [
        { brandname: { $regex: search, $options: 'i' } }
    ]
})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

    
let count = await brand.find({
    $or: [
        { brandname: { $regex: search, $options: 'i' } }
    ]
})
    .countDocuments()

if (data) {
    return res.render('admin/table/brandtable', {
        record: data,
        totalPage: Math.ceil(count / limit),
        searchData: search
    })
}
}

module.exports.brandDelete = async(req,res)=>{
    // console.log(req.params);
    let pd = await brand.findByIdAndDelete(req.params.id);
    return res.redirect('back')
  }