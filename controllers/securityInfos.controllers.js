const User = require('../models/User.js');
const bcrypt = require("bcryptjs");
// update email
exports.updateEmail=(req, res) => {
    User.findById(req.userId).then((user) => {
        (user.email = req.body.email),
        user.save()
        .then(() => res.status(200).json(user.email))
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({errors:[{ msg: "Server Error" }]});
        });
    });
}
// update password
exports.updatePassword=(req, res) => {
    User.findById(req.userId).then((user) => {
      //comparaison des mots de passe
    bcrypt.compare(req.body.actualPassword, user.password, (err, isMatch) => {
        if (err) {
            throw err;
        } else if (!isMatch) {
            return res.status(401).send({ errors: [{ msg: "Wrong password" }] });
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res
            .status(401)
            .send({ errors: [{ msg: "Passwords don't match" }] });
        }
        //crypter le nouveau mot de passe
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
            throw err;
        }
        bcrypt.hash(req.body.newPassword, salt, (err, hashedPassword) => {
            if (err) {
                throw err;
            }
            user.password = hashedPassword;
            user.save()
                .then(() => res.status(200).json("passeword is updated!"))
                .catch((err) => {
                console.log(err.message);
                res.status(500).send({errors:[{ msg: "Server Error" }]});
            });
        });
        });
    });
    });
}