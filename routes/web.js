const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')

const guest = require('../app/http/middleware/guest')

function initRoutes(app){
    

    app.get('/', homeController().index)
    
    /*function(req,res){
        res.render('home.ejs')
        //console.log("done")
    })*/

    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

}


module.exports = initRoutes