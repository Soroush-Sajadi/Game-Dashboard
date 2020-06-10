import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import user from '../Images/user.svg';
import './NavBar.css';

function NavBar ({ userName, userScore }) {
  const [username, setUsername] = useState(null);
  const [score, setScore] = useState(null);

  const getScore = (name) => {
    setScore(JSON.parse(window.localStorage.getItem(name)));
  }

  const getUsername = (name) => {
    setUsername(JSON.parse(window.localStorage.getItem(name)));
  }

  useEffect(() => {
    getScore('score');
    getUsername('username');
  },[])
  
  return (
    <>  
      <NavLink to='/login'>
        <div className="navBar">
          <img src={user}/>
          { userScore === null ? <p className="score">{score}</p>: <p className="score">{userScore}</p> }
          { userName === null ? <p>{username}</p>: <p> {userName}</p> }
        </div>
      </NavLink>
    </>
  )
}

export default NavBar;



