import React, { useState, useEffect } from 'react';
import '../App.css';
import {
    Paper, 
    Grid
  } from '@material-ui/core';
  import PanelTable from './panelComponents/table';
  import AdminNav from './panelComponents/adminNav';
  import NewAd from './panelComponents/newAd';
  import NewUser from './panelComponents/newUser';
  import NewCat from './panelComponents/newCat';
  import Button from '@material-ui/core/Button';
  import Typography from '@material-ui/core/Typography';
  import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

export default function Panel(){
  const [openad, setOpenAd] = React.useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [adsButton, setAdsButton]=useState(true);
 

  //dialogs button
  
  const adButton = ()=>{
    if(adsButton===true){
      return(
        <Button onClick={add} color="primary">
        დამატება
      </Button>
      )
    }
    else{
      return(
        <Button onClick={adUp} color="primary">
        რედაქტირება
      </Button>
      )
    }
    }
 
  //ads object
  const [addAd, setAddAd] =useState({name: '', category: '', author: '', description: '', picture:'', active: 'false', price: ''});
 //update request
const adUp = async()=>{
 
  await fetch(`http://localhost:8000/update/ads/${addAd.id}`,{
    method: 'put',
     headers: {
      'Content-type': 'application/json; charset=UTF-8'
     },
     body: JSON.stringify(addAd)
  }).then((e)=>console.log(e.status))
  handleCloseAd();
}
  //ads update
const adUpdate = async(id) =>{
  setAdsButton(false)
  const item = rows.filter(x=>x.id===id);
  categories();
  authors();
  adButton();
  setAddAd(item[0]);
  setOpenAd(true);
}

//author ads
const dialogAut = ()=>{
  if(adsButton===true){
  return(
    <FormControl variant="filled" style={{width: "50%"}}>
    <InputLabel id="demo-simple-select-filled-label">ავტორი</InputLabel>
    <Select
      labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled"
        value={addAd.author}
        onChange={handleChangeAuthor}
        required
    >
  {aut.map(x=>(<MenuItem value={x.id} key={x.id}>{x.name_lastname.split("%")[0]+" "+x.name_lastname.split("%")[1]}</MenuItem>))}
    </Select>
  </FormControl>
  )
  }
  else{
    return(
      <Typography variant="button" display="inline" style={{textAlign: "center"}} >
       ავტორი:{addAd.author}
    </Typography>
    )
  }
}
  //ads validation
 const [nameError, setNameError] = useState(null);
 const [pictureError, setPictureError] = useState(null);
 const [descriptionError, setdescriptionError] = useState(null);
 const [priceError, setPriceError] = useState(null);
 const [message, setMessage] = useState('');
 const adProps ={dialogAut, adButton, nameError, setNameError, pictureError, setPictureError, descriptionError, setdescriptionError, priceError, setPriceError, message}
//
//author
const handleChangeAuthor = event => {
  setAddAd(prevState => {
    return { ...prevState, author: event.target.value}
                   })
                  }
//

  const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
      };
  //categories request
  const [val, setVal] = useState([])
  const categories = async()=>{
    const request = await fetch(`http://localhost:8000/category`)
    const array = await request.json();
    setVal(array);
   };
   //add post request
  
   const cantAdd = () =>{
    return setMessage("ვერ მოხდა განცხადების დამატება")
  }
   const add = async()=>{
    var count = 0;
    const array = [descriptionError, nameError, pictureError, priceError];
    for(let x of array){
      if(x===false) count++;
      }
    if(count===4){
    await fetch(`http://localhost:8000/add/ad`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(addAd)
   }).then(e=>e.text()).then(e=>e==="true"?handleCloseAd():cantAdd()).catch((error)=>{console.log(error)})
    
  }
 }

   // author
  const [aut, setAut] = useState([]);
  const authors = async()=>{
    const request = await fetch(`http://localhost:8000/authors`)
    const array = await request.json();
    setAut(array);
   };
  //Admin nav
  useEffect(()=>{
    if(selectedIndex===0)user();
    if(selectedIndex===2)category();
    if(selectedIndex===1)ads();
  },[selectedIndex]);
