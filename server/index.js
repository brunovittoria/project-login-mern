const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const UserModel = require('./src/models/Users')
const connectToDatabase = require("./src/database/connect")

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

app.post('/login', (req, res) => {
    const {email, password} = req.body
    UserModel.findOne({email: email})  
    .then(user => {                     //Acima verificamos se o usuario existe, verificando o EMAIL dele
        if(user) {                      //Aqui verificamos se a PWD do USER ESTA CORRETA
            if(user.password === password) {
                res.json("Success")
            } else{
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record exists")   //Erro caso o usuario nao existir dentro do DB
        }
    })
})

app.listen(3001 , () => {
    console.log("Server is running")
} )