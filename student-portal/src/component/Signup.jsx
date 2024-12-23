import React, { useContext, useEffect, useState } from 'react';
import Navbar2 from './Navbar-logout';
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography, Link } from '@mui/material';
import axios from 'axios';

const Signup = () => {

   const navigate = useNavigate();

  const [signupError, setSignupError] = useState(false);
  const [signupComments, setSignupComments] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [studentMark, setStudentMark] = useState([]);
  const [formData, setFormData] = useState("");
  const [error, setError] = useState('');
  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // fetching from mongo db student data using id
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://student-server-94l5.onrender.com/students`);
        setStudentData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching student details:", err);
        setError("Failed to fetch student details.");
      }
    };
    fetchStudentData();
  }, []);
  useEffect(() => {
    const fetchStudentMark = async () => {
      try {
        const response = await axios.get(`https://student-server-94l5.onrender.com/signup/mark`);
        setStudentMark(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching Mark details:", err);
        setError("Failed to fetch Mark details.");
      }
    };
    fetchStudentMark();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    // let studentExamEmail=studentMark.email

    // console.log(studentMark.email);

    // let form_email = e.target.elements.email.value;
    // let form_password = e.target.elements.password.value;
    let form_email = formData.email;
    console.log(form_email);

    const examEmailValidation = studentMark.find((mark) => mark.email === form_email);
    //console.log(examEmailValidation.mark);
    if (!examEmailValidation) {
      setSignupComments("Student not attended the exam.")
    }
    let exitexam_pass = examEmailValidation.mark > 50;
    console.log(exitexam_pass)
    if (!exitexam_pass) {
      setSignupComments("Minimum passmark is not secured.")
    }
    const emailValidation = studentData.find((user) => user.email === form_email);
    console.log(emailValidation);

    if (!emailValidation) {
      console.log("Student Not Registered");


      // if(!studentData.mark>50){}

      // Capturing html form data to an objec
      // const formData = new FormData();
      // formData.append("name", e.target.elements.name.value);
      // formData.append("email", e.target.elements.email.value);
      // formData.append("password", e.target.elements.password.value);
      // formData.append("phonenumber", e.target.elements.phone.value);
      // console.log(formData);
      // for (const [key, value] of formData.entries()) {
      //     console.log(`${key}: ${value}`);
      // }

      // Api Call to push data to signup student
      try {
        const response = await axios.post(
          'https://student-server-94l5.onrender.com/signup',
          formData,

        );

        console.log(response.data.message || "Student Registered successfully");
        setSignupComments("Student Registered successfully, Redirecting to login page...");
        setTimeout(() => {
            navigate('/login');
        }, 3000);

      }
      catch (error) {
        if (error.response) {
          setError(error.response.data.error || 'An error occurred during submission.');
          console.log(error.response.data.error);
        } else {
          setError('Unable to connect to the server.');
          setSignupComments("Unable to connect to the server.");
          setSignupError(true);
        }

      }
    }

    else {
      console.log("Student Already Registered, Please Login");
      setSignupComments("Already Registered, Please Login!");
    }
  }

  return (
    <>
      <Navbar2 />
      <div className="container-fluid">
        <div className="row mt-4 justify-content-center">
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={formSubmit} id="signupForm">
                  <div className="row row-gap-3">
                    <div className="col-12">
                      <label htmlFor="">Name</label>
                      <input id="name" name="name" type="text" placeholder="Full Name" onChange={inputHandler} className="form-control form-control-user" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="">Email</label>
                      <input id="email" name="email" type="email" placeholder="Email" onChange={inputHandler} className="form-control form-control-user" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="">Password</label>
                      <input id="password" name="password" type="password" placeholder="Password" onChange={inputHandler} className="form-control" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="">Phone</label>
                      <input id="phone" name="phonenumber" type="text" placeholder="Phone Number" onChange={inputHandler} className="form-control form-control-user" required />
                    </div>

                  </div>
                  <div className="row mt-10">
                    <div className="col-12 mt-4 d-flex justify-content-start">
                      <button className="btn btn-primary" type="submit">Register</button>
                    </div>

                  </div>
                  <div className='row mt-4'>

                    <div className="alert alert-primary col-8 ml-2" role="alert">
                      {signupComments ? (
                        <span>{signupComments}</span>
                      ) : (
                        <span> Please fill the form with details to register</span>
                      )}
                    </div>


                  </div>
                  <div className='row mt-3'>
                    <a href={'/login'} style={{ color: 'darkblue' }}>Registered user? Please click here</a>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Box sx={{ flexGrow: 1 }} style={{ marginTop: '10%', width: '50%', marginLeft: '30%' }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" />
          </Grid>

          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
          </Grid>

          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined" />
          </Grid>

          <Grid size={6}>
            <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" />
          </Grid>

          <Button variant="contained" >Signup</Button>
          <Grid size={12}>
            <Typography>
              <Link to={'/'} style={{ color: 'darkblue' }}>Registered user? Please click here</Link>
            </Typography>

          </Grid>

        </Grid>
      </Box> */}

    </>
  )
}
export default Signup      