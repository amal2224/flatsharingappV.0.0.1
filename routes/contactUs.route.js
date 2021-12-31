const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const nodemailer = require("nodemailer");

router.post("/",[
    body("fullName", "Name error").notEmpty().matches(/^[a-z ]+$/i),
    body("email", "Email error").notEmpty().isEmail(),
    body("message", "Message error").notEmpty(),
    ],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    let output = `
        <p>You have a new contact request</p>
        <h4>Contact Details </h4>
        <ul>
            <li>Name: ${req.body.fullName}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message: ${req.body.message}</li>
        </ul>`;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, //localhost
        },
    });

    let mailOptions = {
        from:
            "'Flatsharing Contact Request'<flatsharing.gmc@gmail.com>",
      to: "kthiri.amal20@gmail.com",
      text: "",
      subject: "flatsharing Contact Request",
      html: output,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(404).send({ errors: [{ msg: "Error" }] });
      } else {
        res.status(200).send("send!");
      }
    });
  }
);

module.exports = router;