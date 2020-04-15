import React from 'react';
import '../../App.css';
import{
    MenuItem,
    Menu,
    Typography,
    Link
} from '@material-ui/core';


export default function Loggedin({loginProps}){
const{handleClose, anchorEl, setLoggedin, name, menuFunction, setPanelState} = loginProps;
const logOut = () => {
    setLoggedin(false);
    menuFunction();
    localStorage.removeItem('JWT');
    setPanelState(0);
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
    <Link href='./panel'><MenuItem>პანელში შესვლა</MenuItem></Link>
    <MenuItem onClick={logOut}>გასვლა</MenuItem>
</Menu>
    )
}