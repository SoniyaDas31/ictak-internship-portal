import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import {listContext} from '../App';

const LoginStud = () => {

    const [loginError, setloginError] = useState("");
    const [studentData, setStudentData] = useState([]);
    
    const {student_id, setstudent_id} = useContext(listContext);

    // fetching from mongo db student data using id
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/students/`);
                setStudentData(Array.from(response.data));
                //console.log(response.data);
            } catch (err) {
                console.error("Error fetching project details:", err);
                setError("Failed to fetch project details.");
            }
        };
        fetchStudentData();
    }, []);



    const navigate = useNavigate();

  


    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        console.log(studentData);
        let form_email = e.target.elements.email.value;
        let form_password = e.target.elements.password.value;
        console.log(form_email);
        const emailValidation = studentData.find((user) => user.email === form_email);
        console.log(emailValidation.password);
        if(emailValidation.password === form_password){
            setloginError(false);
            console.log(emailValidation._id);
            setstudent_id(emailValidation._id);
            console.log(student_id);
            navigate('/dashboard');
        }else{
            setloginError(true);
        }

        console.log("Form Submitted");
    }


    return (
        <div className="container-fluid">
            <div className="row mt-4 justify-content-center">
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            <h4>Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formSubmit} id="loginForm">
                                <div className="row row-gap-3">
                                    <div className="col-12">
                                        <label htmlFor="">Email</label>
                                        <input id="email" name="empEmail" type="email" placeholder="Email" className="form-control" />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="">Password</label>
                                        <input id="password" name="empEmail" type="password" placeholder="Password" className="form-control"  />
                                    </div>
                                </div>
                                <div className="row mt-10">
                                    <div className="col-12 mt-4 d-flex justify-content-start">
                                        <button className="btn btn-primary" type="submit">Login</button>

                                    </div>
                                </div>
                                <div className='row mt-4'>
                                { loginError? (
                                <div className="alert alert-danger col-8 ml-4" role="alert">
                                    Login failed Please check your email and password
                                </div>
                                ):(
                                <div className="alert alert-primary col-8 ml-4" role="alert">
                                    Please enter email and password to login
                                </div>
                                    
                                )}

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginStud;