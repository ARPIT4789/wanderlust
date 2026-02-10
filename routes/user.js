const express = require("express");

const router = express.Router();
const wrapasync = require("../utils/wrapasync");
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware");
const userController = require("../controller/users")

router.route("/signup")
.get(userController.renderSignupForm )
.post(wrapasync(userController.signUp));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local",
    {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login)

router.get("/logout",userController.logout)

module.exports = router