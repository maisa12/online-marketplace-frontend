import React from 'react';
import '../App.css';
import UserPanel from './userPanelComponents/UserPanel';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function Panel({panelState, panelLoading}){
  return (
    <span>
      {panelLoading===true?(<div align="center">
               <CircularProgress color="inherit" />
            </div>):(<span>{panelState===0?(<h2>notFound</h2>):""}</span>)}
      {panelState!==0?(<UserPanel panelState={panelState}/>):""}
    </span>
  )
};