import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function NewCat({handleClose, open}) {
  const [value, setValue] = useState({name: '', position: 0, slug: ''});
  const [message, setMessage] = useState('');
  const validation = (e)=>{
    if(e==="both") {
      return setMessage('slug და პოზიცია დაკავებულია')
    }
    if(e==="position"){
      return setMessage('პოზიცია დაკავებულია')
   }
    if(e==="slug"){
      return setMessage('slug დაკავებულია')
   }
   update() 
   }
  
  const add = async()=>{
    await fetch(`http://localhost:8000/add/category`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(value)
   }).then(e=>e.text()).then(e=>validation(e)).catch((error)=>{console.log(error)}) 
 };


 const update = () => {
  handleClose();
  setValue({name: '', position: 0, slug: ''});
  setMessage('')
 }
  return (
      <Dialog open={open} onClose={update} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">კატეგორიის დამატება</DialogTitle>
        <DialogContent>
        <DialogContentText color='error'>
          {message}
          </DialogContentText>
        <TextField
              autoFocus
              margin="dense"
              label="სახელი"
              style={{width: "500px"}}
              onChange={(e)=>{
                const val = e.target.value;
                 setValue(prevState => {
                return { ...prevState, name: val}
                   })
              }}
            />
             <TextField
              margin="dense"
              label="პოზიცია"
              style={{width: "500px"}}
              onChange={(e)=>{
                const val = e.target.value;
                 setValue(prevState => {
                return { ...prevState, position: val }
                   })
              }}
            />
             <TextField
              margin="dense"
              label="Slug"
              style={{width: "500px"}}
              onChange={(e)=>{
                const val = e.target.value;
                 setValue(prevState => {
                return { ...prevState, slug: val }
                   })
              }}
            />
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