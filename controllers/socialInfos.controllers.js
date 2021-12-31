const User = require('../models/User.js');

exports.addFacebook=(req, res) => {
    User.findById(req.userId).then((user) => {
        (user.facebook = req.body.facebook),
        user.save()
            .then(() => res.status(200).json(user.facebook))
            .catch((err) => {
            console.log(err.message);
            res.status(500).send({errors:[{ msg: "Server Error" }]});
        });
    });
}

exports.addTwitter=(req, res) => {
    User.findById(req.userId).then((user) => {
        (user.twitter = req.body.twitter),
        user.save()
            .then(() => res.status(200).json(user.twitter))
            .catch((err) => {
            console.log(err.message);
            res.status(500).send({errors:[{ msg: "Server Error" }]});
        });
    });
}

exports.addInstagram=(req, res) => {
    User.findById(req.userId).then((user) => {
        (user.instagram = req.body.instagram),
        user.save()
            .then(() => res.status(200).json(user.instagram))
            .catch((err) => {
            console.log(err.message);
            res.status(500).send({errors:[{ msg: "Server Error" }]});
        });
    });
}