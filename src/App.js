import React from 'react';
import './App.css';
import Panel from './components/Panel';
import Home from './components/Home';
import Header from './components/Header';
import Filter from './components/Filter';
import AdPage from './components/AdPage';
import Admin from './components/Admin';
import theme from './components/theme';
import { ThemeProvider } from '@material-ui/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  return(
    <ThemeProvider theme={theme}>
      <Router>
      <Header />
        <Switch>
          <Route path="/" exact >
            <Home/>
          </Route>
          <Route path="/panel" exact >
            <Panel />
          </Route>
          <Route path="/adminPanel" exact >
            <Admin />
          </Route>
          <Route path="/posts/:query" exact component={Filter}/>
          <Route path="/ad/:adId" exact component={AdPage}/>
        </Switch>
      </Router>
  </ThemeProvider>
  );
}

export default App;
