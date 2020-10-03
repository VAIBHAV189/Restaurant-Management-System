const route = require('express').Router();
const customers = require('../db').customer;
const passport = require('../passport');

// ------------------------------------------Root Authentication Starts------------------------------------------ //

route.get('/login',(req,res)=>{
    res.render("login")
})

route.post('/login',passport.authenticate('local',{failureRedirect : '/root/login'})
    ,function(req,res){
        console.log("Logging In : " + req.user.username);
        return res.redirect("/");
    }
);

route.get('/signUp',(req,res)=>{
    res.render("signUp")
})

route.post('/signUp',(req,res)=>{
    customers.create({
        username:req.body.username,
        password:req.body.password,
        name:req.body.name,
        email:req.body.email,
        currentCartItems:{}
    }).then(()=>{
        res.redirect('/root/login')
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
    if(req.user != undefined) {   
        obj = {};
        obj.Username = req.user.username;
        obj.login = "true"
    }
    else {
        obj = {};
        obj.login = "false";
    }
    res.send(obj)
})

// //--------------------------------------------------Error Page----------------------------------------------//
route.get("/*",(req,res)=>{
    res.render('errorPage')
})

module.exports={
    route
}