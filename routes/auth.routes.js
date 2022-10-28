
const router = require("express").Router();

const {signupProcess,loginProcess,logoutProcess} = require("../controllers/auth.controller")

router.post("/signup",signupProcess)

//login
router.post("/login",loginProcess)

//log out
router.get("/logout",logoutProcess)

module.exports=router