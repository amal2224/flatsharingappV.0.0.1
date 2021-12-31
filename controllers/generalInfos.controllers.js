const User = require('../models/User.js');

// update fullName
exports.updateFullName=(req, res) => {
    User.findById(req.userId).then((user) => {(
        user.fullName = req.body.fullName),
        user.save()
            .then(() => res.status(200).json(user.fullName))
            .catch((err) => {
                res.status(500).send({errors:[{ msg: "Server Error" }]});
            });
    });
}
// add user address
exports.addUserAddress=(req, res) => {
    User.findById(req.userId).then((user) => {
        (user.address = req.body.address),
        user.save()
            .then(() => res.status(200).json(user.address))
            .catch((err) => {
            console.log(err.message);
            res.status(500).send({errors:[{ msg: "Server Error" }]});
        });
    });
}
// add phone number
exports.updatePhone=(req, res) => {
    User.findById(req.userId).then((user) => {
        (user.phoneNumber = req.body.phoneNumber),
        user.save()
        .then(() => res.status(200).json(user.phoneNumber))
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({errors:[{ msg: "Server Error" }]});
        });
    });
}