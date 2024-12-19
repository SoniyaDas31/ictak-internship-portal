import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import DocViewer from 'react-doc-viewer';
import { Alert, Box, Button, CircularProgress, Paper, TextareaAutosize, TextField, Typography } from '@mui/material';

const StudentDashboard = ({ student_id }) => {

    console.log(`Student Id: ${student_id}`);
    const navigate = useNavigate();

    const projectidlocal = localStorage.getItem('projectid');

    if (!student_id) {
        console.log('student id is blank');
        navigate('/login');
    }

    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState([]);
    const [studentData, setStudentData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectid, setProjectId] = useState([]);
    const [submissionComments, setSubmissionComments] = useState("");
    const [submissionSuccess, setSubmissionSuccess] = useState("");

    const session = localStorage.getItem('session');
    console.log(`Session is ${session}`);


    // fetching Project List for Student to select
    useEffect(() => {
        const fetchProjectList = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/project/`);
                setProjectList(Array.from(response.data));
                //console.log(response.data);
                //console.log(projectList);
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
                //console.log(response.data);
            } catch (err) {
                console.error("Error fetching project details:", err);
                setError("Failed to fetch project details.");
            }
        };

        fetchStudentData();
    }, [student_id]);

    const isProject = studentData?.enrolled_projects;
    if(isProject){
        //console.log(isProject);
        isProject.forEach(function(value,key) {
            console.log(value.project_id);
            localStorage.setItem('projectid', value.project_id);
         });
    }
    console.log('Project ID',projectidlocal);

    // fetching project details for requested id in the url
    useEffect(() => {
        const fetchProjectDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/project/${projectidlocal}`);
            setSelectedProject(response.data);
            console.log(response.data.id);
            console.log(selectedProject);
            const project_title = selectedProject?.title;
            console.log(project_title);
        } catch (err) {
            console.error("Error fetching project details:", err);
            setError("Failed to fetch project details.");
        }
        };

        fetchProjectDetails();
    }, [projectidlocal]);

    //console.log(projectList);

    const handleSelectProject = (id) => {
        console.log(`Selected project is ${id}`);
        localStorage.setItem('projectid', id);
        const project_idlocal = localStorage.getItem('projectid');
        console.log('Project Id stored', project_idlocal);
        const postProjectData = async() =>{
            console.log('posting selected project');
            try {
                const response = await axios.post(
                  `http://localhost:3000/students/${student_id}/${project_idlocal}`
                );
          
                setSubmissionSuccess(response.data.message);
                console.log(submissionSuccess);
                localStorage.setItem('projectid', id);
                setTimeout(()=> {
                    navigate(`/projects/`);
                },2000);
                setSubmissionComments("");
              } catch (err) {
                console.error("Error submitting weekly submission:", err);
                setError("Failed to submit the weekly submission.");
              }
        }
        postProjectData();

        
       // navigate(`/projects/`);

    }

    // Define function that will open the modal
    const handleOpenModal = (projectId) => {
        // setProjectId(projectId);
        console.log(`Project Id ${projectId}`);
        setProjectId(`${projectId}`);
        setIsModalOpen(true);
        return projectid;
    };

    // Define function that will close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                                        {/* <div className="col-3">
                                            <label htmlFor="">Student ID</label>
                                            <input value={studentData?._id} disabled name="studName" type="text" placeholder="Student ID" className="form-control" />
                                        </div> */}
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
                                                        <button className="btn btn-primary me-3 pl-2" data-toggle="modal" onClick={() => handleOpenModal(project?._id)} data-target="#projectConfirmModal"><i className="fa-regular fa-plus pe-2 text-primary text-primary pointer" ></i> Select Project </button>

                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div id="projectConfirmModal" className={`modal ${isModalOpen ? 'open' : 'close'}`} role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Project Selection Confirmation</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p>Once the Project is selected cannot be changed</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={() => handleSelectProject(projectid)}>Confirm</button>
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => handleCloseModal}>Cancel</button>
                                            </div>
                                            {submissionSuccess && <Alert severity="success">{submissionSuccess}</Alert>}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default StudentDashboard;