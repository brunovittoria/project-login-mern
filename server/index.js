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
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"], //Allowing FRONTEND users from this ORIGIN
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(cookieParser())

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

//Middleware que verificaUser
const verifyUser = (req, res, next) => { //Usamos o next para passar o CONTROLE para o PROXIMO MIDDLEWARE
    const token = res.cookies.token
    console.log(token)
    if(!token) {
        return res.json("The token was not available")
    } else {
        jwt.verify(token, "jwt-secret-key", (err,decoded) => { //Verificamos o TOKEN presente na MAQUINA 
            if(err) return res.json("Token is wrong")
            next()  //Passamos o controle do RETURN para o proximo MIDDLEWARE
        })
    }
}

//Rota para fazer checkAuth do USER
app.get('/check-auth', verifyUser, (req, res) => {
    return res.json("Success")
})

app.post('/login', (req, res) => {
    const {email, password} = req.body
    UserModel.findOne({email: email})  //Acima verificamos se o usuario existe, verificando o EMAIL dele
    .then(user => {                     
        if(user) {                     // Verifica se o usuário existe no DB      
            bcrypt.compare(password, user.password, (err, response) => { // Compara a senha fornecida com a senha armazenada no DB
                if(response) {
                    const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn: "1d"}) //O Token inclui INFOS do USER, nesse caso so EMAIL
                    res.cookie("token", token) //Enviamos o token no COOKIE
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