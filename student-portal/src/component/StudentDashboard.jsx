import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import DocViewer from 'react-doc-viewer';

const StudentDashboard = ({ student_id }) => {
    console.log(`Student Id: ${student_id}`);
    const navigate = useNavigate();

    const [projectList, setProjectList] = useState([]);
    const [studentData, setStudentData] = useState({});



    useEffect(() => {
        const fetchProjectList = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/project/`);
                setProjectList(Array.from(response.data));
                //console.log(response.data);
                console.log(projectList);
            } catch (err) {
                console.error("Error fetching project details:", err);
                setError("Failed to fetch project details.");
            }
        };

        fetchProjectList();
    }, []);

    // fetching from mongo db student data using id
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/students/${student_id}`);
                setStudentData(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching project details:", err);
                setError("Failed to fetch project details.");
            }
        };

        fetchStudentData();
    }, [student_id]);

    console.log(projectList);

    const handleSelectProject = (id) => {
        console.log(`Selected project is ${id}`);
        navigate(`/projects/${id}`);

    }

    const handleViewDocument = (document_url) => {
        console.log(`Attachment url : ${document_url}`);
        window.open(`http://localhost:3000${document_url}`);

    }




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

                                <form>
                                    <div className="row row-gap-3">
                                        <div className="col-3">
                                            <label htmlFor="">Student ID</label>
                                            <input value={studentData?._id} disabled name="studName" type="text" placeholder="Student ID" className="form-control" />
                                        </div>
                                        <div className="col-3">

                                            <label htmlFor="">Student Name</label>
                                            <input value={studentData?.name} disabled name="studName" type="text" placeholder="Name" className="form-control" />
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="">Email</label>
                                            <input value={studentData?.email} disabled name="studEmail" type="text" placeholder="Email" className="form-control" />
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
                                    <tbody>
                                        {projectList?.map((project, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td className="text-center">{project?.title}</td>
                                                    <td className="text-center">{project?.description}</td>
                                                    <td className="text-center">
                                                        <button className="btn btn-secondary me-3 pl-2" onClick={() => handleViewDocument(project?.overview_document)}><i className="fa-regular fa-eye pe-2 text-primary text-primary pointer" ></i> View Attachments </button>
{/*                                                         
                                                        <NavLink target='_blank' download={project?.overview_document} >Download</NavLink> */}
                                                        <button className="btn btn-primary me-3 pl-2" onClick={() => handleSelectProject(project?._id)}><i className="fa-regular fa-plus pe-2 text-primary text-primary pointer" ></i> Select Project </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
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