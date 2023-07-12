const admin = require('../../model/admin');
const category = require('../../model/category');

const bcrypt = require('bcrypt');
const { find } = require('../../model/admin');

const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});




module.exports.Dashbord = (req, res) => {
    return res.render('admin/dashbord');
}

module.exports.GetAdminForm = (req, res) => {
    return res.render('admin/form/adminLoginForm')
}

module.exports.adminFormInsertData = async (req, res) => {
    let img = '';
    if (req.file) {
        img = admin.adminImagePath + '/' + req.file.filename;

        req.body.AdminImages = img;
        req.body.isActive = true;
        req.body.crateAt = nDate;
        req.body.updatedAt = nDate;
        req.body.role = "Admin";
    }

    let data = await admin.create(req.body);

    if (data) {
        return res.redirect('/adminForm');
    }
    else {
        console.log('error');
    }

}

module.exports.GetAdminTable = async (req, res) => {

    // console.log(req.query.search);
    // console.log(req.query.active)

    if(req.query.active){
        console.log('active');
       let action = await admin.findByIdAndUpdate(req.query.active,{
        isActive : false,
       })
    }

    if(req.query.deactive){
        console.log('deactive');
        let action = await admin.findByIdAndUpdate(req.query.deactive,{
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
     
     
     let data = await admin.find({
         $or: [
             { name: { $regex: search, $options: 'i' } }
         ]
     })
         .limit(limit * 1)
         .skip((page - 1) * limit)
         .exec()
     
         
     let count = await admin.find({
         $or: [
             { name: { $regex: search, $options: 'i' } }
         ]
     })
         .countDocuments()
     
     if (data) {
         return res.render('admin/table/admintable', {
             record: data,
             totalPage: Math.ceil(count / limit),
             searchData: search
         })
     }

}
module.exports.adminDelete = async (req,res)=>{
    // console.log(req.params);
    let ad = await admin.findByIdAndDelete(req.params.id);
    return res.redirect('/adminForm')
}


module.exports.loginInsertData = async (req, res) => {
    if (req.isAuthenticated()) {
        let data = req.body ;
        res.cookie('AdminStore' , data);
        return res.redirect('/dashbord')
    }
    return res.redirect('/dashbord')
}

module.exports.chengePassword = async(req,res)=>{
  return res.render('admin/changePassword');
}

module.exports.insertChangePassword = async(req,res)=>{
    console.log(req.body)
    let adminData = await req.user;
    

    if (adminData.password ==req.body.currentpass) {

        if (req.body.currentpass !== req.body.newpass) {

            if (req.body.newpass == req.body.confirmpass) {
                let record = await admin.findById(adminData._id);
                console.log(record);
                if (record) {

                    let newPasword = await admin.findByIdAndUpdate(record.id, {
                        password: req.body.newpass,
                    });
                    console.log('password change');
                    req.flash("success", "Password Change Successfully")
                    return res.redirect('/',);
                }
                else {
                    console.log('1');
                    return res.redirect('/chengePassword')

                }

            }
            else {
                console.log('2');
                return res.redirect('/chengePassword')
            }

        }
        else {
            console.log('3');
            return res.redirect('/chengePassword')
        }
    }
    else {
        console.log('4');
        return res.redirect('/chengePassword')
    }

}

   