require('dotenv').config()
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
const path = require('path')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo')


//Database connection
const url = 'mongodb+srv://dhruv:lmd@lmd.zh0hqt6.mongodb.net/LMD';
mongoose.connect(url);

const connection = mongoose.connection;

connection.once('open', () => { 
    console.log('database connected...')
})

//sessionstore
let mongoStore = MongoDBStore.create({
                                    mongoUrl: process.env.MONGO_DB_URL,
                                    collectionName: 'sessions'
                                })

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))
app.use(flash())

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


//Assets
app.use(express.static ("public" ))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


//Routes

require('./routes/web')(app)



app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})