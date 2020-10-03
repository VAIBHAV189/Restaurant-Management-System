const exp = require('express');
const server = exp();
const session = require('express-session');
const passport = require('./passport');

const root=require('./routes/root.js').route

server.use(exp.json());
server.use(exp.urlencoded({extended:true}));

server.use(passport.initialize());
server.use(passport.session());



server.use(session({
    secret : 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
}));

//Setting View Engine as HBS
server.set("view engine","hbs")

server.use(exp.static('public')); 

server.use('/root',root)



// //--------------------------------------------------Error Page----------------------------------------------//
server.get("/*",(req,res)=>{
    res.render('errorPage')
})


// -----------------------------------------------Root Authentication ended ----------------------------------------------------------------------- //



server.listen(5400,()=>{
    console.log('Server started at http://localhost:5400/');
})
