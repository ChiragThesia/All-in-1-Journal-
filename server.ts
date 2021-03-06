require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const helmet = require("helmet")
const cors = require("cors")
const {auth, requiresAuth} = require("express-openid-connect")
//@ts-ignore
const mongoURI = require('./config/config');

//express instance

const server = express();
const PORT = process.env.PORT || 8080;

mongoose
    .connect(
        mongoURI, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useFindAndModify: false, 
            useCreateIndex: true
        },
        console.log(`Mongo is connected at ${mongoURI}`)
    ).catch((error:any)=>{
        Promise.reject(new Error("DB has ran into an error"))
    })

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
server.use(cors())

const config: object = {
    authRequired: false, 
    auth0Logout: true, 
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL

}

server.use(auth(config))

server.get('/', (req:any, res:any)=>{
    res.send(req.oidc.isAuthenticated()? 'Logged in' : 'Logged Out')
})

server.get('/', (req:any,res:any)=>{
    try{
        res.status(200).send("THe API is up and running")
    } catch(error){
        res.status(404).send({message:"ran into an issue"}, error)
    }
    
})

//User Profile 
server.get('/profile', requiresAuth(), (req:any, res:any)=>{
    res.send(JSON.stringify(req.oidc.user))
})

server.all("*", (req:any,res:any)=>{
    res.status(404).json({message: "URL cannot be found."})
    
})
server.listen(PORT, ()=>{
    console.info(`🚀 🧑🏽‍💻Server is running on ${process.env.NODE_ENV} mode at: http://localhost:${PORT} 🚀`); //eslint-disable-line no-console
})