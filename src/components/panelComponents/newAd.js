import React from 'react';
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

export default function NewAd({handleClose, adProps, value, setValue, val, aut, open}) {
 const {dialogAut, adButton, nameError, setNameError, pictureError, setPictureError, descriptionError, setdescriptionError, priceError, setPriceError, message}= adProps;
  const handleChangeCategory = event => {
    setValue(prevState => {
      return { ...prevState, category: event.target.value}
                     });
  };
  const handleChangeActive = event => {
    setValue(prevState => {
      return { ...prevState, active: event.target.value}
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">განცხადების დამატება</DialogTitle>
        <DialogContent>
          <DialogContentText color='error'>
            {message}
          </DialogContentText>
          <TextField
            autoFocus
            defaultValue={value.name}
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
          {val.map(x=>(<MenuItem value={x.name} key={x.id}>{x.name}</MenuItem>))}
        </Select>
      </FormControl>
          <TextField
            defaultValue={value.description}
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
          defaultValue={value.price}
           error = {priceError}
            margin="dense"
            label="ფასი"
            style={{width: "100%"}}
            required
            type="text"
            onChange={(e)=>priceValidation(e.target.value)}
          />
          <TextField
            defaultValue={value.picture}
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
     {dialogAut()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            დახურვა
          </Button>
          {adButton()}
        </DialogActions>
      </Dialog>
  );
}