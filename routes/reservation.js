const route=require('express').Router()
const customer=require('../db2.js').reservationInfo
const passport = require('../passport');


route.use(passport.initialize());
route.use(passport.session());


route.get('/add',function(req,res){
    
    if(req.user)
    {
        reservationInfo.findOne({
            where : {
                members: req.body.persons,

            }
        })
        res.render('reserveTable')
    }
    res.render("errorReservation")
})