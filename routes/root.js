const route=require('express').Router()
const Customer=require('../db.js').Customer
const passport=require('../passport')

//---------------------------------------------Login Handler----------------------------------------//
route.get('/login',(req,res)=>{
    res.render("login")
})

route.post('/login', passport.authenticate('local', {
    successRedirect: '/root/signUp',
    failureRedirect: '/root/login'
}));


//-------------------------------------------SignUp Handler----------------------------------------//
route.get('/signUp',(req,res)=>{
    res.render("signUp")
})

route.post('/signUp',(req,res)=>{
    console.log(req.body)
    Customer.create({
        Username:req.body.Username.toUpperCase(),
        Password:req.body.Password,
        Name:req.body.Name,
        Email:req.body.Email.toUpperCase(),
        Cart:{}
    }).then(()=>{
        res.redirect('/root/login')
        // res.send("Successfully Signed Up")
    }).catch((err)=>{
        res.send(err)
    })
})

// //----------------------------------------------------Logout Handler-------------------------------------------//

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// //---------------------------------------------------Check login status---------------------------------------//
route.get('/Username',(req,res)=>{
    let obj = req.user;
    if(req.user!=undefined)
    {   
        obj = {};
        obj.Username = req.user.username;
        obj.login = "true"
    }
    else
    {
        obj = {};
        obj.login = "false";
    }
    res.send(obj)
})

// //--------------------------------------------------Error Page----------------------------------------------//
// route.get("/*",(req,res)=>{
//     res.render('errorPage')
// })

module.exports={
    route 
}