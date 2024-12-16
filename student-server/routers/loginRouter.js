const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const studentModel = require('../models/studentModel');
router.use(express.json());

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const student = await studentModel.findOne(email);
        if (!student) {
            res.status(400).send("Student not found");
        }else{
            
            if(password===student.password){
               // res.status(200).send(student);
                res.status(200).send('success');
            }
            
        }
       
    } catch (error) {
        res.status(500).send("error while fetching student details", error);
    }
});

module.exports = router;