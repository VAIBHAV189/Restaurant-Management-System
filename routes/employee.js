const route = require('express').Router()
const fs = require('fs')
// // ------------------------------------------- For sending employee images ----------------------------// //

route.get('/give/:name',(req,res)=>{
    let fileName = req.params.name
    let dir = './employee'
    let f
    fs.readdirSync(dir).forEach(file => {
        if((fileName+'.jpg' == file) || (fileName + '.JPG' == file)) {
            f = file
        }
        else if((fileName+'.jpeg' == file) || (fileName + '.JPEG' == file)) {
            f = file
        }
        else if((fileName + '.png' == file) || (fileName + '.PNG' == file)) {
            f = file
        }
    })
    if(f) res.sendFile(process.cwd() + '/employee/' + f)
    else res.sendFile(process.cwd() + '/employee/' + 'default.PNG')
})

module.exports = {
    route
}