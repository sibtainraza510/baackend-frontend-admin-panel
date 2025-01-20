const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
      res.status(200).json({ message: "Welcome to our home page" });
    } catch (error) {
      console.log(error);
    }
  };


  // const register = async (req, res) => {
  //   try {
  //     const data = req.body;
  //     console.log(req.body);
  //     res.status(200).json({ msg: data });
  //   } catch (error) {
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // };
  

  const register = async (req, res) => {
    try {
      console.log(req.body);
      const { username, email, phone, password } = req.body;
  
      const userExist = await User.findOne({  email  });
  
      if (userExist) {
        return res.status(400).json({ message: "email already exists" });
      }
      
      const saltRound = 10;
      const hash_password = await bcrypt.hash(password, saltRound);
      const userCreated = await User.create({ username, email, phone, password : hash_password });
  
      res.status(201).json({ 
        msg: userCreated , 
         token: await userCreated.generateToken(),  
         userId: userCreated._id.toString()
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };



  const login = async (req, res) => {
    try {

      //email aur password le rha hu body se(input se)
      const { email, password } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const user = await bcrypt.compare(password, userExist.password);
      // const isPasswordValid = await userExist.comparePassword(password);
  
      if (user) {
        res.status(200).json({
          message: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password " });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  

  // *-------------------
// User Logic
// *-------------------

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
    // res.status(200).json({msg: "hi user"});
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};



  
  module.exports = { home, register, login, user };
