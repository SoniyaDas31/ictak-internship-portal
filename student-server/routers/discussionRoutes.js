// Add this file: routes/discussionRoutes.js
const express = require('express');
const router = express.Router();
const Discussion = require('../models/discussion');

// Create a new discussion
router.post('/', async (req, res) => {
  try {
    const { project_id, student_id, comment } = req.body;

    const newDiscussion = new Discussion({
      project_id,
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
    const { projectId } = req.params;

    const discussions = await Discussion.find({ project_id: projectId })
      .populate('student_id', 'name') // Fetch student name for display
      .sort({ created_at: -1 });

    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
