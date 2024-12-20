
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const projectModel = require('../models/projectModel');
// const getCurrentWeek=require('../models/projectModel')
const studentModel = require('../models/studentModel')
const upload = require('../multer');
router.use(express.json());

router.get('/', async (req, res) => {
  try {

    const student = await studentModel.find();
    if (!student) {
      console.log(`Data not found`);
      res.status(400).send("Student not found");
    }
    res.status(200).send(student)
  } catch (error) {
    res.status(500).send("error while fetching student details", error);
  }
});

router.get('/:_id', async (req, res) => {
  try {

    const student = await studentModel.findById(req.params._id);
    if (!student) {
      console.log(`Student with ID ${req.params._id} not found.`);
      res.status(400).send("student not found");
    }
    res.status(200).send(student)
  } catch (error) {
    res.status(500).send("error while fetching student details", error);
  }
});

//function to check assign Project id to student
router.post('/:student_id/:project_id/', async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.student_id);
    const project = await projectModel.findById(req.params.project_id);
    //console.log(`Student with ID ${req.params.student_id} .`);
    //console.log(`Project with ID ${req.params.project_id} .`);
    if (!student) {
      //console.log(`Student with ID ${req.params.student_id} not found.`);
      res.status(400).send("student not found");
    }
    // Find the enrolled project
    const enrolledProject = student.enrolled_projects.find(
      (p) => p.project_id.toString() === req.params.project_id
    );
    
    console.log(enrolledProject);

    if (!enrolledProject) {
      console.log('Student is not enrolled in this project.');
      //return res.status(400).json({ error: "Student is not enrolled in this project." });
      //console.log(enrolledProject);

      //let enrolledProject = [];
      student.enrolled_projects.push({
        project_id: `${req.params.project_id.toString()}`,
      });
      project.enrolled_students.push({
        student_id: `${req.params.student_id.toString()}`,
      });
      // console.log(student.enrolled_projects);

      await student.save();
      await project.save();
      //res.status(200).send(student.enrolled_projects);
      res.status(200).json({ message: "Project added successfully." });
      console.log('Project added successfully.');

    } else {
      res.status(200).json({ message: "Already enrolled successfully." });
      console.log('Already Enrolled');
    }
    //res.status(200).send(student);


  } catch (error) {
    res.status(500).send("error while fetching student details", error);
  }
});


// POST /students/:studentId/projects/:projectId/weekly-submission
router.post("/:student_id/project/:project_id/weekly-submission", upload.single('submission_url'),
  async (req, res) => {
    const { week, submission_comments } = req.body;

    try {
      const student = await studentModel.findById(req.params.student_id);
      const project = await projectModel.findById(req.params.project_id);

      if (!student || !project) {
        return res.status(404).json({ error: "Student or Project not found." });
      }
      // student.submission_url=`/ uploads / ${ req.file.filename }` ; 
      // Calculate the current week
      const currentWeek = getCurrentWeek(project.created_at);

      if (parseInt(week) > currentWeek) {
        return res.status(400).json({
          error: `Submission link for week ${week} is not yet open.Current week is ${currentWeek}.`
        });
      }

      // Find the enrolled project
      const enrolledProject = student.enrolled_projects.find(
        (p) => p.project_id.toString() === req.params.project_id
      );

      if (!enrolledProject) {
        return res.status(400).json({ error: "Student is not enrolled in this project." });
      }

      // Check if a submission for this week already exists
      const existingSubmission = enrolledProject.weeklysubmissions.find(
        (s) => s.week === parseInt(week));


      if (existingSubmission) {
        return res.status(400).json({ error: `Submission for  ${week}st week already exists.` });
      }

      // Add the new weekly submission
      enrolledProject.weeklysubmissions.push({
        week: parseInt(week),
        submission_url: `/uploads/${req.file.filename} `,
        submission_comments,
      });

      await student.save();
      res.status(200).json({ message: "Weekly submission added successfully." });
    } catch (error) {
      console.error("Error adding weekly submission:", error);
      res.status(500).json({ error: "An error occurred during submission." });
    }
  }
);


//Final Submission
const internshipEndDate = new Date("2024-12-22");
router.post('/:student_id/project/:project_id/final-submission', upload.single('file_url'), async (req, res) => {

  const {comments}=req.body
 
  try {
    const student = await studentModel.findById(req.params.student_id);
    const project = await projectModel.findById(req.params.project_id);

    if (!student || !project) {
      return res.status(404).json({ error: 'Student or Project not found.' });
    }

    


    const currentDate = new Date();

    // Check if the current date is after the internship end date
    if (currentDate < internshipEndDate) {
      return res.status(400).json({
        error: `Final project submission is not allowed until the end of the internship (Internship end date: ${internshipEndDate}).`
      });
    }

    // Find the enrolled project
    const enrolledProject = student.enrolled_projects.find(
      (p) => p.project_id.toString() === req.params.project_id
     
    );
    console.log(enrolledProject);
    if (!enrolledProject) {
      return res.status(400).json({ error: 'Student is not enrolled in this project.' });
    }

    // const existingSubmission = enrolledProject.final_submission.find((s)=>s.file_url==
    //  );
    // Check if final submission already exists
    


    if (enrolledProject.final_submission.file_url) {
      // if(existingSubmission){
              return res.status(400).json({ error: 'Final submission already exists.' });
    }

    // Add the final project submission to the student's project
    enrolledProject.final_submission = {
        file_url:`/uploads/${req.file.filename}`,
        
      // submissionUrl,
      comments,
      isSubmitted:true,
      submitted_at: Date.now(),
    };
    enrolledProject.vivaVoce.isAvailable=true;
    await student.save();

    res.status(200).json({ message: 'Final project submitted successfully.' });
  } catch (error) {
    console.error('Error during final submission:', error);
    res.status(500).json({ error: 'An error occurred while submitting the final project.' });
  }
});
//viva voca







const getCurrentWeek = (created_at) => {
  const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const elapsedTime = now - new Date(created_at).getTime();
  console.log(elapsedTime);
 Math.ceil(elapsedTime / millisecondsInAWeek);
current_week= Math.ceil(elapsedTime / millisecondsInAWeek);
console.log(current_week)
return current_week
  // return Math.ceil(elapsedTime / millisecondsInAWeek);
};





module.exports = router;