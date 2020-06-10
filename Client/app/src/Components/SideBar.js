import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import closeIcon from '../Images/close.svg';
import iconHome from '../Images/iconsHome.svg';
import iconSetting from '../Images/iconSettings.svg';
import logIn from '../Images/login.svg';
import openMenu from '../Images/openMenu.svg';
import logOut from '../Images/logout.svg';
import './SideBar.css'

function SideBar({ toggleToApp, userName, removeUser, removeScore })  {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState(null);

  const getUsername = (name) => {
    setUsername(JSON.parse(window.localStorage.getItem(name)));
  }

  const removeFromLocalStorage = (name) => {
    window.localStorage.removeItem(name);
  }

  const toggle = () => {
    setIsOpen(isOpen => !isOpen);
    toggleToApp(isOpen);
  }

  const logOutUser = () => {
    removeUser(null);
    removeScore(null);
    removeFromLocalStorage('username');
    removeFromLocalStorage('score');
  }

  useEffect(() => {
    getUsername('username')
  },[])



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
              <p>Home</p>
            </li>  
          </NavLink>
          <NavLink to="/setting" style={{ textDecoration: 'none', color: 'white' }}>
            <li>
              <img src={iconSetting}/>
              <p>Settings</p>
            </li>
          </NavLink>
          <NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>
            <li onClick={logOutUser}>
              <img src={(userName === null && username === null) ? logIn: logOut}  />
              {(userName === null && username === null) ? <p>Log In</p> : <p>Log Out</p>}
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
    </>
  );
}
export default SideBar;