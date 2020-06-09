import React, {useState, useEffect} from 'react';
import './LogIn.css'

function LogIn ({ sideBarState, getUser }) {
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setUser(e.target.value);
  }
  
  const handleKeyDown = (e) => {
    if(e.keyCode == 13){
      setUser(e.target.value);
      getUser(user)
    }
  }

  return (
    <div className={ sideBarState ? 'login-wraper-open': 'login-wraper-close'}>
     <input className="login" type="text" placeholder="Name " onKeyDown={ handleKeyDown } onChange={handleChange}  />
    </div>
  )

}

export default LogIn;


