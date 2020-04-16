import React, {useState, useEffect} from 'react';
import '../App.css';
import {
    AppBar, 
    Typography, 
    Toolbar,
    IconButton
  } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Login from './headerComponents/Login';
import Register from './headerComponents/Register';
import Loggedin from './headerComponents/Loggedin';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
export default function Header({setPanelState, setPanelLoading}){
  let token = localStorage.getItem('JWT');
  const [anchorEl, setAnchorEl] = useState(null);
  const [register, setRegister] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [name, setName] = useState('');
  const handleClickOpenReg= () => {
    setRegister(true);
  };
    const reload = async() =>{
      if(token!==null){
        var req = await fetch('http://localhost:8000/findUser', {
          method: 'GET',
          headers: {
            Authorization: `JWT ${token}`
          }
       });
    var response = await req.json();
    setLoggedin(response.auth);
    setName(response.name.split("%")[0]+" "+response.name.split("%")[1]);

    if(response.status==='member'){
      setPanelState(1);
      setLoggedin(true);
      }else if(response.status==='admin'){
      setPanelState(2);
      setLoggedin(true);
      }else{
      setPanelState(0);
      setLoggedin(false);
          }
      setPanelLoading(false);
      }
    }
    useEffect(()=>{
      reload()
      }, []);
  const registerProps = {register, setRegister};
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const loginProps = {setPanelState, handleClose, handleClick, anchorEl, handleClickOpenReg, setLoggedin, loggedin, name, setName};
  return (
<ThemeProvider theme={theme}>
<AppBar position="static" color='primary'>
  <Toolbar>
    <Typography variant="h4" style={{flexGrow: 1}}>
      ONLINE-MARKETPLACE
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
                <AccountCircle />
        </IconButton>
  </Toolbar>
</AppBar>
</ThemeProvider>
  );
}

