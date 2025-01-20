const express = require("express");
const router = express.Router();
const authControllers = require("../controller/auth-controller");
const validate = require("../middlewares/validate-middleware");
const signupSchema = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);
router.route("/register").post(validate(signupSchema), authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/user").get( authMiddleware, authControllers.user);

module.exports = router;