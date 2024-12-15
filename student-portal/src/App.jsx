import React, { createContext, useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import LoginStud from './component/Login';
import StudentDashboard from './component/StudentDashboard';
import ProjectDashboard from './component/ProjectDashboard';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const listContext = createContext();

const App = () => {

  const [student_id, setstudent_id] = useState({});
  //const student_id_loggedin = '67576a387de977b31c4991f6';
  console.log(student_id);

  return (
    <>
    <listContext.Provider value={{student_id, setstudent_id}}>
      <Router>
        <Routes>
          <Route path='/' element={<LoginStud />}></Route>
          <Route path='/dashboard' element={<StudentDashboard student_id={student_id} />}></Route>
          <Route path='/projects/:id' element={<ProjectDashboard />}></Route>
          <Route path='/projects/' element={<ProjectDashboard />}></Route>
        </Routes>
      </Router>
      </listContext.Provider>
    </>
  )
}

export {listContext};

export default App;
