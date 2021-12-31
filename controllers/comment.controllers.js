const Comment = require("../models/Comment");
const User = require("../models/User");
const Reply = require("../models/Reply");

exports.addNewComment=(req, res) => {
    let newComment = new Comment({
        text: req.body.comment,
        owner: req.userId,
        comment_to: req.params.id,
    });

    newComment.save()
        .then(() => {
        Comment.populate(newComment, {
            path: "owner",
            select: {
                fullName: 1,
                avatar: 1,
                address: 1,
                phoneNumber: 1,
            },
        }).then((comment) => res.status(201).send(comment));

        User.findById(req.userId).then((user) => {
        user.comments.push(newComment._id),
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

exports.updateComment=(req, res) => {
    // id --> of the comment
    Comment.findByIdAndUpdate({ _id: req.params.id })
    .then((comment) => {
        if (req.userId == comment.owner) {
        comment.text = req.body.comment;
        comment.save()
            .then(() =>
            res.status(200).json({ id: comment._id, text: comment.text })
            )
            .catch((err) => {
            console.log(err.message);
            return res.status(500).send({errors:[{ msg: "Server Error" }]});
            });
        }
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

exports.deleteComment=(req, res) => {
    let commentToDelete;
    let user;
    let replysToDelete;
    // id --> of the comment to deteted
    Comment.findById({ _id: req.params.id})
    .then((comment) => {
        commentToDelete = comment;
        return Reply.find({ reply_to: req.params.id });
    })
    .then((replys) => {
        replysToDelete = replys;
        return User.findById({ _id: req.userId });
    })
    .then((user) => {
        let arr = user.comments;
        let arrUpdated = [];
        arrUpdated = arr.filter((el) => !el.equals(commentToDelete._id));
        for (let i = 0; i < replysToDelete.length; i++) {
            let newArr = arrUpdated.filter(
            (el) => !el.equals(replysToDelete[i]._id)
        );
        arrUpdated = newArr;
        Reply.findByIdAndDelete({ _id: replysToDelete[i]._id });
        }
        user.comments = arrUpdated;
        return user.save();
    })
    .then((user) => {
        return Comment.findByIdAndDelete({ _id: req.params.id });
    })
    .then((resultat) => {
        res.status(200).send({ id: req.params.id });
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

exports.addReply=(req, res) => {
    // id--> the id of the comment to reply
    Comment.findById({ _id: req.params.id })
    .then((comment) => {
        let newReply = new Reply({
            text: req.body.reply,
            owner: req.userId,
            reply_to: req.params.id,
        });
        newReply.save().then(() => {
            Reply.populate(newReply, {
                path: "owner",
                select: {
                    fullName: 1,
                    avatar: 1,
                    address: 1,
                    phoneNumber: 1,
                },
        }).then((reply) => res.status(201).send(reply));

        Comment.findById({ _id: req.params.id }).then((comment) => {
            comment.replies.push(newReply.id);
            comment.save()
            .then(() => res.status(200))
            .catch((err) => {
                console.log(err.message);
                res.status(500).send({errors:[{ msg: "Server Error" }]});
            });
        });
        User.findById(req.userId).then((user) => {
            user.comments.push(newReply.id),
            user.save()
                .then(() => res.status(200))
                .catch((err) => {
                console.log(err.message);
                res.status(500).send({errors:[{ msg: "Server Error" }]});
                });
        });
    });
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

exports.updateReply=(req, res) => {
    // the id replay
    Reply.findByIdAndUpdate({ _id: req.params.id })
    .then((reply) => {
        if (req.userId == reply.owner) {
            reply.text = req.body.reply;
            reply.save()
            .then(() =>
            res.status(200).json({
                id: reply._id,
                text: reply.text,
                reply_to: reply.reply_to,
            })
            )
            .catch((err) => {
                console.log(err.message);
                return res.status(500).send({errors:[{ msg: "Server Error" }]});
            });
        }
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

exports.deleteReply=(req, res) => {
    Reply.findById({ _id: req.params.id })
        .then((reply) => {
        if (req.userId == reply.owner) {
            User.findById({ _id: req.userId }).then((user) => {
            let arr = user.comments;
            user.comments = [];
            (user.comments = arr.filter((el) => el != reply.id)),
            user.save()
                .then(() => res.status(200))
                .catch((err) => {
                    console.log(err.message);
                    res.status(500).send({errors:[{ msg: "Server Error" }]});
                });
        });
        Comment.findById({ _id: reply.reply_to }).then((comment) => {
            let arr = comment.replies;
            comment.replies = [];
            (comment.replies = arr.filter((el) => el != reply.id)),
            comment.save()
                .then(() => res.status(200))
                .catch((err) => {
                console.log(err.message);
                res.status(500).send({errors:[{ msg: "Server Error" }]});
                });
        });

        Reply.findByIdAndDelete({ _id: req.params.id }).then(() => {
            res.status(200).send({ id: req.params.id, comment: req.body.commentId });
        });
        }
    })
    .catch((err) => {
        console.log(err.message);
        return res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}

exports.getComment=(req, res) => {
    Comment.find({ comment_to: req.params.id })
        .populate({
            path: "owner",
            select: { fullName: 1, avatar: 1, address: 1, phoneNumber: 1 },
    })
        .populate({
            path: "replies",
            select: { text: 1, create__at: 1 },
            populate: {
                path: "owner",
                select: { fullName: 1, avatar: 1, address: 1, phoneNumber: 1 },
            },
    })

    .then((comment) => {
        res.send(comment);
    })
    .catch((err) => {
        console.log(err.message);
        res.status(500).send({errors:[{ msg: "Server Error" }]});
    });
}