import React from 'react';
import '../App.css';
import AdminPanel from './adminPanelComponents/AdminPanel';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector} from 'react-redux';
export default function Admin(){
  const status = useSelector(state=>state.status);
  const panelLoading = useSelector(state=>state.loading);
  return (
    <span>
      {panelLoading===true?(<div align="center">
               <CircularProgress color="inherit" />
            </div>):(<span>{status==="admin"?(<AdminPanel/>):<h2>notFound</h2>}</span>)}
     
    </span>
  )
};