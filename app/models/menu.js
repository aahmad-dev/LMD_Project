const mongoose = require('mongoose')
const Schema = mongoose.Schema

new Schema({
    name: { type: String, required:true }
})