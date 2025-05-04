const express = require("express")
const router = express.Router();
const contactcontroller = require("../controllers/contact.controller.js")
router.route("/contact").post(contactcontroller)
module.exports = router