import React, {useState, useEffect} from 'react';
import '../App.css';
import {
    AppBar, 
    Typography, 
    Toolbar,
    IconButton,
    Link
  } from '@material-ui/core';
import {request} from '../redux/actions/request';
import {useDispatch} from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Login from './headerComponents/Login';
import Register from './headerComponents/Register';
import Loggedin from './headerComponents/Loggedin';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector} from 'react-redux';
export default function Header(){
  const loggedin =  useSelector(state=>state.loggedIn);
  const panelLoading =  useSelector(state=>state.loading);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [register, setRegister] = useState(false);
  const handleClickOpenReg= () => {
    setRegister(true);
  };
    useEffect(()=>{
      dispatch(request());
      }, []);
  const registerProps = {register, setRegister};
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const loginProps = {
                        handleClose, 
                        handleClick, 
                        anchorEl, 
                        handleClickOpenReg
                      };
  return (

<AppBar position="static" color='primary'>
  <Toolbar>

    <Typography variant="h4" style={{flexGrow: 1}}>
    <Link color="inherit"  href="/" underline="none">
      ONLINE-MARKETPLACE
      </Link>
    </Typography>
  
    
        {loggedin===true?(<Loggedin loginProps={loginProps}/>):(<Login loginProps={loginProps}/>)}
        <Register registerProps={registerProps}/>
      <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                {panelLoading===false?(<span>{loggedin===true?(<AccountCircle />):(<ExitToAppIcon/>)}</span>):(<div align="center">
               <CircularProgress color="inherit" />
            </div>)}  
        </IconButton>
  </Toolbar>
</AppBar>

  );
}

