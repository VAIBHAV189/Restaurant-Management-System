const route = require('express').Router()
const path = require('path')
const multer = require('multer')

// // ------------------------------------------- For saving employee images ----------------------------// // 

route.get('/give/:name',(req,res)=>{
    let file = process.cwd() + '/employee/' + req.params.name
    console.log(file)
    res.sendFile(file + '.jpg',function(err) {
        if(err) {
            res.sendFile(file + '.jpeg',function(err) {
                if(err) {
                    res.sendFile(file + '.png',function(err){
                        if(err) {
                            res.sendFile(process.cwd() + '/employee/default.PNG')
                        }
                    })
                }
            })
        }
    })
})

module.exports = {route}