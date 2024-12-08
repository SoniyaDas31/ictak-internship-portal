// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         // Subbulakshmi database
//         //const conn = await mongoose.connect('mongodb+srv://dassubbulakshmi:sB3rShudJ3PMXVYh@cluster0.28e0n.mongodb.net/studentportal?retryWrites=true&w=majority&appName=Cluster0');

//         // Jancy Database
//         const conn = await mongoose.connect('mongodb+srv://jancyvarghese90:zEZSK6myMUJ8Vaai@cluster0.hqh5d.mongodb.net/studentportal?retryWrites=true&w=majority&appName=Cluster0');

//         console.log(`MongoDB Connected: ${conn.connection.host}`);

//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


const mongoose =require('mongoose');
require('dotenv').config();
const connectDB=mongoose.connect(process.env.mongodb_url)
.then(()=>{
console.log("Connection establised");
})
.catch((err)=>{
console.log(err)
})
module.exports=connectDB;



