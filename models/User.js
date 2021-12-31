const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    fullName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    // isAdmin: { type: Boolean, default: false },
    sex: String,
    // status: { type: String, required: false },
    phoneNumber: String,
    address: { type:String,required: false },
    birthDate: String,
    facebook: String,
    twitter: String,
    instagram: String,
    avatar: String,
    role:{type:Number,default:0},

    offres: [
    {
        type: mongoose.Types.ObjectId,
        ref: "offre",
    },
    ],

    requests: [
    {
        type: mongoose.Types.ObjectId,
        ref: "request",
    },
    ],

    // la possibilité d'ajouter plusieur image pour un profile
    images: [
    {
        type: mongoose.Types.ObjectId,
        ref: "image",
    },
    ],

    
    created_at: {
    type: Date,
    default: new Date(),
    },
});
//--------------------------------------------
function hashPassword(next) {
    if (!this.isModified('password')) {
        return next();
    }
    //Generate salt value
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(erro);
        }
        //Use this salt value to hash password
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(erro);
            }
            this.password = hash;
            next();
        })
    });
};

UserSchema.pre('save',hashPassword);

//methode t9aren el mp bel mp hashed
UserSchema.methods.isPasswordMatch = function (plainPassword, hashed, callback) {
    bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
        if (err) {
            next(err);
        }
        callback(null, isMatch);
    })
}

module.exports = User=mongoose.model('user', UserSchema)