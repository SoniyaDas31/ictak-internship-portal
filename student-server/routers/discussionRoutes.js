const express = require('express');
const router = express.Router();
const Discussion = require('../models/discussion');
//const Discussion = mongoose.model('Discussion');

// Create a new discussion
router.post('/project/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { student_id, comment } = req.body;
    console.log(projectId);
    console.log(req.body);



    const newDiscussion = new Discussion({
      project_id: projectId,
      student_id,
      comment,
    });

    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get discussions by project ID
router.get('/project/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId.trim();
    const discussions = await Discussion.find({ project_id: projectId })
      .populate('student_id', 'name')
      .populate('comments.user', 'name'); // Populate the user field in comments

    res.status(200).json(discussions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// Add a comment to an existing discussion
router.post('/:discussionId/comments', async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { user, comment } = req.body;

    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    discussion.comments.push({ user, comment });
    await discussion.save();

    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
