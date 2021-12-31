const express = require('express');
require("dotenv").config();
const router = express.Router();
const { register,login,loadUser,currentUser} = require("../controllers/user.controllers");
const { registerValidation, loginValidation,Validation } = require("../middlewares/userValidation");
const isAuth=require("../middlewares/isAuth")

//*******************************Signup********************************************
router.post('/register', registerValidation(),Validation,register);
//*******************************Login*********************************************
router.post('/login',loginValidation(),Validation,login);

//LOAD USER CONNECTED
router.get("/login", isAuth,loadUser);

////*****************************Current User , user conected now (just the ID) --private root****************
router.get('/currentUser', isAuth, currentUser);

module.exports = router;