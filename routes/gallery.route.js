const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Image= require("../models/Image")
const User = require("../models/User");
const isAuth=require("../middlewares/isAuth");
const { addNewImage,getUserImages,deleteImage} = require("../controllers/gallery.controllers");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({ storage: storage });

//Add a new image
router.post("/", [upload.array("gallery", 10), isAuth], addNewImage );

//Get user's images
router.get("/:id", isAuth,getUserImages); 

//Delete an image
router.delete("/:id", isAuth, deleteImage);

module.exports = router;