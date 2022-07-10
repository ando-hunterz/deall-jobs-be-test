const mongoose = require('mongoose')
const { Schema } = mongoose;

const UsersSchema =  new Schema({
    username: String,
    password: String,
    role: String,
})

module.exports = mongoose.model('Users', UsersSchema)