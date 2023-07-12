const category = require('../../model/category');
const subCategory = require('../../model/subcategory');
const extraCategory = require('../../model/extracategory');
const type = require('../../model/type');
const product = require('../../model/product');
const brand = require('../../model/brand');
const cart = require('../../model/user/cart');

const user = require('../../model/user/user');
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});

module.exports.dashbord = async (req, res) => {
    let CatData = await category.find({ isActive: true });
    let SubData = await subCategory.find({ isActive: true });
    let ExtraData = await extraCategory.find({ isActive: true });
    var count = 0;
    if (req.user) {
        let userCartCount = await cart.find({ user_id: req.user.id }).countDocuments();
        req.session.cartData = userCartCount;
        count = req.session.cartData;
    }

    let alldata = await product.find({});
    // console.log(alldata);

    return res.render('user/dashbord', { 'categoryData': CatData, 'subCategoryData': SubData, 'ExtraData': ExtraData, alldata: alldata, 'count': count })
}

module.exports.product = async (req, res) => {
    var catId = req.params.id;
    var subId = req.params.subId;
    var extraId = req.params.extraId;

    // console.log(req.params)
    let CatData = await category.find({ isActive: true });
    let SubData = await subCategory.find({ isActive: true });
    let ExtraData = await extraCategory.find({ isActive: true });

    let productData = await product.find({ categoryId: catId, subcategoryId: subId, extracategoryId: extraId });

    let brandData = await brand.find({ categoryId: catId, subcategoryId: subId, extracategoryId: extraId });

    let typeData = await type.find({ categoryId: catId, subcategoryId: subId, extracategoryId: extraId });

    var count = 0;
    if (req.user) {
        count = req.session.cartData;
    }
    // console.log("brand"+brandData,"type"+typeData)
    // console.log(productData);

    return res.render('user/shopcart', { 'categoryData': CatData, 'subCategoryData': SubData, 'ExtraData': ExtraData, 'productData': productData, 'brandData': brandData, 'typeData': typeData, 'count': count })
}

module.exports.findBrandWisedata = async (req, res) => {
    // console.log('ok');
    // console.log(req.body.brandIds);

    let productData = await product.find({ brandId: req.body.brandIds });

    let typedata = await product.find({ typeId: req.body.brandIds })
    // console.log(productData);
    var count = 0;
    if (req.user) {
        count = req.session.cartData;
    }
    // console.log(productData);
    return res.render('user/brandFilter', { 'productData': productData, typedata: typedata, count: count });
}

module.exports.viewDetail = async (req, res) => {
    console.log(req.params.productid)

    let CatData = await category.find({ isActive: true });
    let SubData = await subCategory.find({ isActive: true });
    let ExtraData = await extraCategory.find({ isActive: true });

    let singleProduct = await product.findById(req.params.productid)
    var count = 0;
    if (req.user) {
        count = req.session.cartData;
    }
    // console.log(singleProduct)

    return res.render('user/productView', { 'categoryData': CatData, 'subCategoryData': SubData, count: count, 'ExtraData': ExtraData, 'singleProduct': singleProduct });
}

module.exports.register = async (req, res) => {
    let CatData = await category.find({ isActive: true });
    let SubData = await subCategory.find({ isActive: true });
    let ExtraData = await extraCategory.find({ isActive: true });
    var count = 0;
    if (req.user) {
        count = req.session.cartData;
    }

    return res.render('user/register', { 'categoryData': CatData, count: count, 'subCategoryData': SubData, 'ExtraData': ExtraData })
}
module.exports.insertRegisterData = async (req, res) => {
    // console.log(req.body)

    req.body.role = "user";

    let data = await user.create(req.body);

    if (data) {
        req.flash("success", "Register Successfully")
        return res.redirect('/user/register')
    }
    else {
        req.flash("error", "Enter Valid Deltails")
        return res.redirect('/user/register')
    }


}
module.exports.userlogin = async (req, res) => {
    let CatData = await category.find({ isActive: true });
    let SubData = await subCategory.find({ isActive: true });
    let ExtraData = await extraCategory.find({ isActive: true });
    var count = 0;
    if (req.user) {
        count = req.session.cartData;
    }


    return res.render('user/login', { count: count, 'categoryData': CatData, 'subCategoryData': SubData, 'ExtraData': ExtraData })
}

module.exports.insertLoginData = async (req, res) => {

    return res.redirect('/user');
}
module.exports.cart = async (req, res) => {
    let CatData = await category.find({ isActive: true });
    let SubData = await subCategory.find({ isActive: true });
    let ExtraData = await extraCategory.find({ isActive: true });



    if (req.user) {
        let cartdata = await cart.find({ 'user_id': req.user.id }).populate('product_id').exec();
        var count = 0;
        if (req.user) {
            let userCartCount = await cart.find({ user_id: req.user.id }).countDocuments();
            req.session.cartData = userCartCount;
            count = req.session.cartData;
        }


        return res.render('user/cart', { 'categoryData': CatData, 'subCategoryData': SubData, 'ExtraData': ExtraData, 'cartdata': cartdata, 'count': count });
    }
    else {
        res.redirect('/user/userlogin');
    }



}

module.exports.addToCart = async (req, res) => {



    if (req.user) {
        let cartData = await cart.find({ user_id: req.body.user_id, product_id: req.body.product_id });
        console.log(cartData);
        if (cartData.length == 0) {
            req.body.isActive = true;
            req.body.createdAt = nDate;
            req.body.updatedAt = nDate;
            req.body.order_status = 'pending';

            // console.log('added');
            cart.create(req.body);
            req.flash("success", "Add To Cart Successfully")
            return res.redirect('back',)
            // console.log(req.body);
        }
        else {
            // console.log('allready have');
            req.flash("error", "Product is already into Cart");
            return res.redirect('back');
        }

    }
    else {
        res.redirect('/user/userlogin');
    }

}

module.exports.removeProductCart = async (req, res) => {
    //    console.log(req.params.id+"hii");

    let removeData = await cart.findByIdAndDelete(req.params.id);
    if (removeData) {
        req.flash('success', "Product Remove from Cart");
        return res.redirect('back')
    }
    else {
        req.flash('error', "Something wrong");
        return res.redirect('back');
    }
}

module.exports.productQuantity = async (req, res) => {


    let cartQu = await cart.findOne({ product_id: req.body.productId, user_id: req.user.id });
    console.log(cartQu);
    if (cartQu) {
        let cartupdate = await cart.findByIdAndUpdate(cartQu.id, {
            quantity: req.body.quantity
        });
        if (cartupdate) {
            return res.json({ msg: "quantity Updated" });
        }
        else {
            return res.json({ msg: "something wrong" });
        }
    }
}