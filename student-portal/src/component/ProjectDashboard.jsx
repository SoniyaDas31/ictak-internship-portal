import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios';
import { Alert, Box, Button, CircularProgress, Paper, TextareaAutosize, TextField, Typography } from '@mui/material';


const ProjectDashboard = ({ project_id, student_id }) => {

  const navigate = useNavigate();

  // const { id } = useParams();
  // console.log(id);

  const projectidlocal = localStorage.getItem('projectid');
  
  const session = localStorage.getItem('session');
  if(session===false){
    console.log("logged out");
  }
  if (!projectidlocal) {
    console.log('project id is blank');
    navigate('/login');
  }

  const [project, setProject] = useState([]);
  const [projectData, setProjectData] = useState({});

  const [error, setError] = useState('');
  const [sucess,setSucess]=useState('');
  const [week, setWeek] = useState("");

  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionComments, setSubmissionComments] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());
    const [endDate] = useState(new Date("2024-12-22"));//Internship end date
    const [comments, setComments] = useState("");
    const [file, setFile] = useState(null);
    const isSubmissionOpen = currentDate >= endDate;


  // fetching project details for requested id in the url
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/project/${projectidlocal}`);
        setProject(response.data);
        setProjectData(response.data);
        console.log(response.data);
        console.log(projectData);
        console.log(project);
        setSucess(response.data.message||"Project details fetched successfully")
        setError('')
      } catch (error) {
        // console.error("Error fetching project details:", err);
        // setError("Failed to fetch project details.");
        if (error.response) {
          setError(error.response.data.error || 'An error occurred during submission.');
        } else {
          setError('Unable to connect to the server.');
        }
        setSucess('')
      }
    };

    fetchProjectDetails();
  }, [projectidlocal]);
  //weekly submission

  const handleWeeklySubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("week", week);
    formData.append("submission_url", submissionFile);
    formData.append("submission_comments", submissionComments);

    try {
      
      const response = await axios.post(
        `http://localhost:3000/students/${student_id}/project/${projectidlocal}/weekly-submission`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // setSubmissionSuccess(response.data.message);
      setWeek("");
      setSubmissionFile(null);
      setSubmissionComments("");
      setSucess(response.data.message||"Weekly submission added successfully");
      setError('')
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'An error occurred during submission.');
      } else {
        setError('Unable to connect to the server.');
      }
      setSucess('')
    }
  };

//Final submission
const handleFinalSubmission = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("comments", comments);
  formData.append("file_url", file);

  try {
    const response = await axios.post(
      `http://localhost:3000/students/${student_id}/project/${projectidlocal}/final-submission`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
 
      setFile(null);
      setComments("");
      setSucess(response.data.message||"Final submission added successfully");
      setError('')
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'An error occurred during submission.');
      } else {
        setError('Unable to connect to the server.');
      }
      setSucess('')
    } 
};

  return (
    <div>
      <Navbar></Navbar>
      <Box sx={{ padding: "1rem"}}>
        <Typography variant="h4" gutterBottom>
          Project Dashboard
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {sucess && <Alert severity="success">{sucess}</Alert>}


        {/* Project Details Section */}
        {/* {loading ? ( */}
        {/* <CircularProgress /> */}
        {/* ) : project? ( */}
        {project ? (
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
            Weekly Submission<br></br>
            {project.weekly_format && (
              <Button
                variant="contained"
                color="primary"
                href={project.weekly_format}
                target="_blank"
                download
              >
                weekly submission format
              </Button>
            )}
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


{/* //Final submission */}
 
  <Paper sx={{ padding: "1rem",marginTop:"2rem" }} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Final Project Submission<br></br>
        {project.final_format && (
          <Button
            variant="contained"
            color="primary"
            href={project.final_format}
            target="_blank"
            download
          >
             Final Report submission format
          </Button>
        )}
      </Typography>
      {!isSubmissionOpen ? (
        <Typography variant="body1" color="error">
          Submissions are not open yet. You can submit your final project after {endDate.toDateString()}.
        </Typography>
      ) : (
       
       
        <form onSubmit={handleFinalSubmission}>
           
            <Typography variant="body1" gutterBottom>
              Upload Submission File:
            </Typography>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              style={{ marginBottom: "1rem" }}
            />
            <TextareaAutosize
              minRows={3}
              placeholder="Submission Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
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
      )}
</Paper>
      </Box>
    </div>
            
  );
}

export default ProjectDashboard;
