const User = require('../../models/user')
const bcrypt = require('bcrypt')


function authController() {
    return{
        login(req, res) {
            res.render('auth/login.ejs')
        },

        register(req, res) {
            res.render('auth/register.ejs')
        },

        async postRegister(req, res){
            const { name, email, password } = req.body
            //validate request
            if(!name || !email || !password){
                //////need error messages///////
                console.log('need all fields')
                return res.redirect('/register')
            }
            
            //check if email exists
            User.exists({ email: email }, (err, result) => {
                if(result){
                    //////need error messages///////
                    console.log('email exists')
                    return res.redirect('/register')
                }
            })
            
            //hash pass
            const hashedPassword = await bcrypt.hash(password, 10)
            
            //Create a user
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })
            
            user.save().then(() => {
                console.log(req.body)
                //Login
                return res.redirect('/')
            }).catch(err => {
                //Need error messages
                console.log(err)
                console.log('something went wrong')
                return res.redirect('/register')
            })


            console.log(req.body)
        }
    }
}

module.exports = authController