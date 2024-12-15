const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const projectRouter=require('./routers/projectRouter');
const studentRouter=require('./routers/studentenrollRouter');
const projectModel=require('./models/projectModel');
const studentModel=require('./models/studentModel');
const upload=require('./multer');
const cors= require('cors');
const app=express();




// app.use(express.json())
app.use(cors());
app.use(express.json());
app.use('/project',projectRouter);
app.use('/students',studentRouter);
app.use('/uploads', express.static('uploads'));
mongoose.connect(process.env.mongodb_url).then(()=>{
    console.log("connection established");
    })
    .catch((err)=>{ 
        console.log(err);
    });
    app.listen(process.env.port,()=>{
        console.log(`server running in port ${process.env.port}`);
    });
    
    