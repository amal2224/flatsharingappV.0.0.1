const express = require("express");
const isAuth=require("../middlewares/isAuth")
const router = express.Router();
const {addNewTestimonial,getAllTestimonial} = require("../controllers/testimonial.controllers");

//Add new testimonial
router.post("/", isAuth, addNewTestimonial);

//Get  All testimonials
router.get("/", getAllTestimonial);

module.exports = router;