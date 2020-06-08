import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import closeIcon from '../Images/close.svg';
import iconHome from '../Images/iconsHome.svg';
import iconSetting from '../Images/iconSettings.svg';
import logIn from '../Images/login.svg';
import openMenu from '../Images/openMenu.svg';
import './SideBar.css'

function SideBar({toggleToApp})  {
  // Declare a new state variable, which we'll call "count"
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(isOpen => !isOpen);
    toggleToApp(isOpen);
  }

  return (
    <>
    <div className={isOpen ? 'side-bar': 'side-bar-in'}>
      <div className="sideBar-closeIcon">
        <img className={isOpen ? 'closeIcon': 'openIcon'} src={isOpen ? closeIcon : openMenu} alt='close Icon' onClick={toggle} />
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
    </>
  );
}
export default SideBar;