const express=require('express');
const mongoose=require('mongoose')
const morgan =require('morgan');
const cors=require('cors');
require('dotenv').config();
// const connectDB=require('./db');
const projectRouter=require('./routers/projectRouter')
const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/project',projectRouter);
// app.use('/emp',empRoutes)
mongoose.connect(process.env.mongodb_url).then(()=>{
    console.log("connection established")
    })
    .catch((err)=>{
        console.log(err)
    })
app.listen(process.env.port,()=>{
    console.log(`server is listening to the port ${process.env.port}`)
})
app.get('/', async (req,res)=>{
    console.log(req.body)
})
app.use((err, req, res, next) => {
   
    console.error(err.stack);
    res.status(500).json({ message: "An unexpected error occurred", error: err.message });
});
