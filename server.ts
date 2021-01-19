require("dotenv").config()
import express from "express"
import cors from "cors"
import logger from "./utils/logger"

const port = process.env.PORT || 8080;

//server created as an APP. 
const server = express()

server.use(cors())

server.get("/", (res:any)=>{
    res.status(200).json({message: "Welcome to the Journal! Work in progress."})
})

server.listen(port, ()=>{
    logger.info(`🚀Server is ready and running on http://localhost:${port}`)
})