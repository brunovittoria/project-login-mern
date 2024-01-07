const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const UserModel = require('./src/models/Users')
const connectToDatabase = require("./src/database/connect")
const bcrypt = require('bcrypt')

dotenv.config() //DEVE SER CHAMADO PRIMEIRO SEMPRE!

connectToDatabase()

const app = express()
app.use(cors())
app.use(express.json())

//Aqui abaixo teremos nossas rotas:
app.post('/register', (req,res) => {
    const {name, email, password} = req.body  //Fazemos o desconstructuring para fazer a HASH da PWD com BCRYPT
    bcrypt.hash(password, 10) //O 10 representa o custo do algoritmo de hash bcrypt. 2^10 (1024) vezes para gerar o hash da senha
    .then(hash => {
        UserModel.create({name, email, password: hash}) //Devemos atribuir o valor da PASSWORD para HASH
        .then(users => res.json(users))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body
    UserModel.findOne({email: email})  //Acima verificamos se o usuario existe, verificando o EMAIL dele
    .then(user => {                     
        if(user) {                     // Verifica se o usuário existe no DB      
            bcrypt.compare(password, user.password, (err, response) => { // Compara a senha fornecida com a senha armazenada no DB
                if(response) {
                    res.json("Success") // Se a comparação for bem-sucedida, a senha está correta
                } else {
                    res.json("Incorrect password")
                }
            })
        } else {
            res.json("No record exists")   //Erro caso o usuario nao existir dentro do DB
        }
    })
})

app.listen(3001 , () => {
    console.log("Server is running")
} )