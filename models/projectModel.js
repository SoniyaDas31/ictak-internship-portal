const mongoose=require('mongoose');



const projectSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    overview_document:{type:String,default:null},
    reference_material:String,
    
      // weeklysubmission:[weeklysubmissionSchema],
      enrolled_students: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Students" } // connect students 
      ],
    created_at: {
        type: Date,
        default: Date.now, // Automatically sets the creation date
      },
      updated_at: {
        type: Date,
        default: Date.now, // Automatically updates whenever the document is modified
      },
    },
//     { timestamps: true 
   
// }
);
const projectModel=mongoose.model('projects',projectSchema)
module.exports=projectModel;
