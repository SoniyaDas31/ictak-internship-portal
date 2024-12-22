import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { listContext } from '../App';

const Navbar2 = () => {
    const { student_id, setstudent_id } = useContext(listContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("Log Out");
        setstudent_id("");
        localStorage.setItem('studentid', '');
        localStorage.setItem('projectid', '');
        localStorage.setItem('session', false);
        navigate('/');
    }

    const session = localStorage.getItem('session');
   

    const handleLogin = () => {
        navigate('/login');
    }


    return (
        
                    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light m-0">
                        <NavLink to="/" className="navbar-brand">ICTAK Student Portal</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 me-4">
                                <li className="nav-item active">
                                <a className="nav-link" href="/">Home </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard">Dashboard</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/projects">Projects</a>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                               
                                   <button className="btn btn-outline-primary my-2 my-sm-0 me-4" type="button" onClick={() => handleLogin()}>Log In</button>
{/*                                 
                                    <button className="btn btn-outline-danger my-2 my-sm-0" type="button" onClick={() => handleLogout()}>Log Out</button> */}
                               
                            </form>


                        </div>
                    </nav>
               
    );
};


export default Navbar2;