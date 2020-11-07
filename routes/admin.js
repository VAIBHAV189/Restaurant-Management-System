const route = require('express').Router()
const employee = require('../db2').employeeTable
const menu = require('../db2').menu
const salary = require('../db2').salaryEmployee
const passport = require('../passport')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

route.use(passport.initialize());
route.use(passport.session());

function removeFile(dir, fileName) {
    console.log('filename', fileName)
    //iterate over images of food folder and check for .jpg, .jpeg, .png
    fs.readdirSync(dir).forEach(file => {
        if((fileName+'.jpg' == file)) {
            fs.unlink(fileName+'.jpg',function(err) {
                if(err) console.log(err)
            })
        }
        else if(fileName+'.jpeg' == file) {
            fs.unlink(fileName+'.jpeg',function(err) {
                if(err) console.log(err)
            })
        }
        else if(fileName + '.png' == file) {
            fs.unlink(fileName + '.png',function(err) {
                if(err) console.log(err)
            })
        }
    })
}

route.get('/',
    async function(req,res){
        if(req.user && req.user.jobTitle == 'admin') {
            const Employee = await employee.findAll( { 
                order: [
                    ['name','ASC']
                ]
            })

            let employeeObj = {}
            Employee.forEach(function(emp){
                if(employeeObj[emp.jobTitle] == undefined) employeeObj[emp.jobTitle] = []
                employeeObj[emp.jobTitle].push(emp)
            })

            const Menu = await menu.findAll({
                order: [
                    ['itemType','ASC']
                ] 
            })

            let menuObj = {}
            Menu.forEach(function(item) {
                if(menuObj[item.itemType] == undefined) menuObj[item.itemType] = []
                menuObj[item.itemType].push(item)
            })
            
            const Salary = await salary.findAll({
                order: [
                    ['jobTitle','ASC']
                ]
            })
            res.render('admin',{
                employee: employeeObj,
                menu: menuObj,
                salary: Salary
            })
        }
        else res.redirect('/logout')
})

// //---------------------------------------------------CRUD Employee-----------------------------------------------//

function checkFileType(file, cb) {
    const fileTypes = ['.jpeg', '.jpg', '.png']
        const extname = path.extname(file.originalname).toLowerCase()
        let valid = fileTypes.includes(extname)

        //Check mime
        console.log(valid)
        const mimetype = file.mimetype
        if(mimetype && valid == true) {
            return cb(null, true)
        }
        else {
            console.log('error hai image.js')
            cb('Error: Images Only!')
        }
}

const StorageEmp1 = multer.diskStorage({
    destination: './employee',
    filename: async function(req, file, cb) {
        const employeeAdded = await employee.create(req.body)
        cb(null, employeeAdded.id + path.extname(file.originalname))
    }
})

