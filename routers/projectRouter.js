const express=require('express')
const router=express.Router()
const projectModel=require('../models/project')
// const upload=require('../multer')


router.use(express.json());
  
router.get('/:project_id',async(req,res)=>{
try {


  const project=await projectModel.findById(req.params.project_id) ;
  if(!project){
    console.log(`Project with ID ${req.params.project_id} not found.`);
   res.status(400).send("project not found")
  }
 res.status(200).send(project)

} catch (error) {
    res.status(500).send("error while fetching project details",error)
}


});

// router.post('/project/:projectId/upload', upload.single('overview_document'), async (req, res) => {
//     try {
//         const { projectId } = req.params;

//         // Find the project
//         const project = await projectModel.findById(projectId);
//         if (!project) {
//             return res.status(404).json({ message: "Project not found" });
//         }

//         // Save the document path in the project
//     project.overview_document = `/uploads/${req.file.filename}`;
//         await project.save();

//         res.status(200).json({ message: "Document uploaded successfully", project });
//     } catch (error) {
//         res.status(500).json({ message: "Error uploading document", error });
//     }
// });


module.exports=router;