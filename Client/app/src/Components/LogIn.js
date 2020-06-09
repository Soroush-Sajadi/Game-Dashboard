import React from 'react';
import './LogIn.css'

function LogIn ({ sideBarState }) {
  return (
    <div className={ sideBarState ? 'login-wraper-open': 'login-wraper-close'}>
     <input className="login" type="text" placeholder="Name " />
    </div>
  )

}

export default LogIn;