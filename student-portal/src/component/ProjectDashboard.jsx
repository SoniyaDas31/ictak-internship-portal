import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Alert, Box, Button, CircularProgress, Paper, TextareaAutosize, TextField, Typography } from '@mui/material';

const ProjectDashboard = ({project_id,student_id}) => {
    const [project, setProject] = useState({});
    const [error, setError] = useState("");
    const [week, setWeek] = useState("");
    
    const [submissionFile, setSubmissionFile] = useState(null);
    const [submissionComments, setSubmissionComments] = useState("");
    const [submissionSuccess, setSubmissionSuccess] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProjectDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/project/${project_id}`);
            setProject(response.data);
          } catch (err) {
            console.error("Error fetching project details:", err);
            setError("Failed to fetch project details.");
          }
        };

        fetchProjectDetails();
    }, [project_id]);
//weekly submission

const handleWeeklySubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("week", week);
    formData.append("submission_url", submissionFile);
    formData.append("submission_comments", submissionComments);

    try {
      const response = await axios.post(
        `http://localhost:3000/students/${student_id}/project/${project_id}/weekly-submission`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSubmissionSuccess(response.data.message);
      setWeek("");
      setSubmissionFile(null);
      setSubmissionComments("");
    } catch (err) {
      console.error("Error submitting weekly submission:", err);
      setError("Failed to submit the weekly submission.");
    }
  };

  return (
   <div>
    <Navbar></Navbar>
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Project Dashboard
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {submissionSuccess && <Alert severity="success">{submissionSuccess}</Alert>}

      {/* Project Details Section */}
      {loading ? (
        <CircularProgress />
      ) : project ? (
        <Paper sx={{ padding: "1rem", marginBottom: "2rem" }} elevation={3}>
          <Typography variant="h5">{project.title}</Typography>
          <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
            {project.description}
          </Typography>
          {project.overview_document && (
            <Button
              variant="contained"
              color="primary"
              href={project.overview_document}
              target="_blank"
              download
            >
              Download Project Overview
            </Button>
          )}
        </Paper>
      ) : (
        <Typography variant="body1" color="error">
          No project details available.
        </Typography>
      )}

      {/* Weekly Submission Section */}
      <Paper sx={{ padding: "1rem" }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Weekly Submission
        </Typography>
        <form onSubmit={handleWeeklySubmission}>
          <TextField
            label="Week Number"
            type="number"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Typography variant="body1" gutterBottom>
            Upload Submission File:
          </Typography>
          <input
            type="file"
            onChange={(e) => setSubmissionFile(e.target.files[0])}
            required
            style={{ marginBottom: "1rem" }}
          />
          <TextareaAutosize
            minRows={3}
            placeholder="Submission Comments"
            value={submissionComments}
            onChange={(e) => setSubmissionComments(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.5rem",
              fontSize: "1rem",
            }}
          />
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
</div>
  
)};

export default ProjectDashboard;
