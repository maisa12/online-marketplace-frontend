import React, { useState } from 'react';
import '../App.css';
import {
    Paper, 
    Grid
  } from '@material-ui/core';
  import PanelTable from './panelComponents/table';
  import AdminNav from './panelComponents/adminNav';
  import NewAd from './panelComponents/newAd';
  import NewUser from './panelComponents/newUser';
  import NewCat from './panelComponents/newCat';

export default function Panel(){
  const [openad, setOpenAd] = React.useState(false);

  const handleClickOpenAd = () => {
    setOpenAd(true);
  };

  const handleCloseAd = () => {
    setOpenAd(false);
  };
  const [opencat, setOpenCat] = React.useState(false);

  const handleClickOpenCat = () => {
    setOpenCat(true);
  };

  const handleCloseCat = () => {
    setOpenCat(false);
  };
  const [openuser, setOpenUser] = React.useState(false);

  const handleClickOpenUser= () => {
    setOpenUser(true);
  };

  const handleCloseUser = () => {
    setOpenUser(false);
  };
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
      };
  return (
    <span>
    <Grid container spacing={1} justify="center">
        <Grid item xs={3}>
          <Paper>
              <AdminNav handleListItemClick={handleListItemClick} selectedIndex={selectedIndex} handleClickOpenAd = {handleClickOpenAd} handleClickOpenCat = {handleClickOpenCat} handleClickOpenUser = {handleClickOpenUser}/>
             
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <PanelTable selectedIndex={selectedIndex}/>
            <NewAd handleClose = {handleCloseAd} open = {openad}/>
              <NewUser handleClose = {handleCloseUser} open = {openuser}/>
              <NewCat handleClose = {handleCloseCat} open = {opencat}/>  
          </Paper>
        </Grid>
    </Grid>
    </span>
  );
}