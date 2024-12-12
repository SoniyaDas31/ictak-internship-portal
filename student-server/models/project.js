const express = require('express')
const mongoose=require('mongoose')
const projectSchema=new mongoose.Schema({
   title:String,
   description:String
   
});
const projectModel=mongoose.model('project',projectSchema);
module.exports=projectModel;