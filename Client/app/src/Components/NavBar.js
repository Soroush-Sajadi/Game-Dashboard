import React from 'react';
import {NavLink} from 'react-router-dom';
import user from '../Images/user.svg';
import './NavBar.css';

function navBar ({userName}) {
  return (
    <>  
      <NavLink to='/login'>
        <div className="navBar">
            <p>{userName}</p>
            <img src={user}/>
        </div>
      </NavLink>
    </>
  )

}

export default navBar;



