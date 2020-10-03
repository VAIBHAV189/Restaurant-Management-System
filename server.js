const exp = require('express');
const server = exp();
const session = require('express-session');
const Customers = require('./db').customersDB;
const passport = require('./passport');

server.use(exp.json());
server.use(exp.urlencoded({extended:true}));

server.use(passport.initialize());
server.use(passport.session());

server.set("view engine","hbs")

server.use(session({
    secret : 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
}));

server.use(exp.static('public')); 

// ------------------------------------------Root Authentication Starts------------------------------------------ //

server.get('/login',(req,res)=>{
    res.render("login")
})

server.post('/login',passport.authenticate('local',{failureRedirect : '/signup'})
    ,function(req,res){
        console.log("Logging In : " + req.user.username);
        return res.redirect('/hehehloginhogaya');
    }
);

server.get('/signup',(req,res)=>{
    res.render("signup")
})

server.post('/signUp',(req,res)=>{
    Customers.create({
        username:req.body.Username,
        password:req.body.Password,
        Name:req.body.Name,
        Email:req.body.Email,
        Current_Cart_Item:{}
    }).then(()=>{
        res.redirect('/login')
    }).catch((err)=>{
        res.send(err)
    })
})


// //----------------------------------------------------Logout Handler-------------------------------------------//

server.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// //---------------------------------------------------Check login status---------------------------------------//
server.get('/Username',(req,res)=>{
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
server.get("/*",(req,res)=>{
    res.render('errorPage')
})


// -----------------------------------------------Root Authentication ended ----------------------------------------------------------------------- //

//Setting View Engine as HBS
server.set("view engine","hbs")

server.listen(7891,()=>{
    console.log('Server started at http://localhost:7891/');
})
