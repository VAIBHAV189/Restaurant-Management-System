// const express=require('express')
// const server=express()

// //Routes
// const root=require('./routes/root').route


// server.use(express.json())
// server.use(express.urlencoded({extended:true}))

// //Passport
// const session=require('express-session')
// const passport=require('./passport.js')


// server.use(express.static('public'))


// server.use(session({
//     secret:'Myencoderstring',
//     resave:false,
//     saveUninitialized:true
// }))

// server.use(passport.initialize())   
// server.use(passport.session())

// //Setting View Engine as HBS
// server.set("view engine","hbs")



// //Setting Routes
// server.use('/root',root)

const express=require('express')
const server=express()

const root=require('./routes/root').route

const session=require('express-session')
const passport=require('./passport.js')

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(session({
    secret:'Myencoderstring',
    resave:false,
    saveUninitialized:true
}))

server.use(passport.initialize())
server.use(passport.session())

server.set("view engine","hbs")

server.use(express.static('public')); 
server.use('/root',root)


server.listen(5400,()=>{
    console.log("Server started successfully at localhost:5400")
})
