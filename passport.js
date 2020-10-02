const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Customer = require('./db').Customer

// console.log(passport)


passport.serializeUser(
    function(Customer,done) {
        done(null,Customer.Username) 
    }
)


passport.deserializeUser(
    function(Username,done){
        Customer.findByPk(Username)
        .then((user)=>{
            done(null,user) 
        })
        .catch(done)
    }
)

// passport.use(new localStrategy(
//     function(Username,Password,done){
//         console.log("Username is: ", Username, "\nPassword is: ",Password)
//         Customer.findOne({
//             where:{Username:Username} 
//         })
//         .then((user)=>{
//             if(!user){
//                 console.log("User Not Found")
//                 return done(null,false) 
//             }
//             if(user.Password != Password){
//                 console.log("Password doesn't match")
//                 return done(null,false) 
//             }
//             done(null,user) 
//         })
//         .catch(done)
//     }
// ))

passport.use(new LocalStrategy(
    function(Username, Password, done) {
        console.log('dfghj')
      User.findOne({ Username: Username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(Password)) { return done(null, false); }
        return done(null, user);
      });
    }
));

module.exports = passport

