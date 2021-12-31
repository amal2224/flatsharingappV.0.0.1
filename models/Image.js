const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    imageName: String,

    created_at: {
    type: Date,
    default: Date.now,
},
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },

    offers: {
    type: mongoose.Types.ObjectId,
    ref:"offre"
    },

requests: {
    type: mongoose.Types.ObjectId,
    ref:"request"
    },
});

module.exports = mongoose.model("image", ImageSchema);
