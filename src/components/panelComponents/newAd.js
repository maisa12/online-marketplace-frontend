import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

export default function NewAd({handleClose, open, val, aut}) {
  const [nameError, setNameError] = useState(null);
  const [pictureError, setPictureError] = useState(null);
  const [descriptionError, setdescriptionError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [message, setMessage] = useState('');
  const [value, setValue] = useState({name: '', category: 'other', author: '', description: '', picture:'', active: 'false', price: '0'});
  const update = ()=>{
    setNameError(null);
    setPictureError(null);
    setdescriptionError(null);
    setPriceError(null);
    handleClose();
    setMessage('');
    setValue({name: '', category: 'other', author: '', description: '', picture:'', active: 'false', price:''});
   }
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
      console.log(count)
    await fetch(`http://localhost:8000/add/ad`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(value)
   }).then(e=>e.text()).then(e=>e==="true"?update():cantAdd()).catch((error)=>{console.log(error)})
    
  }
 }
  const handleChangeCategory = event => {
    setValue(prevState => {
      return { ...prevState, category: event.target.value}
                     })
  };
  const handleChangeActive = event => {
    setValue(prevState => {
      return { ...prevState, active: event.target.value}
                     })
  };
  const handleChangeAuthor = event => {
    setValue(prevState => {
      return { ...prevState, author: event.target.value}
                     })
  };
  const priceValidation = val => {
    const priceRegEx = /\d{1,}\.{1}\d{2}$/
         if(priceRegEx.test(val)){
          setPriceError(false)
          setValue(prevState => {
            return { ...prevState, price: val}
                             })
                          }
         else{
          setPriceError(true)
         };
  }
  const nameValidation = (val) =>{
    if(val.length>=1){
      setNameError(false);
      setValue(prevState => {
        return { ...prevState, name: val}
                         })
                      }
     else{
      setNameError(true);
                      }
  }
  const descriptionValidation = (val) =>{
    if(val.length>=5){
      setdescriptionError(false);
      setValue(prevState => {
        return { ...prevState, description: val}
                         })
                      }
     else{
      setdescriptionError(true);
                      }
  }
  const pictureValidation = (val) =>{
    if(val.length>=5){
      setPictureError(false);
      setValue(prevState => {
        return { ...prevState, picture: val}
                         })
                      }
     else{
      setPictureError(true);
                      }
  }
  return (
      <Dialog open={open} onClose={update} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">განცხადების დამატება</DialogTitle>
        <DialogContent>
          <DialogContentText color='error'>
            {message}
          </DialogContentText>
          <TextField
            autoFocus
            error = {nameError}
            margin="dense"
            label="სახელი"
            style={{width: "100%"}}
            required
            type="text"
            onChange={(e)=>nameValidation(e.target.value)}
          />
          
        <FormControl variant="filled" style={{width: "100%"}}>
        <InputLabel id="demo-simple-select-filled-label">კატეგორია</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
            value={value.category}
            onChange={handleChangeCategory}
            required
        >
          <MenuItem value="other">სხვა</MenuItem>
          {val.map(x=>(<MenuItem value={x.slug} key={x.id}>{x.name}</MenuItem>))}
        </Select>
      </FormControl>
           
          <TextField
            multiline
            rows="3"
            error = {descriptionError}
            margin="dense"
            label="აღწერა"
            style={{width: "100%"}}
            required
            type="text"
            onChange={(e)=>descriptionValidation(e.target.value)}
          />
          <TextField
           error = {priceError}
            margin="dense"
            label="ფასი"
            style={{width: "100%"}}
            required
            type="text"
            onChange={(e)=>priceValidation(e.target.value)}
          />
          <TextField
            error = {pictureError}
            margin="dense"
            label="სურათი"
            style={{width: "100%"}}
            required
            type="url"
            onChange={(e)=>pictureValidation(e.target.value)}
          />


        <FormControl variant="filled" style={{width: "50%"}}>
        <InputLabel id="demo-simple-select-filled-label">სტატუსი</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value.active}
          onChange={handleChangeActive}
          required
        >
          <MenuItem value="false">ინაქტივირებული</MenuItem>
          <MenuItem value="true">აქტიური</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" style={{width: "50%"}}>
        <InputLabel id="demo-simple-select-filled-label">ავტორი</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
            value={value.author}
            onChange={handleChangeAuthor}
            required
        >
      {aut.map(x=>(<MenuItem value={x.id} key={x.id}>{x.name_lastname.split("%")[0]+" "+x.name_lastname.split("%")[1]}</MenuItem>))}
        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={update} color="primary">
            დახურვა
          </Button>
          <Button onClick={add} color="primary">
            დამატება
          </Button>
        </DialogActions>
      </Dialog>
  );
}