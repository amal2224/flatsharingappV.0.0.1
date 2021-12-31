const User = require('../models/User.js')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

// Register new user
exports.register = async(req,res)=>{
    try {
        const {email}=req.body;
        const findUser=await User.findOne({email});  // check if this email used in DB

        if(findUser){
            // we create a shape of data to errors , to call "errors" later
            return res.status(400).send({errors:[{msg:"email should be unique"}]})
        }
        // if the email didn't exist , so we create the newuser
        const newUser=new User({...req.body});
        const token = jwt.sign({_id:newUser._id,}, process.env.SECRET_KEY,{expiresIn:"1h"}); 
        
        await newUser.save();
        res.status(200).send({msg:"register successfully", user :newUser , token})
    } catch (error) {
        res.status(500).send({errors:[{msg:"can not register the user"}]})
    }   
}
// login user 
exports.login = (req,res)=>{
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Please register before" }] });
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        } else if (!isMatch) {
          return res.status(500).json({ errors: [{ msg: "Password error" }] });
        } else {
          let payload = {
            userId: user._id,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            // res.send({ token });
            res.send({msg:"login successfully",user: user , token});
          });
        }
      });
    });
}
//LOAD USER CONNECTED
exports.loadUser=(req, res) => {
    User.findById(req.userId)
        .select("-password -__v")
        .then((user) => {
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(user);
    })
    .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" });
    });
}
// CurrentUser , display just the ID 
exports.currentUser = (req, res) => {
    try {
        res.send({msg:"authentificate",user:req.userId})
    } catch (error) {
        res.status(500).send({msg:"can not check this operation",error})
    }
}