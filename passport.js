const passport = require('passport'), localStrategy = require('passport-local').Strategy

const Customer = require('./db').Customer

passport.serializeUser(
    function(Customer,done) {
        // console.log("Serialize Customer ", Customer.Username)
        done(null,Customer.Username) 
    }
)


passport.deserializeUser(
    function(Username,done){
        Customer.findByPk(Username, function(err, user) {
            done(err, user);
          });
    }
)

passport.use(new localStrategy(
    function(Username,Password,done){
        console.log("Username is: ", Username, "\nPassword is: ",Password)
        Customer.findOne({
            where : {Username: Username} 
        })
        .then((user)=>{
            if(!user){
                console.log("User Not Found")
                return done(null,false) 
            }
            if(user.Password != Password){
                console.log("Password doesn't match")
                return done(null,false) 
            }
            done(null,user) 
        })
        .catch(done)
    }
))


module.exports = passport

