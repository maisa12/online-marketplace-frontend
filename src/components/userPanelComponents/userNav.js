import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button
  } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
export default function UserNav({userNavProps}){
    const status =  useSelector(state=>state.status);
    const { selectedIndex, handleListItemClick, handleClickOpen} = userNavProps;
return(
    <List component="nav" aria-label="main mailbox folders">
                    <ListItem 
                            button
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                            >
                        <ListItemText primary="ჩემი სიახლეები" />
                        <IconButton aria-label="add category" onClick={()=>handleClickOpen()}>
                            <PostAddIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                    <ListItem 
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                            button
                            >
                        <ListItemText primary="პირადი ინფორმაცია" />
                        
                    </ListItem>
                    {status==="admin"?(<Button  component={Link} to="/adminPanel" fullWidth >
                        ადმინ პანელში შესვლა
                    </Button>):''}  
                </List>
)
}