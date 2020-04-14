import React, {useState, useEffect} from 'react';
import {
    Button, 
    TextField,  
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle
}from '@material-ui/core';
export default function ChangePassword({handleClosePass, openPass}){
    const [pasError, setPasError] = useState(null);
    const [passError, setPassError] = useState(null);
    const [oldPassError, setOldPassError] = useState(null);
    const [message, setMessage] = useState('');
    const [errorArray, setErrorArray] = useState([pasError, passError, oldPassError]);
    const [pasObject, setPasObject] =useState({oldPassword: '', newPassword:''})
    useEffect(()=>{
        setErrorArray([pasError, passError, oldPassError])
    }, [pasError, passError, oldPassError]);
    const cantAdd = (val) => {
        setMessage(val);
        setTimeout(()=>{setMessage('')}, 4000);
    }
    const oldpas = (val) =>{
        const pasEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if(pasEx.test(val)){
        setOldPassError(false);
        setPasObject(prevState => {
          return { ...prevState, oldPassword: val}
                           })
                          }
         else{
        setOldPassError(true);
                          }
    }
    const pasValidation = (val) =>{
        const pasEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
          
        if(pasEx.test(val)){
          setPasError(false);
          setPasObject(prevState => {
          return { ...prevState, newPassword: val}
                           })
                          }
         else{
          setPasError(true);
                          }
      }
      const passValidation = (val) =>{
        if(val===pasObject.newPassword){
          setPassError(false);
                          }
         else{
          setPassError(true);
                          }
      }
      //update password request
      const updatePassword = async() => {
        var passed = 0;
        for(let x of errorArray){
          if(x===false)  passed++;
          }
        if(passed===3){
        await fetch(`http://localhost:8000/updatePass`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('JWT')}`
            },
            body: JSON.stringify(pasObject)
          }).then(e=>e.text())
            .then(e=>e==="Updated"?handleClosePass():cantAdd(e))
            .catch((error)=>console.log(error))
        }
      }
    return(
        <Dialog open={openPass} onClose={handleClosePass} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">პაროლის შეცვლა</DialogTitle>
        <DialogContent>
        <DialogContentText color='error'>
          {message}
          </DialogContentText>
          <TextField
            error = {oldPassError}
            margin="dense"
            label="ძველი პაროლი"
            type="password"
            style={{width: "100%"}}
            onChange={(e)=>oldpas(e.target.value)}
          />
            <TextField
            error = {pasError}
            margin="dense"
            label="ახალი პაროლი"
            type="password"
            style={{width: "100%"}}
            onChange={(e)=>pasValidation(e.target.value)}
          />
            <TextField
            error = {passError}
            margin="dense"
            label="გაიმეორეთ ახალი პაროლი"
            type="password"
            style={{width: "100%"}}
            onChange={(e)=>passValidation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePass} color="primary">
            დახურვა
          </Button>
          <Button onClick={updatePassword} color="primary">
            განახლება
          </Button>
        </DialogActions>
      </Dialog>
    )
}