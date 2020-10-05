const route=require('express').Router()
const customer=require('../db').customer
const sequelize =require('sequelize')


//-----------------------------GET REQUEST FOR FETCHING CART-----------------------------
route.get('/getcart',(req,res)=>{
    customer.findOne({
        where : {
            username : req.user.username
        }
    }).then((val)=>{
        let v = (val.dataValues);
        let n_order = v.currentCartItems;
        res.send(n_order);
    });
});

//-----------------------------POST REQUEST FOR ADDING TO CART-----------------------------
route.post('/addcart',function(req,res){

    let name = req.body.name;
    let price = +(req.body.price);
    let times = +(req.body.times);
    let msg = "Success";

    customer.findOne({
        where : {
            username : req.user.username
        }
    }).then((val)=>{
        let v = (val.dataValues);
        let n_order = v.currentCartItems;
        if(n_order.hasOwnProperty(name)){
            msg = "Failure";
            console.log("Sorry,It was an update!");
            res.send(msg);
        }
        else{
            n_order[name] = [price,times];
            console.log("Order As Of Now : " + n_order);
            add_util(req.user.username,n_order);
            msg = "Success";
            console.log("Addition Done");
            res.send(msg);
        }
    });
});



//-----------------------------POST REQUEST FOR UPDATING CART-----------------------------
route.post('/updatecart',function(req,res){
    let name = req.body.name;
    customer.findOne({
        where : {
            username : req.user.username
        }
    }).then((val)=>{
        let v = (val.dataValues);
        let n_order = v.currentCartItems;
        let item = n_order[name];
        if(req.body.work=='dec')
        {
            if(item[1]==1)
            {
                delete n_order[name];
            }
            else
            {
                item[1]--;
                n_order[name] = item;
            }
        }
        else
        {
            item[1]++;
            n_order[name] = item;
        }
        add_util(req.user.username,n_order);
    });
    res.send('Success');
});






function add_util(username,n_order)
{
    customer.update(
        {currentCartItems : n_order},
        {where : { username : username} }
    )
    .then(()=>{
        console.log("Update Done");
    });
}

module.exports= {route }