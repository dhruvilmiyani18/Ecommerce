const category = require('../../model/category')


const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});


module.exports.add_category = async (req,res)=>{

    let date =new Date().toJSON().slice(0,10).replace(/-/g,'/');

    return res.render('admin/form/add_category',{date :date})
}

module.exports.category_insrtData =async (req,res)=>{
  
    var img = '';

    if(req.file){
        img = category.adminImagePath +'/'+req.file.filename;

        req.body.categoryImages = img;
        req.body.isActive = true;
        req.body.createAt = nDate;
        req.body.updatedAt = nDate;
    }

    let categoryData = await  category.create(req.body);

    if(categoryData){
        return res.redirect('back');
    }
    
    
}

module.exports.view_category = async (req,res)=>{

    if(req.query.active){
        console.log('active');
       let action = await category.findByIdAndUpdate(req.query.active,{
        isActive : false,
       })
    }

    if(req.query.deactive){
        console.log('deactive');
        let action = await category.findByIdAndUpdate(req.query.deactive,{
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


let data = await category.find({
    $or: [
        { category: { $regex: search, $options: 'i' } }
    ]
})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

    
let count = await category.find({
    $or: [
        { category: { $regex: search, $options: 'i' } }
    ]
})
    .countDocuments()

if (data) {
    return res.render('admin/table/categorytable', {
        record: data,
        totalPage: Math.ceil(count / limit),
        searchData: search
    })
}
}
module.exports.categoryDelete = async(req,res)=>{
    // console.log(req.params);
    let cd = await category.findByIdAndDelete(req.params.id);
    return res.redirect('back')
}