import React, { useState } from 'react';
import Navbar from './component/Navbar';
import LoginStud from './component/Login';
import StudentDashboard from './component/StudentDashboard';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



const App = () =>{

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginStud/>}></Route>
          <Route path='/dashboard' element={<StudentDashboard/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
