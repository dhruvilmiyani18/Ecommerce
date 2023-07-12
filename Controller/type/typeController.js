const category = require('../../model/category');

const subcategory = require('../../model/subcategory');

const type = require('../../model/type');

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});

module.exports.add_type = async (req, res) => {

    let categoryData = await category.find({});

    return res.render('admin/form/add_type', { 'categoryData': categoryData });

}

module.exports.getsubcategorydata = async (req, res) => {
    // console.log(req.body.categoryId);

    let subCatData = await subcategory.find({ 'categoryId': req.body.categoryId });
    // console.log(subCatData);

    let option = `<option >---select SubCategory---</option>`;
    for (var sub of subCatData) {
        option += `<option value='${sub.id}'>${sub.subcategory}</option>`
    }

    return res.json(option);
}

module.exports.insertType = async (req, res) => {


    req.body.isActive = true;
    req.body.createdAt = nDate;
    req.body.updatedAt = nDate;

    // console.log(req.body);

    let data = await type.create(req.body);

    if (data) {
        return res.redirect('back')
    }
}

module.exports.view_type = async (req, res) => {


    if (req.query.active) {
        console.log('active');
        let action = await type.findByIdAndUpdate(req.query.active, {
            isActive: false,
        })
    }

    if (req.query.deactive) {
        console.log('deactive');
        let action = await type.findByIdAndUpdate(req.query.deactive, {
            isActive: true,
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


    let data = await type.find({
        $or: [
            { typename: { $regex: search, $options: 'i' } }
        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()


    let count = await type.find({
        $or: [
            { typename: { $regex: search, $options: 'i' } }
        ]
    })
        .countDocuments()

    if (data) {
        return res.render('admin/table/typetable', {
            record: data,
            totalPage: Math.ceil(count / limit),
            searchData: search
        })
    }
}

module.exports.typeDelete = async (req, res) => {
    console.log(req.params.id);
    let td = await type.findByIdAndDelete(req.params.id);
    return res.redirect('back')
}