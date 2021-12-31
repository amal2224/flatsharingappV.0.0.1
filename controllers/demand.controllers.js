const Request = require("../models/Request");
const User = require("../models/User");

exports.addNewDemand=(req, res) => {
    let path ="https://thumbs.dreamstime.com/b/d-house-search-concept-render-houses-magnifying-glass-searching-unique-54337196.jpg";

    if (req.file) {
        path =
        req.protocol +
        "://" +
        req.hostname +
        ":" +
        9000 +
        "/uploads/" +
        req.file.filename;
    }

    let myBody = req.body;
    let newRequest = new Request({
        ...myBody,
        image: path,
        owner: req.userId,
    });

    newRequest.save()
            .then((request) => {
            res.status(201).send(request);
            User.findById(req.userId).then((user) => {
            user.requests.push(request.id),
            user.save()
                .then(() => res.status(200))
                .catch((err) => {
                console.log(err.message);
                res.status(500).send({errors:[{ msg: "Server Error" }]});
            });
        });
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

exports.getUserDemands=(req, res) => {
    Request.find({ owner: req.params.id })
    .then((requests) => res.send(requests))
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

exports.getAllDemands= (req, res) => {
    Request.find({})
    .populate({
            path: "owner",
            select: { fullName: 1, avatar: 1, address: 1, phoneNumber: 1 },
    })
    .then((allDemands) => {
        res.status(200).send(allDemands);
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

// it doesn't work >.< infinity loop in postman
exports.deleteDemand=(req, res) => {
    Request.findById({ _id: req.params.id })
    .then((request) => {
        if (req.userId == request.owner) {
            console.log(req.userId,request.owner)
        User.findById({ _id: req.userId }).then((user) => {
            let arr = user.requests;
            user.requests = [];
            (user.requests = arr.filter((el) => el != request.id)),
            user.save()
                .then(() => res.status(200))
                .catch((err) => {
                console.log(err.message);
                res.status(500).send({errors:[{ msg: "Server Error" }]});
                });
        });
        Request.findByIdAndDelete({ _id: req.params.id }).then(() => {
            res.status(200).send(req.params.id);
        });
        }
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}