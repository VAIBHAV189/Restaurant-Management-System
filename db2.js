const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/storage.db'
})

const Employee_Table = db.define('Employee_Table',{
    Job_Title : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    },
    Name : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: false
    },
    Emp_Id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : true,
        primaryKey: true
    },
    Phone_Number : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    },
    Res_Add : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    },
    Password : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    }
});


const Employee_Attendance = db.define('Employee_Attendance',{
    Emp_Id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false,
        primaryKey: true
    },
    Entry_Date : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: false,
        primaryKey: true
    },
    Entry_Time : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    Exit_Time : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false
    }
});

const Salary_Employee = db.define('Salary_Employee',{
    Job_Title : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true,
        primaryKey: true
    },
    Salary_Pm : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique: false
    },
    Monthly_Hours : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : true
    }
}); 

const Menu = db.define('Menu',{
    Item_Id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false,
        primaryKey: true
    },
    Item_Name : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: false
    },
    Item_Type:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:false
    },
    Item_Price : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : true
    }
});

const Order = db.define('Order',{
    Order_Id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false,
        primaryKey: true,
    },
    Username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: false
    },
    Payment_Amount : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    Order_Data : {
        type : Sequelize.JSON,
        allowNull : false,
        unique : false
    }
});

const Reservation_Info = db.define('Reservation_Info',{
    Table_Id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false,
        primaryKey: true
    },
    Username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: false,
        primaryKey: true
    },
    Start_Time : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false,
        primaryKey: true
    },
    End_Time : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : false,
    },
    Members : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false
    }
});

const Payment_Info = db.define('Payment_Info',{
    Payment_Id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : true
    },
    Order_Id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique: true
    },
    Payment_Date : {
        type : Sequelize.JSON,
        allowNull : false,
        unique : false
    },
    Payment_Amount : {
        type : Sequelize.INTEGER,
        allowNull : false,
        unique : false
    },
    Order_Data : {
        type : Sequelize.JSON,
        allowNull : false,
        unique : false
    }
});



db.sync().then(()=>{
    console.log('Cart Database Ready!!');
});

module.exports = {
    db,
    Employee_Attendance,
    Employee_Table,
    Salary_Employee,
    Order,
    Menu,
    Payment_Info,
    Reservation_Info
}