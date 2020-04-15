import React, { useState, useEffect } from 'react';
import '../../App.css';
import {
    Paper, 
    Grid
  } from '@material-ui/core';
  import PanelTable from './Table';
  import AdminNav from './AdminNav';
  import NewAd from './NewAd';
  import NewUser from './NewUser';
  import NewCat from './NewCat';
  import {ads, category, user} from './TableContent';
  import {adButton} from './AdButton';
  import {categories} from '../mainComponents/mainRequests';

export default function AdminPanel(){
  const [openad, setOpenAd] = useState(false);
  const [message, setMessage] = useState('');
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [button, setButton]=useState(true);
  const [count, setCount]=useState(0);
  const [endpoint, setEndpoint]=useState('user');
  const [array, setArray]=useState([])
  //value object
  const [value, setValue] =useState({name: '', lastname: '', email: '', status: 'member', phoneNumber:'', password: ''});
 //update request
const edit = async()=>{
  var passed = 0;
  for(let x of array){
    if(x===false || x===null)  passed++;
    }
  if(passed===count){
  await fetch(`http://localhost:8000/update/${endpoint}/${value.id}`,{
    method: 'put',
     headers: {
      'Content-type': 'application/json; charset=UTF-8',
        Authorization: `JWT ${localStorage.getItem('JWT')}`
     },
     body: JSON.stringify(value)
  })
    .then(e=>e.text())
    .then(e=>e==="success"?handleClose():cantAdd(e))
    .catch((error)=>{console.log(error)})
  }
}
  //add update
const adUpdate = async(id) =>{
  setButton(false)
  const item = rows.filter(x=>x.id===id);
  if(selectedIndex===1){
  setValue(item[0]);
  categories(setVal);
  authors();
  setOpenAd(true);
  }
  if(selectedIndex===2){
    setValue(item[0]);
    setOpenCat(true);
  }
  if(selectedIndex===0){
    setValue({id:item[0].id, name: item[0].name.split(" ")[0], lastname: item[0].name.split(" ")[1], email: item[0].email, status: item[0].status, phoneNumber: item[0].number, password: ''})
    setOpenUser(true);
  }
}
//users validation
const [phoneError, setPhoneError] = useState(null);
const [emailError, setEmailError] = useState(null);
const [pasError, setPasError] = useState(null);
const [passError, setPassError] = useState(null);
const [namesError, setNamesError] = useState(null);
const [lnameError, setLnameError] = useState(null);
 //ads validation
 const [nameError, setNameError] = useState(null);
 const [pictureError, setPictureError] = useState(null);
 const [descriptionError, setdescriptionError] = useState(null);
 const [priceError, setPriceError] = useState(null);

 //
 useEffect(()=>{
  if(selectedIndex===0){
    user(setColumns, setRows);
    setEndpoint('user');
    setCount(6); 
    
  }
  if(selectedIndex===2){
    category(setColumns, setRows);
    setEndpoint('category');
    setCount(0);
  }
  if(selectedIndex===1){
    ads(setColumns, setRows);
    setEndpoint('ad')
    setCount(4);
    
  }
},[selectedIndex]);
useEffect(()=>{ 
  if(selectedIndex===1){
  setArray([descriptionError, nameError, pictureError, priceError]);
}
if(selectedIndex===0){
  setArray([phoneError, emailError, pasError, passError, namesError, lnameError])
}
if(selectedIndex===2){
  setArray([]);
}
}, 
[phoneError, emailError, pasError, passError, namesError, lnameError, selectedIndex, descriptionError, nameError, pictureError, priceError])


 const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
      };
  //categories request
  const [val, setVal] = useState([])
  
   //message
   const cantAdd = (e) =>{
    return setMessage(e)
  }
   const add = async()=>{
    var passed = 0;
    for(let x of array){
      if(x===false)  passed++;
      }
    if(passed===count){
    await fetch(`http://localhost:8000/add/${endpoint}`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Authorization: `JWT ${localStorage.getItem('JWT')}`
     },
     body: JSON.stringify(value)
   })
    .then(e=>e.text())
    .then(e=>e==="success"?handleClose():cantAdd(e))
    .catch((error)=>{console.log(error)})
  }
 }
   // author
  const [aut, setAut] = useState([]);
  const authors = async()=>{
    const request = await fetch(`http://localhost:8000/authors`,
    {
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
   })
    const array = await request.json();
    setAut(array);
   };
  //
  const handleClickOpenAd = () => {
    setValue({name: '', category: 'other', author: '', description: '', picture:'', active: 'false', price:''});
    setOpenAd(true);
    categories(setVal);
    authors();
    setButton(true);
    adButton(button, add, edit);
  };
  const [opencat, setOpenCat] = useState(false);
  const handleClickOpenCat = () => {
    setValue({name: '', position: 0, slug: ''});
    setOpenCat(true);
    setButton(true);
  };
  const [openuser, setOpenUser] = useState(false);
  const handleClickOpenUser= () => {
    setValue({name: '', lastname: '', email: '', status: 'member', phoneNumber:'', password: ''})
    setOpenUser(true);
    setButton(true);
  };
  const handleClose= () => {
    if(selectedIndex===1){
        setOpenAd(false);
        ads(setColumns, setRows);
        setNameError(null);
        setPictureError(null);
        setdescriptionError(null);
        setPriceError(null);
        setMessage('');
        }
    if(selectedIndex===2){
        setOpenCat(false);
        category(setColumns, setRows);
        setMessage('');
    }
    if(selectedIndex===0){
      setPhoneError(null);
      setEmailError(null);
      setPasError(null);
      setPassError(null);
      setNamesError(null);
      setLnameError(null);
      setOpenUser(false);
      user(setColumns, setRows);
      setMessage('');
    }
  };
  //delete from table
  async function deleteItem(id){
    await fetch(`http://localhost:8000/delete/${endpoint}/${
      id}`,
    {
      method:'delete',
      headers: {
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }).then(e=>console.log('deleted')).then(()=>handleClose()).catch((error)=>{console.log(error)})
  }
  
const usersProps = {add, edit, adButton, value, setValue, handleClose, message, phoneError, setPhoneError, emailError, setEmailError, pasError, setPasError, passError, setPassError, namesError, setNamesError, lnameError, setLnameError}; 
const adProps ={edit, add, value, setValue, val, aut, handleClose, adButton, nameError, setNameError, pictureError, setPictureError, descriptionError, setdescriptionError, priceError, setPriceError, message};
  return (
    <span>
    <Grid container spacing={1} justify="center" style={{width: "100%"}}>
        <Grid item xs={3}>
          <Paper>
              <AdminNav handleListItemClick={handleListItemClick} selectedIndex={selectedIndex} handleClickOpenAd = {handleClickOpenAd} handleClickOpenCat = {handleClickOpenCat} handleClickOpenUser = {handleClickOpenUser}/>  
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <PanelTable selectedIndex={selectedIndex} rows={rows} columns={columns} adUpdate={adUpdate} deleteItem={deleteItem}/>
            <NewAd  adsButton={button} adProps={adProps} open = {openad} />
              <NewUser  open = {openuser} adsButton={button} usersProps={usersProps}  />
              <NewCat handleClose = {handleClose} open = {opencat} message={message} catButton={button} edit={edit} setValue={setValue} add={add} value={value} adButton={adButton}/>  
          </Paper>
        </Grid>
    </Grid>
    </span>
  );
}