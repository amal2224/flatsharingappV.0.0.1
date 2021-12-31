const Offre = require("../models/Offre");
const User = require("../models/User");

exports.addNewOffre=(req, res) => {
  let path =
    "https://www.cidj.com/sites/default/files/styles/og_image/public/2019-02/colocation.jpg?itok=gYhe6zP2";

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

  // let myBody = JSON.parse(req.body.offer);
  let myBody = req.body;
  let newOffre = new Offre({
    ...myBody,
    image: path,
    owner: req.userId,
  });

  newOffre
    .save()
    .then((offre) => {
      res.status(201).send(offre);
      User.findById(req.userId).then((user) => {
        user.offres.push(offre.id),
          user
            .save()
            .then(() => res.status(200))
            .catch((err) => {
              console.log(err.message);
              res.status(500).send({ msg: "Server Error" });
            });
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
}

exports.getUserOffre=(req, res) => {
    Offre.find({ owner: req.params.id })
    //   .populate({
    //         path: "owner",
    //         select: { fullName: 1, avatar: 1, address: 1, phoneNumber: 1 },
    // })
    .then((offres) => res.send(offres))
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

exports.getAllOffres=(req, res) => {
    Offre.find({})
      .populate({
            path: "owner",
            select: { fullName: 1, avatar: 1, address: 1, phoneNumber: 1 },
    })
    
    .then((allOffre) => {
        res.status(200).send(allOffre);
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

exports.deleteOffre=(req, res) => {
  Offre.findById({ _id: req.params.id })
    .then((offre) => {
      if (req.userId == offre.owner) {
        User.findById({ _id: req.userId }).then((user) => {
          let arr = user.offres;
          user.offres = [];
          (user.offres = arr.filter((el) => el != offre.id)),
            user
              .save()
              .then(() => res.status(200))
              .catch((err) => {
                console.log(err.message);
                res.status(500).send({ msg: "Server Error" });
              });
        });
        Offre.findByIdAndDelete({ _id: req.params.id }).then(() => {
          res.status(200).send(req.params.id);
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send({ msg: "Server Error" });
    });
};