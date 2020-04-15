import React, {useState} from 'react';
import './App.css';

import Panel from './components/panel';
import Home from './components/home';
import Header from './components/header';
import Filter from './components/filter';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  const [panelState, setPanelState] = useState(0); //panel state: guest = 0, member=1, admin=2 
  return(
    <span>
    <Header setPanelState={setPanelState}/>
      <Router>
        <Switch>
          <Route path="/" exact >
            <Home/>
          </Route>
          <Route path="/panel" exact >
            <Panel panelState={panelState}/>
          </Route>
          <Route path="/filter/:category/:fromPrice/:toPrice/:thisWeek" exact component={Filter}/>
        </Switch>
      </Router>
      </span>
  );
}

export default App;
