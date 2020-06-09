import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route } from'react-router-dom';

import './App.css';
import SideBar from './Components/SideBar'
import Home from './Components/Home';
import Setting from './Components/Setting';
import LogIn from './Components/LogIn';
import NavBar from './Components/NavBar';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = (childData) => {
    setIsOpen(!childData);
  }
 
  return (
    <div className="App">
      <BrowserRouter>
          <NavBar />
          <div className="app-wraper">
            <div className="route-app">
              <Switch>
                <Route exact path="/" render={() => <Home sideBarState={isOpen} />}/>
                <Route exact path="/setting" render={() => <Setting sideBarState={isOpen} />}/>
                <Route path="/login" render={() => <LogIn sideBarState={isOpen}/>}/>
              </Switch>
            </div>
            <div className="side-bar-app">
              <SideBar toggleToApp={toggle} />
            </div>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
