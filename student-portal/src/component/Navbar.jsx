import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("Log Out");
        navigate('/');
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light m-0">
                        <NavLink to="/" className="navbar-brand">ICTAK Student Portal</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <NavLink to="/" className="nav-link">Home </NavLink>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                    <button className="btn btn-outline-danger my-2 my-sm-0" type="button" onClick={()=>handleLogout()}>Log Out</button>
                            </form>


                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};


export default Navbar;