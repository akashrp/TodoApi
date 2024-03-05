const mongoose= require("mongoose");
const MONGO_URL=process.env.MONGO_URL

exports.dbConnect=()=>{
    mongoose.connect(MONGO_URL).then(()=>{
        console.log("db connected")
    }).catch((error)=>{
        console.log(error);
        process.exit(1);
    })
}