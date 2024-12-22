const mongoose=require('mongoose');



const projectSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    overview_document:{type:String,default:null},
    reference_material:String,
    // internship_end_date:{type:Date},
    
    weekly_format:{type:String},
    final_format:{type:String},
    viva_format:{type:String},
    // internship_end_date:{type:Date,required:true},
    
      // weeklysubmission:[weeklysubmissionSchema],
      enrolled_students: [{
      student_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Students" }

         // connect students 
      }
       
      ],
    created_at: {
        type: Date,
        default: Date.now, // Automatically sets the creation date
      },
      updated_at: {
        type: Date,
        default: Date.now, // Automatically updates whenever the document is modified
      },
    //   internship_end_date: {
    //     type: Date,
    //     default: function () {
    //         return new Date(this.created_at.getTime() + 50 * 24 * 60 * 60 * 1000); // 50 days in milliseconds
    //     }
    // },
    },
//     { timestamps: true 
   
// }
);
const projectModel=mongoose.model('projects',projectSchema)

// const getCurrentWeek = (created_at) => {
//   const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
//   const now = Date.now();
//   const elapsedTime = now - new Date(created_at).getTime();
//   return Math.ceil(elapsedTime / millisecondsInAWeek);
// };


module.exports=projectModel;
