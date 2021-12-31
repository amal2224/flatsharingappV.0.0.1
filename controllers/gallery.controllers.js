const Image= require("../models/Image")
const User = require("../models/User");

// this fn for added many photos as a gallery for user , i want to added the same fn for demands and offre
exports.addNewImage=(req, res) => {
    let allImgs = [];
    req.files.forEach((el) => {
        el.path =
        req.protocol +
        "://" +
        req.hostname +
        ":" +
        9000 +
        "/uploads/" +
        el.filename;

    let newImage = new Image({ imageName: el.path, owner: req.user });
    newImage.save();

    User.findById(req.user).then((user) => {
        user.images.push(newImage.id),
        user.save()
            .then(() => res.status(200))
            .catch((err) => {
            console.log(err.message);
            res.status(500).send({errors:[{ msg: "Server Error" }]});
            });
    });
    allImgs.push(newImage);
    });
    try {
        res.status(200).send(allImgs);
    } catch (err) {
    console.error(err.message);
    res.status(500).send({errors:[{ msg: "Server Error" }]});
    }
}
exports.getUserImages=(req, res) => {
    Image.find({ owner: req.params.id })
    .then((images) => res.send(images))
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}
// -->err: Cannot read property 'owner' of null
exports.deleteImage=(req, res) => {
    Image.findById({ _id: req.params.id })
    .then((image) => {
        if (req.user == image.owner) {
        User.findById({ _id: req.user }).then((user) => {
            let arr = user.images;
            user.images = [];
            (user.images = arr.filter((el) => el != image.id)),
            user.save()
                .then(() => res.status(200))
                .catch((err) => {
                console.log(err.message);
                res.status(500).send({errors:[{ msg: "Server Error" }]});
                });
        });
        Image.findByIdAndDelete({ _id: req.params.id }).then(() => {
            res.status(200).send(req.params.id);
        });
        }
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}