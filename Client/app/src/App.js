import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route } from'react-router-dom';

import './App.css';
import SideBar from './Components/SideBar'
import Home from './Components/Home';
import Setting from './Components/Setting';
import LogIn from './Components/LogIn';
import NavBar from './Components/NavBar';
import CreateAccount from './Components/CreateAccount';

function App() {
  const [ isOpen, setIsOpen ] = useState(true);
  const [ user, setUser ] = useState(null);
  const [ score, setScore ] = useState(null);

  const toggle = (childData) => {
    setIsOpen(!childData);
  }

  const getUser = (childData) => {
    setUser(childData);
  }

  const removeUser = (childData) => {
    setUser(childData);
  }

  const getScore = (childData) => {
    setScore(childData);
  }

  const removeScore = (childData) => {
    setScore(childData)
  }
  return (
    <div className="App">
      <BrowserRouter>
          <NavBar userName={user} userScore={score}/>
          <div className="app-wraper">
            <div className="route-app">
              <Switch>
                <Route exact path="/" render={() => <Home sideBarState={isOpen} />}/>
                <Route exact path="/setting" render={() => <Setting sideBarState={isOpen} />}/>
                <Route exact path="/login" render={() => <LogIn sideBarState={isOpen} getUser={getUser} getScore={getScore}/>}/>
                <Route path="/login/account" render={() => <CreateAccount sideBarState={isOpen} />} />
              </Switch>
            </div>
            <div className="side-bar-app">
              <SideBar toggleToApp={toggle} userName={user} removeUser={removeUser} removeScore={removeScore} />
            </div>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
