import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './LogIn.css'

function LogIn ({ sideBarState, getUser }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);


  const handleChangeMail = (e) => {
    setUser(e.target.value);
  }

  const handleChangeUserName = (e) => {
    setEmail(e.target.value)
  }

  const createAccount = () => {{

  }}
  
  const handleKeyDown = (e) => {
      
    
  }
  console.log(user, email)

  return (
    <div className={ sideBarState ? 'login-wraper-open': 'login-wraper-close'}>
      <div className="login-wraper">
        <input className="login" type="text" placeholder="User Name" onChange={handleChangeMail}  />
        <input className="login" type="text" placeholder="Email" onChange={handleChangeUserName} />
      </div>
        <input className="submit" type="submit" onClick={handleKeyDown} />
        <NavLink to="login/account">
          <p onClick={createAccount}>Create an acount</p>
        </NavLink>
    </div>
  )

}

export default LogIn;


