import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    IconButton
  } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';

export default function UserNav({userNavProps}){
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
                </List>
)
}