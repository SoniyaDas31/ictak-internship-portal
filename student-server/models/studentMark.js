const mongoose = require("mongoose");

const markSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    mark:{type:Number,required:true}
})

const markModel= mongoose.model("Marks", markSchema);
module.exports=markModel; 
 