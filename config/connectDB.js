const  mongoose  = require("mongoose");
require("dotenv").config();
// **************connect to your DB*************
const connectDB=async ()=>{
try{
    await mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true,useNewUrlParser: true });
    console.log("*******Database is connected*******")
}catch (error) {
    console.log({msg:"Database is not connected !!!!",error})
}
}
module.exports=connectDB;