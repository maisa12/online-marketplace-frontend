import React from 'react';
import {
    Button, 
    TextField,  
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle
}from '@material-ui/core';
export default function ChangeInfo({infoProps}){
    const { 
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
                        } = infoProps;
    const phoneMessege = 'მაგ.:5********';
    const phoneValidation = (val) =>{
        const phoneEx = /^5[\d+]{8}/;
        if(phoneEx.test(val) && val.length===9){
          setPhoneError(false);
          setUserInfo(prevState => {
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
      setUserInfo(prevState => {
        return { ...prevState, email: val}
                       })
                      }
     else{
      setEmailError(true);
                      }
  }

  const nameValidation = (val) =>{
    if(val.length>=3){
      setNamesError(false);
      setUserInfo(prevState => {
        return { ...prevState, name: val+"%"+userInfo.name.split("%")[1]}
                         })
                      }
     else{
      setNamesError(true);
                      }
  }
  const lnameValidation = (val) =>{
    if(val.length>=3){
      setLnameError(false);
      setUserInfo(prevState => {
        return { ...prevState, name: userInfo.name.split("%")[0]+"%"+val}
                         })
                      }
     else{
      setLnameError(true);
                      }
  }
 

    return (
        <Dialog open={openInfo} onClose={handleCloseInfo} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">მომხმარებლის ინფორმაციის განახლება</DialogTitle>
        <DialogContent>
        <DialogContentText color='error'>
          {message}
          </DialogContentText>
          <TextField
            autoFocus
            defaultValue={userInfo.name.split("%")[0]}
            error = {namesError}
            margin="dense"
            label="სახელი"
            style={{width: "50%"}}
            required
            onChange={(e)=>nameValidation(e.target.value)}
          />
          <TextField
            error = {lnameError}
            defaultValue={userInfo.name.split("%")[1]}
            margin="dense"
            label="გვარი"
            style={{width: "50%"}}
            required
            onChange={(e)=>lnameValidation(e.target.value)}
          />
           <TextField
            error = {emailError}
            defaultValue={userInfo.email}
            margin="dense"
            label="ელ-ფოსტა"
            type="email"
            style={{width: "100%"}}
            onChange={(e)=>emailValidation(e.target.value)}
          />
           <TextField
            error = {phoneError}
            defaultValue={userInfo.phone}
            helperText = {phoneMessege}
            margin="dense"
            label="მობილურის ნომერი"
            type="tel"
            style={{width: "100%"}}
            onChange={(e)=>phoneValidation(e.target.value)}
          />
    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInfo} color="primary">
            დახურვა
          </Button>
          <Button onClick={updateInfo} color="primary">
            განახლება
          </Button>
        </DialogActions>
      </Dialog>
    )
}