import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios';
import { Alert, Box, Button, CircularProgress, List, ListItem, ListItemText, Paper, TextareaAutosize, TextField, Typography } from '@mui/material';



const ProjectDashboard = ({ project_id, student_id }) => {

  const navigate = useNavigate();

  // const { id } = useParams();
  // console.log(id);

  const projectidlocal = localStorage.getItem('projectid');


  const session = localStorage.getItem('session');
  if (session === false) {
    console.log("logged out");
  }
  if (!projectidlocal) {
    console.log('project id is blank');
    navigate('/login');
  }

  const [project, setProject] = useState([]);
  const [projectData, setProjectData] = useState({});

  const [error, setError] = useState('');
  const [sucess, setSucess] = useState('');
  const [week, setWeek] = useState("");

  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionComments, setSubmissionComments] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());
  // const [endDate] = useState(new Date("2024-12-24"));//Internship end date
  const [endDate, setEndDate] = useState("");//Internship end date
  const [comments, setComments] = useState("");
  const [file, setFile] = useState(null);
  const isSubmissionOpen = currentDate >= new Date(endDate);
  // const isSubmissionOpen =  (endDate) => {
  //   const currentDate = new Date();
  //    if( currentDate >= new Date(endDate));
  //  return
  // };
  console.log(isSubmissionOpen);
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState({});


  const [isVivaAvailable, setIsVivaAvailable] = useState(false);
  const [message, setMessage] = useState("");
  const [vivaFile, setVivaFile] = useState(null);
  const [vivaComments, setVivaComments] = useState("");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  

  // fetching project details for requested id in the url
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/project/${projectidlocal}`);
        setProject(response.data);
        setProjectData(response.data);
        setEndDate(response.data.internship_end_date);
        // console.log(response.data);
        // console.log(response.data.internship_end_date)
        // console.log(projectData);
        // console.log(project);
        setSucess(response.data.message || "Project details fetched successfully")
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

  useEffect(() => {
    const checkVivaAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/students/${student_id}/project/${projectidlocal}/viva-voce`);
        setIsVivaAvailable(response.data.isVivaVoceAvailable);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.error || "Failed to check Viva Voce status.");
      }
    };

    checkVivaAvailability();
  }, [student_id, projectidlocal]);



  // Fetch discussions for the project
  const fetchDiscussions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/discussions/project/${projectidlocal}`);
      setDiscussions(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching discussions:', err);
      setError('Failed to fetch discussions.');
    }
  };

  // Fetch discussions on component mount
  useEffect(() => {
    fetchDiscussions();
  }, []);

  // Post a new discussion
  const handlePostDiscussion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/discussions/project/${projectidlocal}`, {
        student_id, // Use actual student ID
        comment: newDiscussion.content, // Backend expects 'comment'
      });
      fetchDiscussions();
      setNewDiscussion({ title: '', content: '' });
    } catch (err) {
      console.error('Error posting discussion:', err);
      setError('Failed to post discussion.');
    }
  };



  // Post a comment on a discussion
  const handlePostComment = async (discussionId) => {
    try {
      await axios.post(`http://localhost:3000/discussions/${discussionId}/comments`, {
        user: student_id, // Replace with actual user ID
        comment: newComment[discussionId],
      });
      fetchDiscussions();
      setNewComment({ ...newComment, [discussionId]: '' });
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Failed to post comment.');
    }
  };


  //end
  //console.log(discussions);
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
      setSucess(response.data.message || "Weekly submission added successfully");
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
      setSucess(response.data.message || "Final submission added successfully");
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

  //viva voca

  const handleVivaSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("comments", vivaComments);
    formData.append("file", vivaFile);

    try {
      const response = await axios.post(
        `http://localhost:3000/students/${student_id}/project/${projectidlocal}/viva-voce`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setVivaFile(null);
      setVivaComments("");
      setSucess(response.data.message || "Viva voce added successfully");
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
      <Box sx={{ padding: "1rem" }}>
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

        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="weekly-submission" data-bs-toggle="tab" data-bs-target="#weekly" type="button" role="tab" aria-controls="home" aria-selected="true">Weekly Submission</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="final-submission" data-bs-toggle="tab" data-bs-target="#final" type="button" role="tab" aria-controls="profile" aria-selected="false">Final Project Submission</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="viva-submission" data-bs-toggle="tab" data-bs-target="#viva" type="button" role="tab" aria-controls="contact" aria-selected="false">Viva Voce Submission</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="weekly" role="tabpanel" aria-labelledby="weekly-tab">
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

          </div>
          <div class="tab-pane fade" id="final" role="tabpanel" aria-labelledby="final-tab">
            {/* //Final submission */}

            <Paper sx={{ padding: "1rem", marginTop: "2rem" }} elevation={3}>
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
                  {/* Submissions are not open yet. You can submit your final project after {endDate.toDateString()}. */}
                  Submissions are not open yet. You can submit your final project after {formatDate(endDate)}.
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
          </div>
          <div class="tab-pane fade" id="viva" role="tabpanel" aria-labelledby="viva-tab">


            {/* //viva voca */}
            <Paper sx={{ padding: "1rem", marginTop: "2rem" }} elevation={3}>
              <Typography variant="h5" gutterBottom>
                Viva Voce Submission<br></br>
                {project.viva_format && (
                  <Button
                    variant="contained"
                    color="primary"
                    href={project.viva_format}
                    target="_blank"
                    download
                  >
                    Viva voca submission format
                  </Button>
                )}
              </Typography>

              {!isVivaAvailable ? (
                <Typography variant="body1" color="error">
                  You must submit the project report before Viva-Voce.
                </Typography>
              ) : (
                <form onSubmit={handleVivaSubmit}>
                  <TextField
                    type="file"
                    fullWidth
                    onChange={(e) => setVivaFile(e.target.files[0])}
                    sx={{ my: 2 }}
                    required
                  />

                  <TextField
                    label="Comments"
                    multiline
                    rows={4}
                    fullWidth
                    value={vivaComments}
                    onChange={(e) => setVivaComments(e.target.value)}
                    sx={{ my: 2 }}
                  />

                  <Button variant="contained" color="primary" type="submit">
                    Submit Viva-Voce
                  </Button>
                </form>
              )}

              {/* {responseMessage && (
        <Typography variant="body2" color="info" sx={{ mt: 2 }}>
          {responseMessage}
        </Typography>
      )} */}



            </Paper>
          </div>
        </div>







        {/* //Discussion form */}
        <Paper sx={{ padding: "1rem", marginTop: "2rem" }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            Discussion Forum
          </Typography>

          {/* Post a New Discussion */}
          <form onSubmit={handlePostDiscussion}>
            <TextField
              label="Title"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
              required
              fullWidth
              margin="normal"
            />
            <TextareaAutosize
              minRows={3}
              placeholder="Content"
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
              style={{
                width: "100%",
                marginBottom: "1rem",
                padding: "0.5rem",
                fontSize: "1rem",
              }}
            />
            <Button type="submit" variant="contained" color="primary">
              Post
            </Button>
          </form>

          {/* List Discussions */}
          {discussions.map((discussion) => (
            <Box key={discussion._id} sx={{ marginTop: "1rem" }}>
              <Paper sx={{ padding: "1rem", marginBottom: "1rem" }} elevation={2}>
                <Typography variant="h6">{discussion.comment}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Posted by: {discussion.student_id?.name || 'Unknown'}
                </Typography>
                <Typography variant="body2">Date :
                  {new Date(discussion.updated_at).toLocaleString()}
                </Typography>
                {/* List Comments */}
                <List>
                  {discussion.comments.map((comment) => (
                    <ListItem key={comment._id}>
                      <ListItemText
                        primary={comment.comment}
                        secondary={`Commented by: ${comment.user?.name || 'Anonymous'}`}
                      />
                    </ListItem>
                  ))}
                </List>



                {/* Add Comment */}
                <TextField
                  label="Add a comment"
                  value={newComment[discussion._id] || ''}
                  onChange={(e) =>
                    setNewComment({ ...newComment, [discussion._id]: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
                <Button
                  onClick={() => handlePostComment(discussion._id)}
                  variant="contained"
                  color="primary"
                >
                  Comment
                </Button>
              </Paper>
            </Box>
          ))}
        </Paper>

      </Box>
    </div>

  );
}

export default ProjectDashboard;
