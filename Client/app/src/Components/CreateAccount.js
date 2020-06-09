import React, {useState, useEffect, useReducer} from 'react';
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

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({[name]: newValue});
  }

  const fetchData = async () => {
    if( userInput.email === userInput.emailSecond && userInput.userName !== '') {
      console.log('here')
      await fetch (`http://localhost:3000/accounts`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        "userName": userInput.userName,
        "email": userInput.email
        })
      })
    } else {
      setError('Emails are not the same');
    }
  }

  useEffect( () => {
    fetchData()
  },[])

  return (
    <div className={ sideBarState ? 'account-wraper-open': 'account-wraper-close' }>
      <div className="account-wraper">
        <input className="login" type="text" name="userName" value={userInput.userName} placeholder="User Name" onChange={handleChange}  />
        <input className="login" type="text" name="email" value={userInput.email} placeholder="Email" onChange={handleChange} />
        <input className="login" type="text" name="emailSecond" value={userInput.emailSecond} placeholder="Repeat Email" onChange={handleChange} />
      </div>
        <input className="submit" type="submit" onClick={fetchData}  />
    </div>
  )

}

export default CreateAccount;