import React from 'react';
import '../App.css';
import AdminPanel from './adminPanelComponents/AdminPanel';
import UserPanel from './userPanelComponents/UserPanel';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function Panel({panelState, panelLoading}){
  return (
    <span>
      {panelLoading===true?(<div align="center">
               <CircularProgress color="inherit" />
            </div>):(<span>{panelState===0?(<h2>notFound</h2>):""}</span>)}
      {panelState===2?(<AdminPanel/>):""}
      {panelState===1?(<UserPanel/>):""}
    </span>
  )
};