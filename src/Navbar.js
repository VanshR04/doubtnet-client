import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import menu icons from react-icons
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [user,setuser] = useState('')
  const location = useLocation()
  const history = useNavigate()
  const [add, setadd] = useState(false)
  const [issignout, setissignout] = useState(false)
  const [about, setabout] = useState(false)
  const [signup,setsignup] = useState(false)
  const [home,sethome] = useState(false)

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };
  function signout(){
    setissignout(true)
  }

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setMenuVisible(false);
    }
  };
  useEffect(() => {
    if(location.state && location.state.name !== null){
      setuser(location.state.name)
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.state]);

  function adddoubt(){
    setadd(true)
  }

  function aboutpage(){
    history('/about', {state : {user : user}})
  }

  function signuppage(){
    setsignup(true)
  }

  function loginpage(){
    history('/login')
  }

  function homepage(){
    history('/home')
  }


  if(add){
    history('/add-doubt', {state : {user : user}})
  }

  if(issignout){
    history('/login')
  }
  if(signup){
    history('/signup')
  }

  return (
    <nav className="navbar">
      <div className="logo">DoubtNet</div>
      <div className={`menu-icon`} onClick={toggleMenu}>
        {menuVisible ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`nav-links ${menuVisible ? 'active' : ''}`}>
        <li onClick={closeMenu}><a onClick={homepage} className='nav-op'>Home</a></li>
        {user && <li onClick={closeMenu}><a onClick = {adddoubt} className='nav-op'>Add Doubt</a></li>}
        <li onClick={closeMenu}><a onClick={aboutpage} className='nav-op'>About the Creator</a></li>
        {!user && <li onClick={closeMenu}><a onClick={signuppage} className='nav-op'>Signup</a></li>}
        {!user && <li onClick={closeMenu}><a onClick={loginpage} className='nav-op'>Login</a></li>}
        {user&& <li className='nav-op'>Welcome {location.state.name}</li>}
        {user && <li className='nav-op' onClick={signout}>Signout</li>}
      </ul>
    </nav>
  );
}

export default Navbar;
