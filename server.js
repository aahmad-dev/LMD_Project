const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

const path = require('path')

const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')

app.get('/', function(req,res){
    res.render('home.ejs')
    //console.log("done")
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})