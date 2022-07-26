const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
const path = require('path')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')

//Database connection
const url = 'mongodb+srv://dhruv:lmd@lmd.zh0hqt6.mongodb.net/LMD';
mongoose.connect(url);

const connection = mongoose.connection;

connection.once('open', () => { 
    console.log('database connected...')
})

//Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


//Routes

require('./routes/web')(app)



app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})