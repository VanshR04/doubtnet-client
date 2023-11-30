import React, { useState , useEffect} from 'react';
import './About.css';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

function About() {

  const [user,setuser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if(location.state && location.state.user !== null){
      setuser(location.state.user)
    }
  },[location.state]);

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