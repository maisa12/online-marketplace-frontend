import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    IconButton
  } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EditeIcon from '@material-ui/icons/Edit';
export default function UserNav({userNavProps}){
    const {selectedIndex, handleListItemClick} = userNavProps;
return(
    <List component="nav" aria-label="main mailbox folders">
                    <ListItem 
                            button
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                            >
                        <ListItemText primary="ჩემი სიახლეები" />
                        <IconButton aria-label="add category" >
                            <PostAddIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                    <ListItem 
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                            button
                            >
                        <ListItemText primary="პირადი ინფორმაცია" />
                        <IconButton aria-label="add category" >
                            <EditeIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                </List>
)
}