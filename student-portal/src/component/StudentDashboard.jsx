import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import DocViewer from 'react-doc-viewer';
import { Alert, Box, Button, CircularProgress, Paper, TextareaAutosize, TextField, Typography } from '@mui/material';

const StudentDashboard = ({ student_id }) => {

    //console.log(`Student Id: ${student_id}`);
    const navigate = useNavigate();

    const projectidlocal = localStorage.getItem('projectid');

    if (!student_id) {
        console.log('student id is blank');
        navigate('/login');
    }

    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState([]);
    const [enrolled, setEnrolled] = useState(false);
    const [studentData, setStudentData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [projectid, setProjectId] = useState([]);
    const [submissionComments, setSubmissionComments] = useState("");
    const [submissionSuccess, setSubmissionSuccess] = useState("");

    const session = localStorage.getItem('session');
    //console.log(`Session is ${session}`);

    // Date Format Function
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }   


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
    if (isProject) {
        //console.log(isProject);
        isProject.forEach(function (value, key) {
            //console.log(value.project_id);
            localStorage.setItem('projectid', value.project_id);
        });
    } else {
        localStorage.setItem('projectid', '');


    }

    //console.log('Project ID', projectidlocal);

    if (!projectidlocal) {
        console.log("No Project assigned");
        //setEnrolled(false);
    } else {
        console.log("Project Assigned Already");
        //setEnrolled(true);
    }

    // fetching project details for requested id in the url
    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/project/${projectidlocal}`);
                setSelectedProject(response.data);
                console.log('ProjectID local in API', projectidlocal);
                //console.log('Selected Project is :',response.data);
                //console.log('Selected Project Data :', selectedProject);
                //console.log('Is enrolled ? :', enrolled);
            } catch (err) {
                console.error("Error fetching project details:", err);
                setError("Failed to fetch project details.");
            }
        };

        fetchProjectDetails();
    }, [projectidlocal]);

    //console.log(projectList);

    const handleSelectProject = (id) => {
        //console.log(`Selected project is ${id}`);
        localStorage.setItem('projectid', id);
        const project_idlocal = localStorage.getItem('projectid');
        //console.log('Project Id stored', project_idlocal);
        const postProjectData = async () => {
            //console.log('posting selected project');
            try {
                const response = await axios.post(
                    `https://student-server-94l5.onrender.com/students/${student_id}/${project_idlocal}`
                );

                setSubmissionSuccess(response.data.message);
                console.log(submissionSuccess);
                localStorage.setItem('projectid', id);
                setTimeout(() => {
                    navigate(`/projects/`);
                }, 2000);
                setSubmissionComments("");
            } catch (err) {
                console.error("Error submitting weekly submission:", err);
                setError("Failed to submit the weekly submission.");
            }
        }
        postProjectData();


    }

    // Define function that will open the modal
    const handleOpenModal = (projectId) => {
        // setProjectId(projectId);
        //console.log(`Project Id ${projectId}`);
        setProjectId(`${projectId}`);
        setIsModalOpen(true);
        return projectid;
    };

    // Define function that will close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleViewDocument = (document_url) => {
        //console.log(`Attachment url : ${document_url}`);
        window.open(`https://student-server-94l5.onrender.com${document_url}`);

    }




    return (
        <>
            <Navbar />



            <div className="container-fluid">
                <div className="row mt-4 justify-content-center">
                    <div className="col-12">
                        <h4 className="mb-4">Student Dashboard</h4>
                        <div className="card">
                            <div className="card-header">
                                <h5>Student Info</h5>
                            </div>
                            <div className="card-body">

                                <form>
                                    <div className="row row-gap-3">
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



                        {/* project list */}
                        <div className="card mt-4">
                            <div className="card-header">
                                <h5>Project List</h5>
                            </div>
                            <div className="card-body">
                                {projectidlocal ? (
                                    selectedProject ? (
                                        <Paper sx={{ padding: "1rem", marginBottom: "2rem" }} elevation={3}>
                                            <Typography variant="h5">{selectedProject.title}</Typography>
                                           
                                            <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
                                                {selectedProject.description}
                                            </Typography>
                                            <Typography variant="subtitle2"  sx={{ marginBottom: "1rem" }} color="error">
                                                End Date: &nbsp;{formatDate(selectedProject?.internship_end_date)}
                                            </Typography>
                                            {selectedProject.overview_document && (
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    href={selectedProject.overview_document}
                                                    target="_blank"
                                                    mt={1}
                                                    download
                                                >
                                                    Download Project Overview
                                                </Button>


                                            )} &nbsp;&nbsp;&nbsp;
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                href="/projects"
                                            >
                                                View Project
                                            </Button>
                                            
                                        </Paper>
                                    ) : (
                                        <Typography variant="body1" color="error">
                                            No project details available.
                                        </Typography>
                                    )
                                ) : (

                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-center">Project No</th>
                                                <th scope="col" className="text-center">Project Title</th>
                                                <th scope="col" className="text-center">Project Description</th>
                                                <th scope="col" className="text-center">Project End Date</th>
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
                                                        <td className="text-center">{formatDate(project?.internship_end_date)}</td>
                                                        <td className="text-center">
                                                            <button className="btn btn-secondary me-3 pl-2" onClick={() => handleViewDocument(project?.overview_document)}><i className="fa-regular fa-eye pe-2 pointer" ></i> View Attachments </button>
                                                            <button className="btn btn-primary me-3 pl-2" data-toggle="modal" onClick={() => handleOpenModal(project?._id)} data-target="#projectConfirmModal"><i className="fa-regular fa-plus pe-2 pointer" ></i> Select Project </button>

                                                        </td>
                                                    </tr>
                                                );
                                            })
                                            }
                                        </tbody>
                                    </table>

                                )}



                                <div id="projectConfirmModal" className={`modal ${isModalOpen ? 'open' : ''}`} role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" onClick={() => handleCloseModal()}>&times;</button>
                                                <h4 className="modal-title">Project Selection Confirmation</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p>Once the Project is selected cannot be changed</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={() => handleSelectProject(projectid)}>Confirm</button>
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => handleCloseModal()}>Cancel</button>
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