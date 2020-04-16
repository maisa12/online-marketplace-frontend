import React, {useState} from 'react';
import {
  IconButton,
  Button,
  Typography 
} from '@material-ui/core';
import EditeIcon from '@material-ui/icons/Edit';
import ChangePassword from './changeInfo/ChangePassword';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme';
export default function UsersInfo({userInfo, handleOpenInfo}){
    //state of changing password dialog
    const [openPass, setOpenPass] = useState(false)
    const handleClickOpenPass = () => {
      setOpenPass(true);
    }
    const handleClosePass = () => {
      setOpenPass(false);
    }
    return(
  <ThemeProvider theme={theme}>
        <Typography variant="h5" gutterBottom>
        მომხმარებლის ინფორმაცია 
        <IconButton aria-label="add category" onClick={()=>handleOpenInfo()} >
            <EditeIcon fontSize="small" />
        </IconButton>
      </Typography>
      <Typography variant="subtitle2" display="block" gutterBottom>
         სახელი: {userInfo.name.split("%")[0]}
      </Typography>
      <Typography variant="subtitle2" display="block" gutterBottom>
        გვარი: {userInfo.name.split("%")[1]}
      </Typography>
      <Typography variant="subtitle2" display="block" gutterBottom>
        ელფოსტა: {userInfo.email}
      </Typography>
      <Typography variant="subtitle2" display="block" gutterBottom>
        მობილურის ნომერი: {userInfo.phone}
      </Typography>
      <Typography variant="subtitle2" display="block" gutterBottom>
        სტატუსი:{userInfo.status}
      </Typography>
      <Button variant="outlined" onClick={handleClickOpenPass} color="primary">
        პაროლის შეცვლა
      </Button>
      <ChangePassword handleClosePass={handleClosePass}  openPass={openPass}/>
  </ThemeProvider>
    
    )
}