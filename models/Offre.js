const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema({
    owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    },

    image: String,
    title: String,
    ville: String,
    description: String,

    category : String,     // category :piéce partager , apartement single , 
    houseType :String,     // villa , traditionel , studio , apartemnt ...

    roomSurface: String,
    appartmentSurface: String,
    roomNumber: Number,

    deposit: Number, //3arboun
    monthlyRent: Number,

    floor : Boolean,
    isFurnished: String,
    hasParking: { type: Boolean},
    hasAnimals: { type: Boolean},
    hasElevator: { type: Boolean},
    hasClimatisation: { type: Boolean},
    hasWifi: { type: Boolean},
    hasGaz: { type: Boolean},
    
    myDate: {type: Date,default: new Date()},
    offreExpires: Date,
    dispoDate: Date,

    // iframeMap:{ type: String, required: false },

    // la possibilité d'jouter plusieur images
    images: [
    {
        type: mongoose.Types.ObjectId,
        ref: "image",
    },
    ],
});

module.exports = mongoose.model("offre", OfferSchema);