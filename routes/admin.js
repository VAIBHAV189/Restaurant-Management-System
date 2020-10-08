const route = require('express').Router()
const employee = require('../db2').employeeTable
const menu = require('../db2').menu
const salary = require('../db2').salaryEmployee

route.get('/',
    async function(req,res){
        const Employee = await employee.findAll( { 
            order: [
                ['name','ASC']
            ]
        })
        console.log('Employees List' , Employee)
        //divide this into types
        const Menu = await menu.findAll({
            order: [
                ['itemType','ASC']
            ] 
        })
        console.log('Employees List' + Menu)

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
})

// //---------------------------------------------------CRUD Employee-----------------------------------------------//

route.get('/addEmployee',(req,res)=>{
    res.render("addEmployee")
})
//Employee succesfully added waali cheez kaise??
route.post('/addEmployee',
    async function(req,res) {
        console.log("Going to addEmployee" + req.body)
        const employeeAdded = await employee.create(req.body)
        console.log("Id of recently added employee: "+  employeeAdded.id)
        res.redirect('/admin/addEmployee')
    }
)

route.get('/updateEmployee',(req,res)=>{
    console.log(req.body)
    res.render('updateEmployee',req.body)
})
route.post('/updateEmployee',
    async function(req, res) {
        console.log("Going to updateEmployee" + req.body)
        const employeeUpdated = await employee.update(req.body, {
            where : {
                id: req.body.id
            }
         }
        )
        res.redirect('/')
    } 
)

route.get('/removeEmployee',
    async function(req,res) {
        console.log("Going to deleteEmployee" + req.body)
        const deleteEmployee = employee.destroy({
            where: {
                id: req.body.id
            }
        })
        res.redirect('/')
    }
)
//Incomplete
route.post('/findEmployee',
    async function(req,res) {
        console.log("FindingEmployee" + req.body)
    }
)

// //---------------------------------------------------CRUD Menu-----------------------------------------------//
route.get('/addMenu',(req,res)=>{
    res.render("addMenu")
})

route.post('/addMenu', 
    async function(req,res) {
        console.log(req.body)
        const foodItemAdded = await menu.create(req.body)
        console.log("Id of recently added Food Item: "+  foodItemAdded.id)
        res.redirect('/admin/addMenu')
    }
)

route.post('/updateMenu',
    async function(req, res) { 
        console.log("Going to updateMenu" + req.body)
        const itemUpdated = await menu.update(req.body, {
            where : {
                id: req.body.id
            }
         }
        )
        res.redirect('/')
    } 
)

route.post('/removeMenu',
    async function(req,res) {
        console.log("Going to removeItem" + req.body)
        const deletedItem = menu.destroy({
            where: {
                id: req.body.id
            }
        })
        res.redirect('/')
    }
)


// //---------------------------------------------------CRUD Jobs-----------------------------------------------//
route.get('/addJob',(req,res)=>{
    res.render("addJob")
})

route.post('/addJob', 
    async function(req,res) {
        console.log(req.body)
        const jobAdded = await salary.create(req.body)
        res.redirect('/admin/addJob')
    }
)

route.post('/updateJob',
    async function(req, res) {
        console.log("Going to updateJob" + req.body)
        const itemUpdated = await salary.update(req.body, {
            where : {
                id: req.body.id
            }
         }
        )
        res.redirect('/')
    } 
)

route.post('/removeJob',
    async function(req,res) {
        console.log("Going to removeJob" + req.body)
        const deletedJob = salary.destroy({
            where: {
                id: req.body.id
            }
        })
        res.redirect('/')
    }
)

module.exports={
    route
}