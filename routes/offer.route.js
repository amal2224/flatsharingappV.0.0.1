const Offre = require("../models/Offre");
const User = require("../models/User");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {addNewOffre, getUserOffre, deleteOffre,getAllOffres} = require("../controllers/offer.controllers");
const isAuth=require("../middlewares/isAuth");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({ storage: storage });

//Add new offer
router.post("/", [upload.single("image"), isAuth],addNewOffre);

router.get("/:id",getUserOffre); 

router.get("/all/offre", getAllOffres);

router.delete("/:id", isAuth, deleteOffre);

module.exports = router;