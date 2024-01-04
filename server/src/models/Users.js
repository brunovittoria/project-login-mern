const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({ //Esses serao os dados dos USERS a serem passados para nosso DB
    name: String,
    email: String,
    password: String
})

const UserModel = mongoose.model("users", UserSchema)  //Este é o modeloSchema que criamos la dentro do nosso DB
module.exports = UserModel

