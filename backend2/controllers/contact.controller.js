const Contact = require("../models/contact.model")
const contactcontroller = async(req,res) =>{
    try{
        let response = req.body;
        await Contact.create(response)
        return res.status(200).json({
            msg : "message send successfully"
        })
    }
    catch(error){
        return res.status(400).json({
            msg: "sorry msg not send"
        })

    }
}
module.exports = contactcontroller