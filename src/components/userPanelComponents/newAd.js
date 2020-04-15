import React from 'react';
import AddButton from './Button';
import {
    Button, 
    TextField,  
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Select, 
    FormControl, 
    MenuItem, 
    InputLabel
}from '@material-ui/core';
export default function NewAd({newAdProps}){

const {
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
            }  = newAdProps;
    
const handleChangeCategory = event => {
        setValue(prevState => {
          return { ...prevState, category: event.target.value}
                         });
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
          {cat.map(x=>(<MenuItem value={x.slug} key={x.id}>{x.name}</MenuItem>))}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            დახურვა
          </Button>
          {AddButton(buttonState, request, update)}
        </DialogActions>
      </Dialog>
    )
}