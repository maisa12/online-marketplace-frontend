import React, {useState} from 'react';
import '../../App.css';
import{
    MenuItem,
    InputLabel,
    Input,
    InputAdornment,
    Menu
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
export default function Login({loginProps}){
 
const{handleClose,  anchorEl, handleClickOpenReg, setLoggedin, setName, menuFunction, setPanelState} = loginProps;
const [email,  setEmail] = useState('');
const [password,  setPassword] = useState('');

var form = {email: email, password: password};
const  loginRequest = async() => {
  var req = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(form)
    });
    var response = await req.json();
    if(response.auth === true){
        setLoggedin(true);
        setName(response.name.split("%")[0]+" "+response.name.split("%")[1]);
        menuFunction();
        localStorage.setItem('JWT', response.token);
        if(response.status==="admin"){
          setPanelState(2); //set admin status
        }
        if(response.status==="member"){
          setPanelState(1); //set member status
        }
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