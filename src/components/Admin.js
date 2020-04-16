import React from 'react';
import '../App.css';
import AdminPanel from './adminPanelComponents/AdminPanel';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function Admin({panelState, panelLoading}){
  return (
    <span>
      {panelLoading===true?(<div align="center">
               <CircularProgress color="inherit" />
            </div>):(<span>{panelState===2?(<AdminPanel/>):<h2>notFound</h2>}</span>)}
     
    </span>
  )
};