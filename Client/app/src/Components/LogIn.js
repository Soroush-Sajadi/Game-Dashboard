import React, {useState, useEffect, useReducer} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import './LogIn.css'

function LogIn ({ sideBarState, getUser }) {
  const [user, setUser] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    userName: '',
    email: '',
    }
  );
  const [messageFromDataBase, setMessegeFromDataBase] = useState('');

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUser({[name]: newValue});
  }

  const getLogIn  = async () => {
    await fetch(`http://localhost:3000/accounts/${user.userName}/${user.email}`)
      .then(res => res.json())
      .then(res => res === true ? getUser(user.userName) : setMessegeFromDataBase(res))
  }

  useEffect(() => {
    getLogIn();
  }, [])
  return (
    <div className={ sideBarState ? 'login-wraper-open': 'login-wraper-close'}>
      <div className="login-wraper">
        <input className="login" type="text" name="userName" value={user.userName} placeholder="Username" onChange={ handleChange } />
        <input className="login" type="text" name="email" value={user.email} placeholder="Email" onChange={ handleChange } />
      </div>
        <input className="submit" type="submit"
          onClick={getLogIn} />
        <NavLink to="login/account">
          <p>Create an acount</p>
        </NavLink>
        {messageFromDataBase === false ? <h3>Email or Username is wrong</h3>: null}


    </div>
  )

}

export default LogIn;


