import React, { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import LoginStud from './component/Login';
import StudentDashboard from './component/StudentDashboard';
import ProjectDashboard from './component/ProjectDashboard';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginStud />}></Route>
          <Route path='/dashboard' element={<StudentDashboard student_id={'67576a387de977b31c4991f6'} />}></Route>
          <Route path='/projects/:id' element={<ProjectDashboard/>}></Route>
          <Route path='/projects/' element={<ProjectDashboard/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
