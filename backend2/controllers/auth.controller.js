const User = require("../models/auth.model.js")
const bcrypt = require("bcryptjs")
const generateToken = require("../models/auth.model.js")

const Home = (req,res) =>{
    try{
        res.status(200).send("hello home")
    }
    catch(error){
        console.log("home mein error aa rha hai ",error)
    }

}



const Register = async(req,res) =>{
    try{

        const {fullname , username, password, email, phone} = req.body

        //hashing ka ek aur method hai authmodel.js mein 
        // const saltround = 10;
        // const hash_password = await  bcrypt.hash(password, saltround)

        const userexist = await User.findOne({email : email})
        if(userexist){
           return res.status(400).json({
                message : "email already exists"
            })
        }

        const usercreated = await User.create({username, fullname, phone, password  , email})
        res.status(201).json({
            status : "registration successful",
            message : usercreated,
            token : await usercreated.generateToken(),
            userid : usercreated._id.toString()
        })
    }
    catch(error){
        console.log("registration mein error aa rha hai",error)
    }

}

const Login = async(req,res) =>{
    try{
        const {password, email} = req.body;
        const userexist = await User.findOne({email : email})
        if(!userexist){
            return res.status(401).json({
                message : "user not exist "
            })
        }

        //iska ek alternative hai , jasie password hashing ka tha usermodel jaisa same case
        // const user = await bcrypt.compare(password, userexist.password)
        const user = await userexist.comparepassword(password)
        if(user){
            return res.status(200).json({
                message: "login successfull",
                token : await  userexist.generateToken(),
                userid : userexist._id.toString()
            })
        }else{
            return res.status(401).json({
                message: "invalid email or password"
            })
        }

    }catch(error){
        console.log("login krte waqt error",error)
    }
}



const user = async (req, res) => {
    try {
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(`error from the user route ${error}`);
    }
  };

module.exports = {Home,Register, Login ,user}