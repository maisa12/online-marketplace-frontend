import React, {useState} from 'react';
import './App.css';
import Panel from './components/Panel';
import Home from './components/Home';
import Header from './components/Header';
import Filter from './components/Filter';
import AdPage from './components/AdPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  const [panelState, setPanelState] = useState(0); //panel state: guest = 0, member=1, admin=2 
  const [panelLoading, setPanelLoading] = useState(true); 
  return(
  <span>
    <Header setPanelState={setPanelState} setPanelLoading={setPanelLoading}/>
      <Router>
        <Switch>
          <Route path="/" exact >
            <Home/>
          </Route>
          <Route path="/panel" exact >
            <Panel panelState={panelState} panelLoading={panelLoading}/>
          </Route>
          <Route path="/filter/:category/:fromPrice/:toPrice/:thisWeek" exact component={Filter}/>
          <Route path="/ad/:adId" exact component={AdPage}/>
        </Switch>
      </Router>
  </span>
  );
}

export default App;
