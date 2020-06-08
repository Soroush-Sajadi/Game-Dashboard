import React from 'react';
import './LogIn.css'

function LogIn ({ sideBarState }) {
  return (
    <div className={ sideBarState ? 'login-wraper-open': 'login-wraper-close'}>
      Here is LogIn
    </div>
  )

}

export default LogIn;