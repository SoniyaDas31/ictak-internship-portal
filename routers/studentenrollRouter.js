
const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const projectModel=require('../models/projectModel');
const studentModel=require('../models/studentModel')
const upload = require('../multer');
router.use(express.json());


router.get('/:_id',async (req,res)=>{
  try {
      
      const student=await studentModel.findById(req.params._id) ;
if(!student){
  console.log(`Project with ID ${req.params._id} not found.`);
 res.status(400).send("project not found");
}
res.status(200).send(student)
  } catch (error) {
      res.status(500).send("error while fetching project details",error);
  }
});

// POST /students/:studentId/enroll
// router.post("/students/:student_id/enroll", async (req, res) => {
//   const { project_id } = req.body;

//   try {
//     const student = await studentModel.findById(req.params.student_id);
//     const project = await projectModel.findById(req.params.project_id);

//     if (!student || !project) {
//       return res.status(404).json({ error: "Student or Project not found" });
//     }

//     // Check if already enrolled
//     const isEnrolled = student.enrolled_projects.some(
//       (p) => p.project_id.toString() === project_id
//     );

//     if (isEnrolled) {
//       return res.status(400).json({ error: "Student is already enrolled in this project." });
//     }

//     // Enroll student in project
//     student.enrolled_projects.push({ project_id });
//     project.enrolled_students.push(student._id);

//     await student.save();
//     await project.save();

//     res.status(200).json({ message: "Student enrolled in project successfully." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error enrolling student in project." });
//   }
// });
module.exports=router;