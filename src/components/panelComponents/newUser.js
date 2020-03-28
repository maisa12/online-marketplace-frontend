import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function NewUser({ open, usersProps, adsButton }){
  const phoneMessege = 'მაგ.:5********';
  const  {add, edit, adButton, value, setValue, handleClose, message, phoneError, setPhoneError, emailError, setEmailError, pasError, setPasError, passError, setPassError, namesError, setNamesError, lnameError, setLnameError} = usersProps; 
  const handleChange = event => {
    setValue(prevState => {
      return { ...prevState, status: event.target.value}
                     })
  };

  const phoneValidation = (val) =>{
      const phoneEx = /^5[\d+]{8}/;
      if(phoneEx.test(val) && val.length===9){
        setPhoneError(false);
         setValue(prevState => {
          return { ...prevState, phoneNumber: val}
                         })
                        }
       else{
        setPhoneError(true);
                        }
}
const emailValidation = (val) =>{
  const emailEx = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  if(emailEx.test(val)){
    setEmailError(false);
     setValue(prevState => {
      return { ...prevState, email: val}
                     })
                    }
   else{
    setEmailError(true);
                    }
}
const pasValidation = (val) =>{
  const pasEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    
  if(pasEx.test(val)){
    setPasError(false);
    setValue(prevState => {
    return { ...prevState, password: val}
                     })
                    }
   else{
    setPasError(true);
                    }
}
const passValidation = (val) =>{
  if(val===value.password){
    setPassError(false);
                    }
   else{
    setPassError(true);
                    }
}
const nameValidation = (val) =>{
  if(val.length>=3){
    setNamesError(false);
    setValue(prevState => {
      return { ...prevState, name: val}
                       })
                    }
   else{
    setNamesError(true);
                    }
}
const lnameValidation = (val) =>{
  if(val.length>=3){
    setLnameError(false);
    setValue(prevState => {
      return { ...prevState, lastname: val}
                       })
                    }
   else{
    setLnameError(true);
                    }
}
  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">მომხმარებლის დამატება</DialogTitle>
        <DialogContent>
        <DialogContentText color='error'>
          {message}
          </DialogContentText>
          <TextField
            autoFocus
            defaultValue={value.name}
            error = {namesError}
            margin="dense"
            label="სახელი"
            style={{width: "50%"}}
            required
            onChange={(e)=>nameValidation(e.target.value)}
          />
          <TextField
            error = {lnameError}
            defaultValue={value.lastname}
            margin="dense"
            label="გვარი"
            style={{width: "50%"}}
            required
            onChange={(e)=>lnameValidation(e.target.value)}
          />
           <TextField
            error = {emailError}
            defaultValue={value.email}
            margin="dense"
            label="ელ-ფოსტა"
            type="email"
            style={{width: "100%"}}
            onChange={(e)=>emailValidation(e.target.value)}
          />
           <TextField
            error = {phoneError}
            defaultValue={value.phoneNumber}
            helperText = {phoneMessege}
            margin="dense"
            label="მობილურის ნომერი"
            type="tel"
            style={{width: "100%"}}
            onChange={(e)=>phoneValidation(e.target.value)}
          />
      <FormControl variant="filled" style={{width: "100%"}}>
        <InputLabel id="demo-simple-select-filled-label">სტატუსი</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value.status}
          onChange={handleChange}
          required
        >
          
          <MenuItem value="member">member</MenuItem>
          <MenuItem value="admin">admin</MenuItem>
        </Select>
      </FormControl>
          <TextField
            error = {pasError}
            margin="dense"
            label="პაროლი"
            type="password"
            style={{width: "100%"}}
            onChange={(e)=>pasValidation(e.target.value)}
          />
           <TextField
            error = {passError}
            margin="dense"
            label="გაიმეორეთ პაროლი"
            type="password"
            style={{width: "100%"}}
            onChange={(e)=>passValidation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            დახურვა
          </Button>
          {adButton(adsButton, add, edit)}
        </DialogActions>
      </Dialog>
  );
  }