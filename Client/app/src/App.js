import React from 'react';
import { BrowserRouter, Switch, Route } from'react-router-dom';

import './App.css';
import SideBar from './Components/SideBar'
import Home from './Components/Home';
import Setting from './Components/Setting';
import LogIn from './Components/LogIn';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <>
          <div>
            <SideBar />
          </div>
          <Switch>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/setting" render={() => <Setting />}/>
            <Route path="/login" render={() => <LogIn />}/>
          </Switch>
        </>
        </BrowserRouter>
    </div>
  );
}

export default App;
