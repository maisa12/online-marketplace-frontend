import React, {useEffect} from 'react';
import '../App.css';
import AdminPanel from './adminPanelComponents/adminPanel';
import UserPanel from './userPanelComponents/userPanel';

export default function Panel({panelState}){

//if panelState=0 default value
const changeState = (number) => {
  //panelState=2 adminpanel
  if(number===2){
    return (
      <AdminPanel/>
    )
  }
   //panelState=1 adminpanel
  else if(number===1){
    return(
      <UserPanel/>
    )
  }
  else{
    return(
      <h2>404 not found</h2>
    )
  }
}
useEffect(()=>{
  changeState(panelState);
},[panelState])
  return (
    <span>
      {changeState(panelState)}
    </span>
  );
}