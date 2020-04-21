import React from 'react';
import '../../App.css';
import{
    MenuItem,
    Menu,
    Typography,
    Link
} from '@material-ui/core';
import { logOut } from '../../redux/actions/logOut';
import {useDispatch, useSelector} from 'react-redux';

export default function Loggedin({loginProps}){
    const name =  useSelector(state=>state.name);
    const dispatch = useDispatch();
    const{handleClose, anchorEl} = loginProps;
    const logout = () => {
    localStorage.removeItem('JWT');
    dispatch(logOut());
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
    <MenuItem ><Link color='textPrimary' href="/panel" underline="none">პროფილი</Link></MenuItem>
    <MenuItem onClick={logout}>გამოსვლა</MenuItem>
</Menu>
    )
}