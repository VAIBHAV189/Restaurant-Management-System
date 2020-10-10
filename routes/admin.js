const route = require('express').Router()
const employee = require('../db2').employeeTable
const menu = require('../db2').menu
const salary = require('../db2').salaryEmployee
const passport = require('../passport');

route.use(passport.initialize());
route.use(passport.session());

route.get('/',
    async function(req,res){
        console.log('helllllooooooooooooooooo')
        console.log(req.user)
        if(req.user.jobTitle == 'admin') {
            const Employee = await employee.findAll( { 
                order: [
                    ['name','ASC']
                ]
            })
            const Menu = await menu.findAll({
                order: [
                    ['itemType','ASC']
                ] 
            })
    
            const Salary = await salary.findAll({
                order: [
                    ['jobTitle','ASC']
                ]
            })
            res.render('admin',{
                employee: Employee,
                menu: Menu,
                salary: Salary
            })
        }
        else res.redirect('/logout')
})

// //---------------------------------------------------CRUD Employee-----------------------------------------------//

route.get('/addEmployee',(req,res)=>{
    res.render("addEmployee")
})
//Employee succesfully added waali cheez kaise??flash message for mployee added
route.post('/addEmployee',
    async function(req,res) {
        if(req.user.jobTitle === 'admin') {
            console.log("Going to addEmployee" + req.body)
            const employeeAdded = await employee.create(req.body)
            console.log("Id of recently added employee: "+  employeeAdded.id)
            res.redirect('/admin/addEmployee')
        }
        else res.redirect('logout')
    }
)

route.get('/updateEmployee',(req,res)=>{
    if(req.user.jobTitle == 'admin') {
        console.log(req.body)
        res.render('updateEmployee',req.body)
    }
    else res.redirect('/logout') 
})

route.post('/updateEmployee',
    async function(req, res) {
        if(req.user.jobTitle == 'admin') {
            console.log("Going to updateEmployee" + req.body)
            const employeeUpdated = await employee.update(req.body, {
                where : {
                    id: req.body.id
                }
             }
            )
            res.redirect('/')
        }
        else res.redirect('/logout')
        
    } 
)

route.get('/removeEmployee',
    async function(req,res) {
        if(req.user.jobTitle == 'admin') {
            console.log("Going to deleteEmployee" + req.body)
            const deleteEmployee = employee.destroy({
                where: {
                    id: req.body.id
                }
            })
            res.redirect('/')
        }
        else res.redirect('/logout')        
    }
)
//Incomplete
route.post('/findEmployee',
    async function(req,res) {
        if(req.user.jobTitle == 'admin') {
            console.log("FindingEmployee" + req.body)
        }
        else res.redirect('/logout')
    }
)

// //---------------------------------------------------CRUD Menu-----------------------------------------------//
route.get('/addMenu',(req,res)=>{
    if(req.user.jobTitle == 'admin') {
        res.render("addMenu")
    }
    else res.redirect('/logout')
})

route.post('/addMenu', 
    async function(req,res) {
        if(req.user.jobTitle == 'admin') {
            console.log(req.body)
            const foodItemAdded = await menu.create(req.body)
            console.log("Id of recently added Food Item: "+  foodItemAdded.id)
            res.redirect('/admin/addMenu')
        }
        else res.redirect('/logout')

        
    }
)

route.post('/updateMenu',
    async function(req, res) { 
        if(req.user.jobTitle == 'admin') {
            console.log("Going to updateMenu" + req.body)
            const itemUpdated = await menu.update(req.body, {
                where : {
                    id: req.body.id
                }
             }
            )
            res.redirect('/')
        }
        else res.redirect('/logout')

        
    } 
)

route.post('/removeMenu',
    async function(req,res) {
        if(req.user.jobTitle == 'admin') {
            console.log("Going to removeItem" + req.body)
            const deletedItem = menu.destroy({
                where: {
                    id: req.body.id
                }
            })
            res.redirect('/')
        }
        else res.redirect('/logout')

        
    }
)


// //---------------------------------------------------CRUD Jobs-----------------------------------------------//
route.get('/addJob',(req,res)=>{
    if(req.user.jobTitle == 'admin') {
        res.render("addJob")
    }
    else res.redirect('/logout')

    
})

route.post('/addJob', 
    async function(req,res) {
        if(req.user.jobTitle == 'admin') {
            console.log(req.body)
            const jobAdded = await salary.create(req.body)
            res.redirect('/admin/addJob')
        }
        else res.redirect('/logout')

        
    }
)

route.post('/updateJob',
    async function(req, res) {
        if(req.user.jobTitle == 'admin') {
            console.log("Going to updateJob" + req.body)
            const itemUpdated = await salary.update(req.body, {
                where : {
                    id: req.body.id
                }
             }
            )
            res.redirect('/')
        }
        else res.redirect('/logout')
    } 
)

route.post('/removeJob',
    async function(req,res) {
        if(req.user.jobTitle == 'admin') {
            console.log("Going to removeJob" + req.body)
            const deletedJob = salary.destroy({
                where: {
                    id: req.body.id
                }
            })
            res.redirect('/')
        }
        else res.redirect('/logout')

        
    }
)

module.exports={
    route
}