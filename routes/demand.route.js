const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {addNewDemand,getUserDemands,deleteDemand ,getAllDemands} = require("../controllers/demand.controllers");
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

router.post("/", [upload.single("image"), isAuth], addNewDemand);

router.get("/:id",getUserDemands); 

router.get("/all/demands" , getAllDemands);

router.delete("/:id", isAuth, deleteDemand);

module.exports = router;