const Category = require('../../models/Category');

module.exports.add_category = async (req,res) =>{
    
    return res.render('Add_category');
}

module.exports.insertCategory = async (req,res) =>{
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
   var image = '';
   if(req.file){
    image = Category.avatarPath+"/"+req.file.filename;
   }
   req.body.categoryImage = image;
   req.body.createdAt = nDate;
   req.body.updatedAt = nDate;
   req.body.isActive = true;
   let categorydata = await Category.create(req.body);
   if(categorydata){
      req.flash("success", "Category Added Successfully");
      return res.redirect('/category/add_category');
   }
   else{
    req.flash("error", "Something wrong");
    return res.redirect('/category/add_category');
   }
}


module.exports.view_category = async (req,res) =>{
    let categoryData = await Category.find({});
    if(categoryData){
        return res.render('view_category',{
            'catData' : categoryData
        })
    }
    else{
        req.flash("error", 'record not found');
        categoryData = "null data";
        return res.render('view_category',{
            'catData' : categoryData
        })
    }
}

module.exports.deactiveMultiRecord = async (req,res) =>{
    // console.log(req.body.deactiveRecord.length);
    var multi = req.body.deactiveRecord;
    for(var i=0; i<multi.length; i++){
       await Category.findByIdAndUpdate(multi[i],{isActive:false});
    }

    return res.redirect('/category/view_category');
}