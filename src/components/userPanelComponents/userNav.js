import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button
  } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

export default function UserNav({userNavProps}){
    const { selectedIndex, handleListItemClick, handleClickOpen, panelState} = userNavProps;
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
                    {panelState===2?( <Button color="primary" href="/adminPanel" fullWidth >
                        ადმინ პანელში შესვლა
                    </Button>):''}  
                </List>
)
}