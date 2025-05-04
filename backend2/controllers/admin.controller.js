const User = require("../models/auth.model") ;
const Contact = require("../models/contact.model");

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      console.log(users);
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No Users Found" });
      }
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };


   const getAllContacts = async (req,res) =>{
    try{
      const contacts = await Contact.find();
      console.log(contacts);
      if (!contacts || contacts.length === 0) {
        return res.status(404).json({ message: "No contacts Found" });
      }
      return res.status(200).json(contacts);

    }catch(e){
      next(e)

    }


  };

  const deleteUserById = async (req, res) => {
    try {
      const id = req.params.id;
      await User.deleteOne({ _id: id });
      return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };

  
  //* user update Logic 📝


const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    //rebody krne se jo hum post krenge frontend mein wo backend easily le lega;;;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};


//* single user Logic 📝
// *-------------------------------

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};


const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

  module.exports = {getAllUsers , getAllContacts , deleteUserById , updateUserById , getUserById , deleteContactById}