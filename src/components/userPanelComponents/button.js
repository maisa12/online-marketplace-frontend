import React from 'react';
import Button from '@material-ui/core/Button';
export default function AddButton(button, add, edit){
    if(button===true){
        return(
          <Button onClick={add} color="primary">
          დამატება
        </Button>
        )
      }
      else{
        return(
          <Button onClick={edit} color="primary">
          რედაქტირება
        </Button>
        )
      }
}

