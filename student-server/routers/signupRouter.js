const express = require('express');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const router = express.Router();
const studentModel = require('../models/studentModel');
const markModel=require('../models/studentMark')
router.use(express.json());





router.post("/mark", async (req, res) => {
    const { email,mark } = req.body;
    try {
      const newMark = new markModel({ email,mark });
      await newMark.save();
      return res.json(newMark);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });




router.post('/signup',async(req,res)=>{
try {
  const{name,email,password,phonenumber}=req.body;
   
  const examRecord=await markModel.findOne({email:email})
if(!examRecord){
    return res.status(404).json({message:"Examination record not found.Cnnot register"});
}
if(examRecord.mark<50){
return res.status(404).json({message:"Registration failed:Your exit exam score is below mininum.Please clear the exam and try again"})
}
const alreadyRegistered=await studentModel.findOne({email:email})
if(alreadyRegistered){
    return res.status(404).json({message:"This email is already registered"})
}
const saltRounds=10;
bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
    if(err){
        console.log('error while hashing',err)
       return res.status(500).json({error:'Internal server error'})
    }
    var studentItem={
        name:req.body.name,
        email:  req.body.email,
        phonenumber:req.body.phonenumber,
        password:hash,
        createdAt:new Date()
    }
    var student=new studentModel(studentItem)
    await student.save()
    return res.status(201).json(student)
})

} catch (error) {

    console.log(error) 
   return res.status(500).json(error)

    
}




})














module.exports =router;