import React from 'react';
import './About.css';
import Navbar from './Navbar';

function About() {
  return (<>
  <Navbar />
    <div className="about">
      <div className="profile-picture">
        <img src="/Vansh.jpg" alt="Your Name" />
      </div>
      <div className="description">
        <h2>About Me</h2>
        <p>
          Hi, I'm Vansh. I'm a passionate Software Engineer with a love for Programming. I enjoy Sports and Video Games. This is a brief description of myself.
        </p>
      </div>
    </div>
    </>
  );
}

export default About;