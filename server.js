const express=require('express')
const server=express()

//Routes
const root=require('./routes/root').route


server.use(express.json())
server.use(express.urlencoded({extended:true}))

//Passport
const session=require('express-session')
const passport=require('./passport.js')


server.use(session({
    secret:'Myencoderstring',
    resave:false,
    saveUninitialized:true
}))

server.use(passport.initialize())   
server.use(passport.session())

server.use(express.static('public'))
server.use('/root',root)

//Setting View Engine as HBS
server.set("view engine","hbs")


server.listen(5600,()=>{
    console.log("Server started successfully at localhost:5600")
})
