const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const projectModel = require('../models/projectModel');
const upload = require('../multer');
router.use(express.json());

router.get('/:_id', async (req, res) => {
  try {

    const project = await projectModel.findById(req.params._id);
    if (!project) {
      console.log(`Project with ID ${req.params._id} not found.`);
      res.status(400).send("project not found");
    }
    res.status(200).send(project)
  } catch (error) {
    res.status(500).send("error while fetching project details", error);
  }
});

router.get('/', async (req, res) => {
  try {

    const project = await projectModel.find();
    //console.log(`Project throws ${project}`);
    if (!project) {
      console.log(`Data not found`);
      res.status(400).send("project not found");
    }
    res.status(200).send(project)
  } catch (error) {
    res.status(500).send("error while fetching project details", error);
  }
});

router.post("/", async (req, res) => {
  const { title, description, overview_document, reference_material } = req.body;
  try {
    const newProject = new projectModel({ title, description, overview_document, reference_material });
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.use('/uploads', express.static('uploads'))



router.post('/:_id/overview', upload.single('overview_document'), async (req, res) => {
  try {
    const { _id } = req.params;
    // if (!req.file) {
    //   return res.status(400).json({ message: 'No file uploaded' });
    // }

    const project = await projectModel.findById(_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.overview_document = `/uploads/${req.file.filename}`





    await project.save();

    res.status(200).json({ message: 'Files uploaded successfully', project });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ message: 'Error uploading document', error });
  }
});


router.post('/:_id/reference', upload.single('reference_material'), async (req, res) => {
  try {
    const { _id } = req.params;
    // if (!req.file) {
    //   return res.status(400).json({ message: 'No file uploaded' });
    // }

    const project = await projectModel.findById(_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }


    project.reference_material = `/uploads/${req.file.filename}`



    await project.save();

    res.status(200).json({ message: 'Files uploaded successfully', project });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ message: 'Error uploading document', error });
  }
});

///weekly submission format
router.post('/:_id/weekly-format', upload.single('weekly_format'), async (req, res) => {
  try {
    const { _id } = req.params;
    // if (!req.file) {
    //   return res.status(400).json({ message: 'No file uploaded' });
    // }

    const project = await projectModel.findById(_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
 project.weekly_format=`/uploads/${req.file.filename}`
   
    
    
   

    await project.save();

    res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ message: 'Error uploading document', error });
  }
});
//final format

router.post('/:_id/final-format', upload.single('final_format'), async (req, res) => {
  try {
    const { _id } = req.params;
    // if (!req.file) {
    //   return res.status(400).json({ message: 'No file uploaded' });
    // }

    const project = await projectModel.findById(_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
 project.final_format=`/uploads/${req.file.filename}`
   
    
    
   

    await project.save();

    res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ message: 'Error uploading document', error });
  }
});

//viva format

router.post('/:_id/viva-format', upload.single('viva_format'), async (req, res) => {
  try {
    const { _id } = req.params;
    // if (!req.file) {
    //   return res.status(400).json({ message: 'No file uploaded' });
    // }

    const project = await projectModel.findById(_id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
 project.viva_format=`/uploads/${req.file.filename}`
   
    
    
   

    await project.save();

    res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ message: 'Error uploading document', error });
  }
});




module.exports = router;