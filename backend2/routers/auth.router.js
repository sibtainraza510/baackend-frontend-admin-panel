const express = require("express");
const router = express.Router();
// const Home = require("../controllers/auth.controller.js")
const authcontrollers = require("../controllers/auth.controller.js")
const validate = require("../middlewares/validate.middleware.js")
const {signupSchema} = require("../validators/auth.validator.js")
const {signinSchema} = require("../validators/auth.validator.js")
const authMiddleware = require("../middlewares/auth.middleware.js")
// router.get("/", (req,res)=>{
//     res.status(200).send("hello router")
// })
//or
// router.route("/").get((req,res)=>{
//     res.status(200).send("hello router2")
// })

router.route("/").get(authcontrollers.Home);
router.route("/register").post(validate(signupSchema),authcontrollers.Register)
router.route("/login").post(validate(signinSchema), authcontrollers.Login)
router.route("/user").get(authMiddleware , authcontrollers.user)
module.exports = router;