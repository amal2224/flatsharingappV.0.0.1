//*****************************Dependencies********************************
const express = require('express');
const cors = require('cors');
const connectDB=require("./config/connectDB");
require("dotenv").config();
// const path=require("path");
//*****************************Initialize app with express******************
const app = express();
//*****************************Body Parse MW********************************
app.use(express.json());
//*****************************CORS MW**************************************
app.use(cors());
//*****************************Statics folder************************
app.use("/uploads", express.static(__dirname + "/uploads"));
//*****************************Database connection**************************
connectDB();
// *****************************Routes**************************************
app.use('/users', require('./routes/users.route'));
app.use("/avatar", require("./routes/avatar.route"));
app.use("/generalInfos", require("./routes/generalInfos.route"));
app.use("/socialInfos", require("./routes/socialInfos.route"));
app.use("/securityInfos",require("./routes/securityInfos.route"));
app.use("/gallery", require("./routes/gallery.route")); 
app.use("/profile", require("./routes/profile.route"));
app.use("/offre", require("./routes/offer.route"));
app.use("/demand", require("./routes/demand.route"));
app.use("/comment", require("./routes/comment.route"));
app.use("/testimonial", require("./routes/testimonial.route"));
app.use("/contact", require("./routes/contactUs.route"));

app.use("/admin", require("./routes/admin"));
// *****************************PORT****************************************
const PORT = process.env.PORT;

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static('client/build'))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//     })
// }
// *****************************Start the server****************************
app.listen(PORT,(err)=>err?console.log(err):console.log(`*******Your server running in PORT : ${PORT} *******`));