import React from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const StudentDashboard = () => {

    const navigate = useNavigate();

    

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row mt-4 justify-content-center">
                    <div className="col-12">
                        <h4>Student Dashboard</h4>
                        <div className="card">
                            <div className="card-header">
                                <h5>Student Info</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit="">
                                    <div className="row row-gap-3">
                                        <div className="col-3">
                                            <label htmlFor="">Student ID</label>
                                            <input name="studName" type="text" placeholder="Student ID" className="form-control" />
                                        </div>
                                        <div className="col-3">

                                            <label htmlFor="">Student Name</label>
                                            <input name="studName" type="text" placeholder="Name" className="form-control" />
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="">Email</label>
                                            <input name="studEmail" type="text" placeholder="Email" className="form-control" />
                                        </div>

                                    </div>
                                </form>

                            </div>
                        </div>

                        <div className="card mt-4">
                            <div className="card-header">
                                <h5>Project List</h5>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">Project No</th>
                                            <th scope="col" className="text-center">Project Title</th>
                                            <th scope="col" className="text-center">Project Description</th>
                                            <th scope="col" className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tr>
                                        <td className="text-center">001</td>
                                        <td className="text-center">Job Portal in ReactJS</td>
                                        <td className="text-center">Create a job portal using ReactJS and mongoDB cloud</td>
                                        <td className="text-center">
                                            <button className="btn btn-secondary me-3 pl-2"><i className="fa-regular fa-eye pe-2 text-primary text-primary pointer" ></i> View Attachments </button>
                                            <button className="btn btn-primary me-3 pl-2"  onClick={handleSelectProject}><i className="fa-regular fa-plus pe-2 text-primary text-primary pointer" ></i> Select Project </button>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default StudentDashboard;