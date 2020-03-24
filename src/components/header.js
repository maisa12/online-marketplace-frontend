import React from 'react';
import '../App.css';
import {
    AppBar, 
    Typography, 
    Toolbar,
    Button,
    Link
  } from '@material-ui/core';


export default function Header(){
  return (
    <AppBar position="static" style={{backgroundColor: "DarkOliveGreen"}}>
  <Toolbar>
    <Typography variant="h4" style={{flexGrow: 1}}>
      ONLINE-MARKETPLACE
    </Typography>
    <Link href="/panel" color="inherit" underline="none"><Button color="inherit">Login</Button></Link>
  </Toolbar>
</AppBar>
  );
}

