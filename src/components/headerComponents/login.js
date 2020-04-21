import React, {useState} from 'react';
import '../../App.css';
import{
    MenuItem,
    InputLabel,
    Input,
    InputAdornment,
    Menu,
    Typography
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import LockIcon from '@material-ui/icons/Lock';
import {request} from '../../redux/actions/request';
import {useDispatch} from 'react-redux';
export default function Login({loginProps}){
const dispatch = useDispatch();
const{handleClose,  anchorEl, handleClickOpenReg, setLoggedin, setName, setPanelState} = loginProps;
const [email,  setEmail] = useState('');
const [password,  setPassword] = useState('');
const [message, setMessage] = useState('');
var form = {email: email, password: password};
const  loginRequest = async() => {
  var req = await axios.post('http://localhost:8000/login', form);
    var response = await req.data;
    if(response.auth === true){
        localStorage.setItem('JWT', response.token);
        dispatch(request());
    }
    else{
      setMessage(response.message);
      setTimeout(()=>{setMessage('')}, 4000);
    }
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
            <Typography variant="button" display="block"  color="error" gutterBottom>
                {message}
              </Typography>
          
            <InputLabel htmlFor="email">მომხმარებლის ელ. ფოსტა</InputLabel>
            <Input
                id="email"
                onChange={(event)=>setEmail(event.target.value)}
                startAdornment={
              <InputAdornment position="start">
                  <AccountCircle />
              </InputAdornment>
              }
              />
              <br/>
            <InputLabel htmlFor="password">მომხმარებლის პაროლი</InputLabel>
            <Input
                type="password"
                id="password"
                onChange={(event)=>setPassword(event.target.value)}
                startAdornment={
              <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              }
              />
            <MenuItem onClick={()=>loginRequest()}>შესვლა</MenuItem>
            <MenuItem onClick={handleClickOpenReg}>რეგისტრაცია</MenuItem>
      </Menu>
    )
}