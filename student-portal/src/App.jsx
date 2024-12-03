import React, { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import LoginStud from './component/Login';
import StudentDashboard from './component/StudentDashboard';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App = () => {

  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch('http://127.0.0.1:3000/');
      const data = await res.json();
      console.log(res);
      console.log(data);
    }
    fetchData();
  }, []);


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginStud />}></Route>
          <Route path='/dashboard' element={<StudentDashboard />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
