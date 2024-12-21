const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
 password:{type:String,required:true},
  enrolled_projects: [
    {
      project_id: { type: mongoose.Schema.Types.ObjectId, ref: "projects" }, // Connect to Projects
      weeklysubmissions: [
        {
          week: { type: Number, required: true },
          submission_format:{type: mongoose.Schema.Types.String, ref: "projects.weekly_format"},
         submission_url: { type: String },
          submission_comments: { type: String },
          submitted_at: { type: Date, default: Date.now },
        },
      ],
      final_submission: {
        final_format:{type: mongoose.Schema.Types.String, ref: "projects.final_format"},
        file_url: { type: String }, // URL to the uploaded final project file
        // submission_url: { type: String }, // URL to the submission link
        comments: { type: String }, // Comments about the final project
        isSubmitted: { type: Boolean, default: false },
        submitted_at: { type: Date, default: Date.now }, // Timestamp of submission

      },
      vivaVoce: {
        viva_format:{type: mongoose.Schema.Types.String, ref: "projects.viva_format"},
        isSubmitted: { type: Boolean, default: false }, // Viva Voce link availability
       
          file: { type: String }, // Path to the Viva Voce file
          marks: { type: Number }, // Marks awarded for Viva Voce
          comments: { type: String }, // Feedback comments
        },
    },
  ],
});

const studentModel= mongoose.model("Students", studentSchema);
module.exports=studentModel; 
 
