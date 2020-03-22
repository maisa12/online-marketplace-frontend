import React, { useState } from 'react';
import '../App.css';
import {
    Group,
    Category,
    CollectionsBookmark
} from '@material-ui/icons';
import {
    Paper, 
    Grid, 
    ListItemText, 
    ListItemIcon, 
    ListItem, 
    List, 
    ListSubheader
  } from '@material-ui/core';
  import UserTable from './panelComponents/userTable';
  import IconButton from '@material-ui/core/IconButton';
  import GroupAddIcon from '@material-ui/icons/GroupAdd';
  import PostAddIcon from '@material-ui/icons/PostAdd';
  import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

export default function Panel(){
  
  return (
    <Grid container spacing={1} justify="center">
        <Grid item xs={3}>
          <Paper>
          <List
                component="nav"
                aria-labelledby="admin-panel"
                 subheader={
        <ListSubheader component="div" id="admin-panel">
          Admin panel
        </ListSubheader>
      }> 
     <ListItem button>
        <ListItemIcon>
          <Group />
        </ListItemIcon>
        <ListItemText primary="მომხმარებლები" />
        <IconButton aria-label="add user" >
    <GroupAddIcon  fontSize="small" />
  </IconButton>
      </ListItem>
      <ListItem button>
      <ListItemIcon>
          <Category />
        </ListItemIcon>
        <ListItemText primary="კატეგორიები" />
        <IconButton aria-label="add category" >
            <PlaylistAddIcon  fontSize="small" />
        </IconButton>
      </ListItem>
      <ListItem button>
      <ListItemIcon>
          <CollectionsBookmark/>
        </ListItemIcon>
        <ListItemText primary="განცხადებები" />
        <IconButton aria-label="add advertisement" >
    <PostAddIcon  fontSize="small" />
  </IconButton>
        
      </ListItem>
    </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
                <UserTable/>
          </Paper>
        </Grid>
    </Grid>
  );
}