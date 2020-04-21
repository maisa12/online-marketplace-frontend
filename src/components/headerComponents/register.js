import React, {useState, useEffect}  from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import DialogContentText from '@material-ui/core/DialogContentText';
export default function Register({registerProps}){
    const [value, setValue] = useState({name: '', lastname: '', email: '',  phoneNumber:'', password: ''});
    const [phoneError, setPhoneError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [pasError, setPasError] = useState(null);
    const [passError, setPassError] = useState(null);
    const [namesError, setNamesError] = useState(null);
    const [lnameError, setLnameError] = useState(null);
    const [disable, setDisable] = useState(true);
    const [message, setMessage] = useState('');
    const [firstPasswordField, setFirstPasswordField] = useState('');
    const phoneMessege = 'მაგ.:5********';
    
   const {register, setRegister} = registerProps;
  
  const handleClose = () => {
    setPhoneError(null);
    setEmailError(null);
    setPasError(null);
    setPassError(null);
    setNamesError(null);
    setLnameError(null);
    setRegister(false);
    setMessage('');
    setDisable(true);
    setValue({name: '', lastname: '', email: '',  phoneNumber:'', password: ''})
  };
 
useEffect(()=>{
    var count = 0;
    var validation = [phoneError, emailError, pasError, passError, namesError, lnameError];
    for(let item of validation){
        if(item===false){
           count++;
        } 
    };
    if(count===6){
        setDisable(false);
    }
    else{
      setDisable(true);
    } 
},[phoneError, emailError, pasError, passError, namesError, lnameError]);
const registerRequest = async() => {
    var request = await axios('http://localhost:8000/register', value);
    var response = await request.data;
    if(response.register===true){
        handleClose();
    }
    else{
        setMessage(response.message)
    }
}
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
  const emailEx = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
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
    setFirstPasswordField(val);
    if(val!==value.password){
      setPassError(true);
    } else{
      setPassError(false);
    }
                    }
   else{
    setPasError(true);
                    }
}
const passValidation = (val) =>{
  if(val===firstPasswordField){
    setPassError(false);
    setValue(prevState => {
      return { ...prevState, password: val}
                       })
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
  <Dialog open={register} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">მომხმარებლის რეგისტრაცია</DialogTitle>
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
          <Button onClick={registerRequest} disabled={disable} color="primary">
           რეგისტრაცია
          </Button>
      </DialogActions>
  </Dialog>
);
}