import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import axios from "axios";

const FinalSubmission = ({ studentId, projectId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [endDate] = useState(new Date("2024-12-20"));
  const [comments, setComments] = useState("");
//   const [submissionType, setSubmissionType] = useState("file");
  const [file, setFile] = useState(null);
//   const [linkUrl, setLinkUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const isSubmissionOpen = currentDate >= endDate;

  const handleFinalSubmission = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("comments", comments);
    formData.append("file_url", file);

    // if (submissionType === "file") {
    //   if (file) {
    //     formData.append("file_url", file);
    //   }
    // } else {
    //   formData.append("link_url", linkUrl);
    // }

    try {
      const response = await axios.post(
        `/api/students/${studentId}/projects/${projectId}/final-submission`,
        formData
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response?.data?.error || "Submission failed.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Final Project Submission
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
      {responseMessage && (
        <Typography variant="body2" color="info" sx={{ mt: 2 }}>
          {responseMessage}
        </Typography>
      )}
    </Box>
  );
};

export default FinalSubmission;
