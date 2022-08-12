function userController() {
    return{
        index(req, res) {
            res.render('userViews/courier.ejs')
        }
    }
}

module.exports = userController