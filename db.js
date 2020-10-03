const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/storage_customers.db'
});

const customersDB = db.define('users',{
    username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    Name : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: false
    },
    Email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    Current_Cart_Items : {
        type : Sequelize.JSON,
        allowNull : true,
        unique : false
    }
});

db.sync().then(()=>{
    console.log("DataBase Ready!");
})

module.exports = {
    customersDB
}