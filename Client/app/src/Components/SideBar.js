import React, { useEffect, useState } from 'react';
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
          <li>
            <img src={iconHome}/>
            Home
          </li>
          <li>
            <img src={iconSetting}/>
            Settings
          </li>
          <li>
            <img src={logIn} />
            Log In
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SideBar;