import React, {useState, useEffect} from 'react';
import './App.css';

import Panel from './components/panel';
import Home from './components/home';
import Header from './components/header';

function App() {
  const [pageState, setPageState] = useState('home');
  const [panelState, setPanelState] = useState(0); //panel state: guest = 0, member=1, admin=2 
const site = (state)=> {
  if(state==='home'){
    return (
      <Home/>
  )
  }
 if(state==='panel'){
   return(
     <Panel panelState={panelState}/>
   )
 }
}
useEffect(()=>{
  site(pageState)
}, [pageState])
  return (
    <span>
        <Header setPageState={setPageState} setPanelState={setPanelState}/>
        {site(pageState)}
      </span>
  );
}

export default App;
