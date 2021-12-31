const express = require("express");
const router = express.Router();
const { facebookValidation,twitterValidation,instagramValidation,Validation} = require("../middlewares/userValidation");
const isAuth=require("../middlewares/isAuth");
const { addFacebook,addTwitter,addInstagram} = require("../controllers/socialInfos.controllers");

//Add a User's facebook
router.post("/facebook",facebookValidation(),Validation,isAuth,addFacebook);

//Add a User's twitter
router.post("/twitter",twitterValidation(),Validation,isAuth,addTwitter);

//Add a User's instagram
router.post("/instagram",instagramValidation(),Validation,isAuth,addInstagram);

module.exports = router;