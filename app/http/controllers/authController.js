const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')


function authController() {
    return{
        login(req, res) {
            res.render('auth/login.ejs')
        },

        register(req, res) {
            res.render('auth/register.ejs')
        },

        postLogin(req, res, next){
            passport.authenticate('local', (err, user, info) => {
                if(err){
                    console.log(info.message)
                    return next(err)
                }
                if(!user){
                    console.log(info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err){
                        console.log(info.message)
                        return next(err)
                    }
                    console.log(info.message)

                    if(user.role = "courier"){

                        return res.redirect('/user')
                    }
                })
            })(req, res, next)

        },

        async postRegister(req, res){
            const { name, email, password, role } = req.body
            //validate request
            if(!name || !email || !password || !role){
                //////need error messages///////
                console.log('need all fields')
                return res.redirect('/register')
            }
            
            //check if email exists

            User.exists({ email:email }, (err, result) => {
                if(result){
                    //////need error messages///////
                    console.log('email exists')
                    return res.redirect('/register')
                }
            })
            //return console.log("break the loop")
           
            //hash pass
            const hashedPassword = await bcrypt.hash(password, 10)
            
            //Create a user
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword,
                role: role
            })
            
            user.save().then(() => {
                console.log('registration successful ')
                //Login
                return res.redirect('/login')
            }).catch(err => {
                //Need error messages
                console.log(err)
                console.log('something went wrong')
                return res.redirect('/register')
            })


            
        },

        logout(req, res) {
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/');
            });
        }

    }
}

module.exports = authController