import React from 'react';
import {NavLink} from 'react-router-dom';
import user from '../Images/user.svg';
import './NavBar.css';

function navBar () {
  return (
    <>  
      <NavLink to='/login'>
        <div className="navBar">
            <img src={user}/>
        </div>
      </NavLink>
    </>
  )

}

export default navBar;



