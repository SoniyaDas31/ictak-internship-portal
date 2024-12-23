import React from 'react';
import Navbar2 from './Navbar-logout';
import '../App.css';
import { Link, Navigate } from 'react-router-dom';

const courses = [
  {
    title: 'Full Stack MERN',
    description: 'Master the art of building modern web applications with the MERN stack: MongoDB, Express.js, React, and Node.js. This comprehensive course covers both front-end and back-end development, equipping you with the skills to create dynamic, database-driven web solutions. Ideal for aspiring developers aiming to become proficient in full-stack development.',
    image: '/images/mern.webp',
  },
  {
    title: 'Full Stack MEAN',
    description: 'Dive into the world of Full Stack development with the MEAN stack: MongoDB, Express.js, Angular, and Node.js. Learn to build scalable, dynamic web applications using cutting-edge technologies. This course is perfect for those aspiring to excel in both front-end and back-end development, enabling you to create seamless, end-to-end web solutions.',
    image: '/images/mean.webp',
  },
  {
    title: 'Digital Marketing',
    description: 'Unlock the secrets of successful online marketing with our comprehensive Digital Marketing course. Master essential skills, including SEO, social media marketing, email campaigns, and analytics. This course empowers you to drive traffic, increase engagement, and grow your brand in the digital space. Perfect for aspiring marketers and business owners alike.',
    image: '/images/digital.webp',
  },
];

const Home = () => {
  return (
    <>
    
      <Navbar2 />

      <div className="App">
        <header className="hero">
          <h1 className="hero-title">Welcome to ICTAK Student Portal</h1>
          <p className="hero-subtitle">ICTAK Student Portal is an innovative platform designed to empower students to take charge of their internship experience. Scroll down to explore our unique features and start your journey.</p>
          <button className="hero-button">
            <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>Register Now</Link>
          </button>
        </header>

        <section className="course-section">
          <h2 className="section-title">Our Courses</h2>
          <div className="course-cards">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <img src={course.image} alt={course.title} className="course-image" />
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <button className="enroll-button"><Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>Enroll Now</Link></button>
              </div>
            ))}
          </div>
        </section>
        <section className="empowering-section">
          <h2 className="section-title">Empowering Students for Future Success</h2>
          <div className="empowering-columns">
            <div className="empowering-column">
              <h3>Internship Topics</h3>
              <p>Choose from a wide range of internship topics to align with your career goals and interests. Our platform provides the resources you need to excel in your chosen topic.</p>
            </div>
            <div className="empowering-column">
              <h3>Progress Tracking</h3>
              <p>Track your weekly submissions, project reports, and overall progress through our intuitive dashboard. Stay on top of your internship journey with ease.</p>
            </div>
            <div className="empowering-column">
              <h3>Mentor Support</h3>
              <p>Gain access to experienced mentors who provide guidance, evaluate your projects, and offer valuable feedback to enhance your learning experience.</p>
            </div>
          </div>
        </section>




      </div>
      
    </>
  );
};

export default Home;