//user table request
async function user(){
  setColumns([{ id: 'name', label: 'სახელი/გვარი', minWidth: '20%' },
  { id: 'number', label: 'მობილურის ნომერი', minWidth: '25%' },
  {
    id: 'email',
    label: 'ელ-ფოსტა',
    minWidth: '35%',
  },
  {
    id: 'status',
    label: 'სტატუსი',
    minWidth: '20%',
    align: 'right'
  },
  {
      id: 'edition',
      label: 'რედაქტირება',
      minWidth: '20%',
      align: 'right',
    }]);
    const request = await fetch(`http://localhost:8000/users`);
    const userArray = await request.json();
    userArray.forEach(x=>x.name=x.name.split("%")[0]+" "+x.name.split("%")[1]);
    setRows(userArray);
}
//category table request
async function  category(){
  setColumns([
    { id: 'name', label: 'კატეგორია', minWidth: '20%' },
    { id: 'slug', label: 'Slug', minWidth: '25%' },
    { id: 'position', label: 'პოზიცია', minWidth: '25%' },
    {
      id: 'edition',
      label: 'რედაქტირება',
      minWidth: '30%',
      align: 'right',
    }
  ]);
  const request = await fetch(`http://localhost:8000/categories`);
  const array = await request.json();
  setRows(array)
}
//Ads table request
async function ads(){
  setColumns([
    { id: 'name', label: 'განცხადება', minWidth: '20%' },
    { id: 'active', label: 'სტატუსი', minWidth: '20%' },
    {
      id: 'author',
      label: 'ავტორი',
      minWidth: '20%',
    },
    {
      id: 'category',
      label: 'კატეგორია',
      minWidth: '20%',
      align: 'right'
    },
    {
        id: 'edition',
        label: 'რედაქტირება',
        minWidth: '20%',
        align: 'right',
      }
  ]);
  const request = await fetch(`http://localhost:8000/ads`);
  const adsArray = await request.json();
  adsArray.forEach(x=>x.author=x['users.author'].split("%")[0]+" "+x['users.author'].split("%")[1]);
  setRows(adsArray)
}

  const handleClickOpenAd = () => {
    setOpenAd(true);
    categories();
    authors();
    setAdsButton(true);
    adButton();
  };
  
  const handleCloseAd = () => {
    setOpenAd(false);
    ads();
    setNameError(null);
    setPictureError(null);
    setdescriptionError(null);
    setPriceError(null);
    setMessage('');
    setAddAd({name: '', category: 'other', author: '', description: '', picture:'', active: 'false', price:''});
  };

  const [opencat, setOpenCat] = useState(false);

  const handleClickOpenCat = () => {
    setOpenCat(true);
  };

  const handleCloseCat = () => {
    setOpenCat(false);
    category();
  };
  const [openuser, setOpenUser] = useState(false);

  const handleClickOpenUser= () => {
    setOpenUser(true);
  };

  const handleCloseUser = () => {
    setOpenUser(false);
    user();
  };
  
  return (
    <span>
    <Grid container spacing={1} justify="center">
        <Grid item xs={3}>
          <Paper>
              <AdminNav handleListItemClick={handleListItemClick} selectedIndex={selectedIndex} handleClickOpenAd = {handleClickOpenAd} handleClickOpenCat = {handleClickOpenCat} handleClickOpenUser = {handleClickOpenUser}/>  
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <PanelTable selectedIndex={selectedIndex} rows={rows} columns={columns} adUpdate={adUpdate}/>
            <NewAd handleClose = {handleCloseAd} adProps={adProps} open = {openad} value={addAd} setValue={setAddAd} val={val} aut={aut}/>
              <NewUser handleClose = {handleCloseUser} open = {openuser}/>
              <NewCat handleClose = {handleCloseCat} open = {opencat}/>  
          </Paper>
        </Grid>
    </Grid>
    </span>
  );
}