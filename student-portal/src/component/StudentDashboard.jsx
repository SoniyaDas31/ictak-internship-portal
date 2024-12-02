import React from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

const StudentDashboard = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row mt-4 justify-content-center">
                    <div className="col-12">
                        <div className="card">
                        <div className="card-header">
                            <h4>Student Dashboard</h4>
                        </div>
                        <div className="card-body">
                            <p>Content will load here...</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </>
    );
}

export default StudentDashboard;