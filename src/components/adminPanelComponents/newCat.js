import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function NewCat({handleClose, open, message, setValue, add, edit, adButton, catButton, value}) {
  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">კატეგორიის დამატება</DialogTitle>
        <DialogContent>
        <DialogContentText color='error'>
          {message}
          </DialogContentText>
        <TextField
              autoFocus
              defaultValue={value.name}
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
             defaultValue={value.position}
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
             defaultValue={value.slug}
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
          <Button onClick={handleClose} color="primary">
            დახურვა
          </Button>
         {adButton(catButton, add, edit)}
        </DialogActions>
      </Dialog>

  );
}