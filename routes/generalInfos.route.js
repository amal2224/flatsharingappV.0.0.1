const express = require("express");
const router = express.Router();
const { fullNameValidation,Validation,phoneValidation,addressValidation } = require("../middlewares/userValidation");
const isAuth=require("../middlewares/isAuth");
const { updateFullName,updatePhone,addUserAddress} = require("../controllers/generalInfos.controllers");

//update a User's fullName
router.post("/fullName",fullNameValidation(),Validation,isAuth, updateFullName);

//Add a User's adress
router.post("/address",addressValidation(),Validation,isAuth,addUserAddress);

//Add a User's proNumber
router.post("/phone",phoneValidation(),Validation,isAuth,updatePhone);

module.exports = router;