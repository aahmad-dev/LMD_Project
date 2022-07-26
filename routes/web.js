const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')

function initRoutes(app){
    

    app.get('/', homeController().index)
    
    /*function(req,res){
        res.render('home.ejs')
        //console.log("done")
    })*/

    app.get('/login', authController().login)

    app.get('/register', authController().register)
    app.post('/register', authController().postRegister)

}


module.exports = initRoutes