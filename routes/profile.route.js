const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get a Profil
router.get("/:id", (req, res) => {
    User.findById(
    {_id: req.params.id },
    {
        fullName: 1,
        avatar: 1,
        email:1,
        address: 1,
        phoneNumber: 1,
        facebook: 1,
        twitter: 1,
        instagram: 1,
    }
    )
    .then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
});

//Get all user Profil
router.get("/all/users", (req, res) => {
    User.find({}).then((user) => {
        res.status(200).send(user);
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
});

module.exports = router;