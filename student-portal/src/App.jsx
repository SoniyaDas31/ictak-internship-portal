import React, { createContext, useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import ErrorPage from './component/404page';
import LoginStud from './component/Login';
import Signup from './component/Signup';
import StudentDashboard from './component/StudentDashboard';
import ProjectDashboard from './component/ProjectDashboard';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import ErrorBoundary from './component/ErrorBoundary';

const listContext = createContext();



const App = () => {

  const studentidlocal = localStorage.getItem('studentid');
  const projectidlocal = localStorage.getItem('projectid');
  const [student_id, setstudent_id] = useState({});
  //const student_id_loggedin = '67576a387de977b31c4991f6';
  //console.log(student_id);
 // console.log(projectidlocal);
 // console.log('Local Storage Student Id', studentidlocal);
 // console.log('Local Storage Project Id', projectidlocal);
  
  return (
    <>
    <listContext.Provider value={{student_id, setstudent_id}}>
      <Router>
        <Routes>
          <Route path='/*' element={<ErrorPage/>} />
          <Route path='/' element={<Home />}></Route>
          <Route path='/dashboard' element={<StudentDashboard student_id={studentidlocal} />}></Route>
          <Route path='/projects/' element={<ProjectDashboard project_id={projectidlocal} student_id={studentidlocal} />}></Route>
          <Route path='/login' element={<LoginStud/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path="/project-dashboard" element={<ProjectDashboard />} />
        </Routes>
      </Router>
      </listContext.Provider>
    </>
  )
}

export {listContext};

export default App;