const uploadEmp = multer({
    storage: StorageEmp1,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('empImage')

route.post('/addEmployee',
    async function(req,res) {
        if(req.user && req.user.jobTitle === 'admin') {
            uploadEmp(req, res, (err)=>{
                if(err) {
                    res.send('Images only')
                }
                else {
                    //can add query parameters to it 
                    res.redirect('/admin')
                }
            })
        }
        else res.redirect('logout')
    }
)









const StorageEmp2 = multer.diskStorage({
    destination: './employee',
    filename: async function(req, file, cb) {
        const employeeUpdated = await employee.update(req.body, {
            where : {
                id: req.body.id
            }
        })
        if(file) {
            removeFile('./employee', '\\employee\\'+req.body.id)
            cb(null, req.body.id + path.extname(file.originalname))
        }  
    }
})

const reuploadEmp = multer({
    storage: StorageEmp2,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('empImage')

route.post('/updateEmployee',
    async function(req, res) {
        if(req.user.jobTitle == 'admin') {
            reuploadEmp(req, res, async function(err) {
                if(req.file) {}
                else {
                    const employeeUpdated = await employee.update(req.body, {
                        where : {
                            id: req.body.id
                        }
                    })
                }
                if(err) {
                    res.send('Images Only')
                }
                else {
                    res.redirect('/admin')
                }
            })     
        }
        else res.redirect('/logout')
        
    } 
)

route.post('/removeEmployee',
    async function(req,res) {
        if(req.user && req.user.jobTitle == 'admin') {
            console.log("Going to deleteEmployee" + req.body)
            const deleteEmployee = employee.destroy({
                where: {
                    id: req.body.id
                }
            })
            let directory = process.cwd() + '\\employee\\'
            fs.readdirSync('./food').forEach(file => {
                if((req.body.id + '.jpg' == file)) {
                    fs.unlink(directory + req.body.id +'.jpg',function(err) {
                        if(err) console.log(err)
                    })
                }
                else if(req.body.id + '.jpeg' == file) {
                    fs.unlink(directory + req.body.id +'.jpeg',function(err) {
                        if(err) console.log(err)
                    })
                }
                else if(req.body.id + '.png' == file) {
                    fs.unlink(directory + req.body.id + '.png',function(err) {
                        if(err) console.log(err)
                    })
                }
            })
            res.redirect('/admin')
        }
        else res.redirect('/logout')        
    }
)
//Incomplete
route.post('/findEmployee',
    async function(req,res) {
        if(req.user && req.user.jobTitle == 'admin') {
            console.log("FindingEmployee" , req.body)
        }
        else res.redirect('/logout')
    }
)

// //---------------------------------------------------CRUD Menu-----------------------------------------------//

// create menu done
function checkFileType(file, cb) {
    const fileTypes = ['.jpeg', '.jpg', '.png']
        const extname = path.extname(file.originalname).toLowerCase()
        let valid = fileTypes.includes(extname)

        //Check mime
        const mimetype = file.mimetype
        if(mimetype && valid == true) {
            return cb(null, true)
        }
        else {
            console.log('error hai image.js')
            cb('Error: Images Only!')
        }
}

const Storage = multer.diskStorage({
    destination: './food',
    filename: async function(req, file, cb) {
        const foodItemAdded = await menu.create(req.body)
        cb(null, foodItemAdded.id + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: Storage,
    fileFilter: async function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('itemImage')

route.post('/addMenu', 
    async function(req,res) {
        if(req.user && req.user.jobTitle == 'admin') {
            
            upload(req, res, (err)=>{
                if(err) {
                    res.send('Images only')
                }
                else {
                    //can add query parameters to it 
                    res.redirect('/admin')
                }
            })
        }
        else res.redirect('/logout')
    }
)


const Storage2 = multer.diskStorage({
    destination: './food',
    filename: async function(req, file, cb) {
        const itemUpdated = await menu.update(req.body, {
            where : {
                id: req.body.id
            }
        })
        if(file) {
            removeFile('./food', '\\food\\'+req.body.id)
            cb(null, req.body.id + path.extname(file.originalname))
        }  
    }
})

const reupload = multer({
    storage: Storage2,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('itemImage')

route.post('/updateMenu',
    async function(req, res) { 
        if(req.user && req.user.jobTitle == 'admin') {
            reupload(req, res, async function(err){
                if(req.file) {}
                else {
                    const itemUpdated = await menu.update(req.body, {
                        where : {
                            id: req.body.id
                        }
                    })
                }
                if(err) {
                    res.send('Images Only')
                }
                else {
                    res.redirect('/admin')
                }
            })
        }
        else res.redirect('/logout')
    } 
)

route.post('/removeMenu',
    async function(req,res) {
        if(req.user && req.user.jobTitle == 'admin') {
            console.log("Going to removeItem" , req.body)
            const deletedItem = menu.destroy({
                where: {
                    id: req.body.id
                }
            })
            let directory = process.cwd() + '\\food\\'
            fs.readdirSync('./food').forEach(file => {
                if((req.body.id + '.jpg' == file)) {
                    fs.unlink(directory + req.body.id +'.jpg',function(err) {
                        if(err) console.log(err)
                    })
                }
                else if(req.body.id + '.jpeg' == file) {
                    fs.unlink(directory + req.body.id +'.jpeg',function(err) {
                        if(err) console.log(err)
                    })
                }
                else if(req.body.id + '.png' == file) {
                    fs.unlink(directory + req.body.id + '.png',function(err) {
                        if(err) console.log(err)
                    })
                }
            })
            res.redirect('/admin')
        }
        else res.redirect('/logout')
    }
)


// //---------------------------------------------------CRUD Jobs-----------------------------------------------//
route.get('/addJob',(req,res)=>{
    if(req.user && req.user.jobTitle == 'admin') {
        res.render("addJob")
    }
    else res.redirect('/logout')
})

route.post('/addJob', 
    async function(req,res) {
        if(req.user && req.user.jobTitle == 'admin') {
            console.log(req.body)
            const jobAdded = await salary.create(req.body)
            res.redirect('/admin')
        }
        else res.redirect('/logout')
    }
)

route.post('/updateJob',
    async function(req, res) {
        if(req.user && req.user.jobTitle == 'admin') {
            console.log("Going to updateJob" + req.body)
            const itemUpdated = await salary.update(req.body, {
                where : {
                    jobTitle: req.body.jobTitle
                }
             }
            )
            res.redirect('/admin')
        }
        else res.redirect('/logout')
    } 
)

route.post('/removeJob',
    async function(req,res) {
        if(req.user && req.user.jobTitle == 'admin') {
            console.log("Going to removeJob" + req.body)
            const deletedJob = salary.destroy({
                where: {
                    jobTitle: req.body.jobTitle
                }
            })
            res.redirect('/admin')
        }
        else res.redirect('/logout')

        
    }
)

module.exports={
    route
}