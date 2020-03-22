import React from 'react';
import '../App.css';
import {
    AppBar, 
    Typography, 
    Toolbar,
    Button,
  } from '@material-ui/core';

export default function Header(){
  return (
    <AppBar position="static" style={{backgroundColor: "DarkOliveGreen"}}>
  <Toolbar>
    <Typography variant="h4" style={{flexGrow: 1}}>
      ONLINE-MARKETPLACE
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
  );
}

