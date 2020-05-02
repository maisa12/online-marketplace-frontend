import React, {useState, useEffect} from 'react';
import '../App.css';
import {
    AppBar, 
    Typography, 
    Toolbar,
    IconButton,
    OutlinedInput,
    InputAdornment
  } from '@material-ui/core';
import {request} from '../redux/actions/request';
import {useDispatch} from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import Login from './headerComponents/Login';
import Register from './headerComponents/Register';
import Loggedin from './headerComponents/Loggedin';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
export default function Header(){
  const loggedin =  useSelector(state=>state.loggedIn);
  const panelLoading =  useSelector(state=>state.loading);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [register, setRegister] = useState(false);
  const [search, setSearch] = useState('');
  let query = queryString.stringify({postName: search, pageNumber: 1});
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
   
    <Typography component ={Link} variant="h4" to="/" color='inherit' style={{textDecoration: 'none'}}>
      ONLINE-MARKETPLACE
    </Typography>
   
    <div style={{flexGrow: 1, position: "relative", marginLeft: "3%"}}>
    <OutlinedInput
            style={{backgroundColor: "WhiteSmoke", borderRadius: "5px", height: "33px", paddingRight: "0px"}}
            id="filled-adornment-weight"
            placeholder="ძიება..."
            value={search}
            color="secondary"
            onChange={(e)=>setSearch(e.target.value)}
            endAdornment={
            <InputAdornment position="end" >
                  <Link to={`/posts/${query}`}>
                    <SearchIcon style={{marginRight: "4px", marginTop: "4px"}} color="primary" onClick={()=>setSearch('')}  />  
                  </Link>
            </InputAdornment>}
            aria-describedby="search-input"
          />
        
       
     </div>
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