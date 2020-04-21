import React from 'react';
import '../App.css';
import UserPanel from './userPanelComponents/UserPanel';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector} from 'react-redux';

export default function Panel(){
  const status =  useSelector(state=>state.status);
  const panelLoading =  useSelector(state=>state.loading);
  return (
    <span>
      {panelLoading===true?(<div align="center">
               <CircularProgress color="inherit" />
            </div>):(<span>{status==="guest"?(<h2>notFound</h2>):(<UserPanel />)}</span>)}
    </span>
  )
};