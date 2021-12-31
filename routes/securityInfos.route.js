const express = require("express");
const router = express.Router();
const {Validation,emailValidation,passwordValidation} = require("../middlewares/userValidation");
const isAuth=require("../middlewares/isAuth");
const {updateEmail,updatePassword} = require("../controllers/securityInfos.controllers");

//update a User's email
router.post("/email",emailValidation(),Validation,isAuth, updateEmail);
// Update password
router.post("/password",passwordValidation(),Validation,isAuth, updatePassword);

module.exports = router;