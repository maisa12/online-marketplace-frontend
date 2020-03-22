import React from 'react';
import './App.css';
import Header from './components/header';
import Panel from './components/panel';
import Home from './components/home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  return (
    <span>
    <Header/>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/panel" component={Panel}/>
        </Switch>
      </Router>
      </span>
  );
}

export default App;
