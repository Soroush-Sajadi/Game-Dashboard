import React, {useState, useEffect, useReducer} from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import './LogIn.css'

function LogIn ({ sideBarState, getUser, getScore }) {
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

  const saveToLocalStorage = (name, data) => {
    window.localStorage.setItem(name, JSON.stringify(data))
  }


  const getLogIn  = async () => {
    await fetch(`http://localhost:3000/accounts/${user.userName}/${user.email}`)
      .then(res => res.json())
      .then(data => data[0] === true ? setMessegeFromDataBase(data[0]) ||
        getUser(user.userName) || getScore(data[1]) || 
        saveToLocalStorage( 'username', user.userName ) || saveToLocalStorage( 'score', data[1] ) 
        : setMessegeFromDataBase(data))
  }
  return (
    <div className={ sideBarState ? 'login-wraper-open': 'login-wraper-close'}>
      <div className="login-wraper">
        <input className="login" type="text" name="userName" value={user.userName} placeholder="Username" onChange={ handleChange } />
        <input className="login" type="text" name="email" value={user.email} placeholder="Email" onChange={ handleChange } />
      </div>
        <input className="submit" type="submit"
          onClick={getLogIn} />
        <NavLink to="login/account" style={{ textDecoration: 'none' }}>
          <p>Create an acount</p>
        </NavLink>
        {messageFromDataBase === false ? <h3>Email or Username is wrong</h3>: null}
        {messageFromDataBase === true ? <Redirect to="/" />: null}
    </div>
  )
}

export default LogIn;


