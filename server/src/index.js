const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const UserModel = require('./models/Users')
const connectToDatabase = require("./database/connect")

dotenv.config() //DEVE SER CHAMADO PRIMEIRO SEMPRE!

connectToDatabase()

const app = express()
app.use(cors())
app.use(express.json())

//Aqui abaixo teremos nossas rotas:
app.post('/register', (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))

})

app.listen(3001 , () => {
    console.log("Server is running")
} )