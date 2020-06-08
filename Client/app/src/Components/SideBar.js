import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import closeIcon from '../Images/close.svg';
import iconHome from '../Images/iconsHome.svg';
import iconSetting from '../Images/iconSettings.svg';
import logIn from '../Images/login.svg';
import './SideBar.css'

function SideBar()  {
  // Declare a new state variable, which we'll call "count"
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => console.log(isOpen), [isOpen]);

  return (
      
    <div className="side-bar">
      <div className="sideBar-closeIcon">
        <img className="closeIcon" src={closeIcon} alt='close Icon' />
      </div>
      <div className="sideBar-Route">
        <ul>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <li>
              <img src={iconHome}/>
              Home
            </li>  
          </NavLink>
          <NavLink to="/setting" style={{ textDecoration: 'none', color: 'white' }}>
            <li>
              <img src={iconSetting}/>
              Settings
            </li>
          </NavLink>
          <NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>
            <li>
              <img src={logIn} />
              Log In
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
export default SideBar;