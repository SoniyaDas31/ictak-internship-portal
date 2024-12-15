const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },

  enrolled_projects: [
    {
      project_id: { type: mongoose.Schema.Types.ObjectId, ref: "projects" }, // Connect to Projects
      weeklysubmissions: [
        {
          week: { type: Number, required: true },
          submission_format: { type: String },
          submission_url: { type: String },
          submission_comments: { type: String },
          submitted_at: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});

const studentModel = mongoose.model("Students", studentSchema);
module.exports = studentModel;