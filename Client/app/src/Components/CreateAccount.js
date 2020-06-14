import React, {useState, useEffect, useReducer} from 'react';
import { Redirect } from 'react-router-dom';
import './CreateAccount.css'

function CreateAccount ({ sideBarState }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    userName: '',
    email: '',
    emailSecond: '',
    }
  );
  const [error, setError] = useState(null);
  const [messeageFromDataBase, setMesseageFromDataBase] = useState(null)

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({[name]: newValue});
  }

  const fetchData = async () => {
    if (userInput.userName !== '' && userInput.email !== '' && userInput.emailSecond !== ''){
      if( userInput.email === userInput.emailSecond && userInput.userName !== '') {
        setError('');
        await fetch (`http://localhost:3000/accounts`, {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
          "userName": userInput.userName,
          "email": userInput.email
          })
        })
        .then( res => res.json())
        .then(res => setMesseageFromDataBase(res));
      } else {
        setError('Emails are not the same');
      }
    } else {
      setError('Fill all the blanks')
    }
  }

  useEffect( () => {
    fetchData()
  },[])
  return (
    <div className={ sideBarState ? 'account-wraper-open': 'account-wraper-close' }>
      <div className="account-wraper">
      {error !== '' ? <h3>{error}</h3>: null}
        <input className="login" type="text" name="userName" value={userInput.userName} placeholder="Username" onChange={handleChange}  />
        <input className="login" type="text" name="email" value={userInput.email} placeholder="Email" onChange={handleChange} />
        <input className="login" type="text" name="emailSecond" value={userInput.emailSecond} placeholder="Repeat Email" onChange={handleChange} />
      </div>
        <input className="submit" type="submit" onClick={fetchData}  />
        
        {messeageFromDataBase === 'Email or user name is already taken' ? <h3>{messeageFromDataBase}</h3>: null}
        {messeageFromDataBase === 'Your account is succesesfully made!'? <Redirect to="/login"></Redirect>: null}
    </div>
  )

}

export default CreateAccount;