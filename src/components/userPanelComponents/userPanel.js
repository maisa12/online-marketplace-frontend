import React, {useState, useEffect} from 'react';
import {
    Paper, 
    Grid
  } from '@material-ui/core';
import UserNav from './UserNav';
import AdsTable from './AdsTable';
import UsersInfo from './UsersInfo';
import {ads, info} from './tableContent';
import NewAd from './NewAd';
import {categories} from '../mainComponents/mainRequests';
import ChangeInfo from './changeInfo/ChangeInfo';
export default function UserPanel({panelState}){
    //state of adding ad's dialog
    const [open, setOpen] = useState(false);
    // error message state
    const [message, setMessage] = useState('');
    //categories
    const [cat, setCat] = useState([]);
    //new ad object
    const [value, setValue] = useState({name: '', description: '', picture: '', category: '', price: ''});
    //member's nav index
    const [selectedIndex, setSelectedIndex] = useState(0);
    //member's ads table columns
    const [columns, setColumns] = useState([]);
   //member's ads table rows
    const [rows, setRows] = useState([]);
    //member's info
    const [userInfo, setUserInfo] = useState({name: '', status: '', email: '', phone: ''});
    // true add button, false edit button
    const [buttonState, setButtonState] = useState(true); 
    //ads content validation
    const [nameError, setNameError] = useState(null);
    const [pictureError, setPictureError] = useState(null);
    const [descriptionError, setdescriptionError] = useState(null);
    const [priceError, setPriceError] = useState(null);
    const [array, setArray] = useState([descriptionError, nameError, pictureError, priceError]);
    //user's modified info validation
    const [phoneError, setPhoneError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [namesError, setNamesError] = useState(null);
    const [lnameError, setLnameError] = useState(null);
    const [openInfo, setOpenInfo] = useState(false);
    const [userInfoValidArray, setUserInfoValidArray] = useState([phoneError, emailError, namesError, lnameError]);
    //handlign user's info updating
    const handleOpenInfo =()=>{
        setOpenInfo(true)
    }
    const handleCloseInfo =()=>{
        setOpenInfo(false);
        setMessage('');
        info(setUserInfo);
    }
    //updating error states
    useEffect(()=>{
        setArray([descriptionError, nameError, pictureError, priceError])
    }, [descriptionError, nameError, pictureError, priceError])
    useEffect(()=>{
        setUserInfoValidArray([phoneError, emailError, namesError, lnameError])},
    [phoneError, emailError, namesError, lnameError])
    // set page
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
    //set error message
    const cantAdd = (e) =>{
        setMessage(e)
    }
    //new ad's request
    const request = async() => {
        var passed = 0;
    for(let x of array){
      if(x===false)  passed++;
      }
    if(passed===4){
        await fetch(`http://localhost:8000/newAd`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('JWT')}`
            },
            body: JSON.stringify(value)
          }).then(e=>e.text()).then(e=>e==="success"?handleClose():cantAdd(e)).catch((error)=>console.log(error))
        }
    }
  //update ad
    const update = async() => {
        var passed = 0;
        for(let x of array){
          if(x===false || x===null)  passed++;
          }
        if(passed===4){
        await fetch(`http://localhost:8000/update/${value.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('JWT')}`
            },
            body: JSON.stringify(value)
          }).then(e=>e.text())
            .then(e=>e==="success"?handleClose():cantAdd(e))
            .catch((error)=>console.log(error))
        }
    }
    //open ad's update dialog
    const adUpdate = (id) => {
        setButtonState(false);
        const item = rows.filter(x=>x.id===id);
        if(item.length!==0){
            categories(setCat);
            setValue(item[0]);
            setOpen(true);    
        }
    };
    const deleteItem = async (id) => {
     await fetch(`http://localhost:8000/deleteAd/${id}`,
    {
      method:'delete',
      headers: {
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }).then(e=>console.log('deleted')).then(()=>ads(setColumns, setRows)).catch((error)=>console.log(error))
    };
    const updateInfo = async() => {
        var passed = 0;
        for(let x of userInfoValidArray){
          if(x===false || x===null)  passed++;
          }
          if(passed === 4){
            await fetch(`http://localhost:8000/updateInfo`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `JWT ${localStorage.getItem('JWT')}`
                },
                body: JSON.stringify(userInfo)
              }).then(e=>e.text())
                .then(e=>e==="Updated"?handleCloseInfo():cantAdd(e))
                .catch((error)=>console.log(error))
          }
    }
    //new ad's dialog open
    const handleClickOpen = () =>{
        setValue({name: '', description: '', picture: '', category: '', price: ''})
        setOpen(true);  
        categories(setCat);
        setButtonState(true);
    };
    //new ad's dailog close
    const handleClose = ()  => {
        setOpen(false);
        setNameError(null);
        setPictureError(null);
        setdescriptionError(null);
        setPriceError(null);
        setMessage('');
        ads(setColumns, setRows);
    };
  
    const newAdProps = {
                            open, 
                            handleClose, 
                            message, 
                            value, 
                            setValue, 
                            buttonState, 
                            priceError, 
                            descriptionError, 
                            pictureError, 
                            nameError, 
                            cat,
                            setNameError,
                            setPictureError,
                            setdescriptionError,
                            setPriceError,
                            request,
                            update
                                            };
                                            
    const infoProps ={ 
                            message, 
                            phoneError, 
                            setPhoneError,
                            emailError, 
                            setEmailError, 
                            namesError, 
                            setNamesError, 
                            lnameError, 
                            setLnameError, 
                            userInfo, 
                            setUserInfo,
                            openInfo,
                            handleCloseInfo,
                            updateInfo
                                            };
    const content = (index) => {
        if(index===0){
            return (
                <AdsTable adsTable={adsTable} />
            )
        }
        else{
            return (
                <UsersInfo userInfo={userInfo} handleOpenInfo={handleOpenInfo}/>
                
            )
        }
    }
    useEffect(()=>{
        content(selectedIndex);
        if(selectedIndex===0){
        ads(setColumns, setRows)
        }
        if(selectedIndex===1){
        info(setUserInfo)
        }
    }, [selectedIndex]);
    const userNavProps = {panelState, handleOpenInfo, selectedIndex, handleListItemClick, handleClickOpen};
    const adsTable ={columns, rows, deleteItem, adUpdate};
    return (
        <Grid container spacing={1} style={{width: "100%"}} justify="center">
             <Grid item xs={3}>
                <Paper>
                    <UserNav userNavProps={userNavProps} />
                </Paper>
             </Grid>
             <Grid item xs={8}>
                <Paper style={{padding: "20px"}}>
                    <NewAd newAdProps = { newAdProps } />
                    <ChangeInfo infoProps = {infoProps } />
                    {content(selectedIndex)}
                </Paper>
             </Grid>
        </Grid>
    )
}