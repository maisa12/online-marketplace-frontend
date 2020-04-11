import React from 'react';
import { 
    ListItemText, 
    ListItemIcon, 
    ListItem, 
    List, 
    ListSubheader
  } from '@material-ui/core';
  
  import IconButton from '@material-ui/core/IconButton';
  import GroupAddIcon from '@material-ui/icons/GroupAdd';
  import PostAddIcon from '@material-ui/icons/PostAdd';
  import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
  import {
    Group,
    Category,
    CollectionsBookmark
} from '@material-ui/icons';

export default function AdminNav({handleListItemClick, selectedIndex, handleClickOpenAd, handleClickOpenCat, handleClickOpenUser}){
    return(
        <List style={{minWidth: "250px"}}
        component="nav"
        aria-labelledby="admin-panel"
         subheader={
<ListSubheader component="div" id="admin-panel">
  Admin panel
</ListSubheader>
}> 
<ListItem  button 
        selected={selectedIndex === 0}
        onClick={event => handleListItemClick(event, 0)}
>
<ListItemIcon>
  <Group />
</ListItemIcon>
<ListItemText primary="მომხმარებლები" />
<IconButton aria-label="add user" onClick={handleClickOpenUser}>
<GroupAddIcon  fontSize="small" />
</IconButton>
</ListItem>
<ListItem button  
        selected={selectedIndex === 2}
        onClick={event => handleListItemClick(event, 2)}>
<ListItemIcon>
  <Category />
</ListItemIcon>
<ListItemText primary="კატეგორიები" />
<IconButton aria-label="add category" onClick={handleClickOpenCat}>
    <PlaylistAddIcon  fontSize="small" />
</IconButton>
</ListItem>
<ListItem button  
        selected={selectedIndex === 1}
        onClick={event => handleListItemClick(event, 1)}>
<ListItemIcon>
  <CollectionsBookmark/>
</ListItemIcon>
<ListItemText primary="განცხადებები" />
<IconButton aria-label="add" onClick={handleClickOpenAd}>
<PostAddIcon  fontSize="small" />
</IconButton>
</ListItem>
</List>
    )
}