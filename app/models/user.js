const mongoose = require('mongoose')
const Schema = mongoose.Schema

userSchema = new Schema({
    name: { type: String, required:true },
    email: { type: String, required:true , unique: true },
    password: { type: String, required:true },
    role: { type: String, required:true, default:'customer' },
}, { timestamp: true })

module.exports = mongoose.model('User', userSchema)