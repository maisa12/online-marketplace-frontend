import React from 'react';
import '../../App.css';
import{
    MenuItem,
    Menu,
    Typography
} from '@material-ui/core';

export default function Loggedin({loginProps}){
 
const{handleClose, anchorEl, setLoggedin, name, menuFunction, setPageState, setPanelState} = loginProps;
const logOut = () => {
    setLoggedin(false);
    menuFunction();
    localStorage.removeItem('JWT');
    setPageState('home');//return home page
    setPanelState(0); //set default status of guest
}
const goPanel = () =>{
    setPageState('panel');
    handleClose();
}
    return(
<Menu
        style={{padding: "20px"}}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      > 
    <Typography  variant="button" style={{flexGrow: 1}}>
      {name}
    </Typography>
    <MenuItem onClick={goPanel}>პანელში შესვლა</MenuItem>
    <MenuItem onClick={logOut}>გასვლა</MenuItem>
</Menu>
    )
}