const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    tasks:[String]
})
module.exports = mongoose.model("todo",todoSchema);