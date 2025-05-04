
require("dotenv").config();
const mongoose = require("mongoose")
const express = require("express")
const app = express()


let MONGODB_URL = process.env.MONGODB_URL
const connectDB = async(req,res) =>{
    try{
       const responseofDB = await mongoose.connect(MONGODB_URL)
       console.log("DB connected ")
    }
    catch(error){
        console.log("DB error" ,  error)
    }
}
module.exports = connectDB
