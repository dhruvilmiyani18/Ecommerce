const Category = require('../../models/Category');

module.exports.add_subcategory = async (req,res) =>{
    let catData = await Category.find({});
    return res.render("Add_subcategory",{
        catdata : catData
    });
}