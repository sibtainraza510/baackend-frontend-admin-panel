const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userSchema = new mongoose.Schema({

    fullname : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    isadmin : {
        type : Boolean, 
        default : true
    }

    
})

userSchema.methods.comparepassword = async function(password){
    return bcrypt.compare( password,this.password)
}

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    try{
        const saltround = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(this.password, saltround)
        this.password = hash_password
    }
    catch(error){
        console.log("hashing problem" , error)

    }
        
})


userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userid : this._id.toString(),
            email : this.email,
            isadmin : this.isadmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn : "30d"
        })

    }
    catch(error){
        console.log("token error" , error)

    }
}


const User = new mongoose.model("User", userSchema)
module.exports =  User