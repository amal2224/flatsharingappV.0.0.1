const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },

    image: String, //we will add a default image
    title: { type: String, required: true },
    ville: { type: String, required: true },
    description: String,
    category : String,
    houseType :String,
    
    floor : String,  //etage
    minRoomSurface: String,
    roomNumber: String,

    isSmoking : String,    
    isFurnished: String,    
    dispoDate: String,
    hasParking: { type: Boolean},
    hasAnimals: { type: Boolean},
    hasElevator: { type: Boolean},

    personNumber: String,
    sex: { type: String, required: false },
    language: String,
    maxRent:Number,
    myDate: {type: Date,default: new Date()},

    
    images: [{
        type: mongoose.Types.ObjectId,
        ref: "image",
    }],
});

module.exports = Request= mongoose.model('request' ,RequestSchema);