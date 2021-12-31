const User = require("../models/User");
const Testimonial = require("../models/Testimonial");

exports.addNewTestimonial=(req, res) => {
    let newTestimonial = new Testimonial({
        ...req.body,
        feedback: req.body.feedback,
        rate: req.body.rate,
        owner: req.userId,
    });

    newTestimonial.save()
        .then((testimonial) => {
        res.status(201).send("testimonial uploaded!");
        User.findById(req.userId).then((user) => {
        user.testimonials.push(testimonial.id),
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

exports.getAllTestimonial=(req, res) => {
    Testimonial.find()
    .sort({ rate: -1 })
    .limit(3)
    .populate("owner", { fullName: 1, avatar: 1 })
    .then((testimonials) => {
        let feed = testimonials.filter((el) => el.rate > 3);
        res.status(201).send(feed);
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}