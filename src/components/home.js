import React, {useState, useEffect} from 'react';
import '../App.css';

import {
  Paper, 
  Grid, 
  List,
  ListItem,
  ListItemText,
  Typography, 
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import {categories, adRequest, selectCategory} from './panelComponents/mainRequests';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
export default function Home(){
  const [selectedIndex, setSelectedIndex] =useState(0);
  const [cat, setCategories] =useState([]);
  const [ads, setAds] =useState([]);
  const [from, setFrom] =useState('');
  const [to, setTo] =useState('');
  const [selected, setSelected] =useState('');
  const [disable, setDisable] =useState(true);
  
  const handleListItemClick = (event, index, slug) => {
    setSelectedIndex(index);
    selectCategory(slug, setAds, from, to);
    setSelected(slug)
    setFrom('');
    setTo('');
    setDisable(false)
  };

  useEffect(()=>{
    categories(setCategories);
    adRequest(setAds);
  },[])
const filterByPrice = ()=>{
  selectCategory(selected, setAds, from, to);
}

  return (
<Grid container spacing={1} justify="center">
  <Grid item xs={3}>
    <Paper>
    <Grid container spacing={0} justify="center" direction="row"  alignItems="baseline">
    <Grid item xs={5} style={{paddingLeft: "5px"}}>
    <TextField
          disabled={disable}
          value={from}
          autoComplete="off"
          label="ფასი"
          id="price_from"
         
          InputProps={{
            startAdornment: <InputAdornment position="start">დან</InputAdornment>,
          }}
          onChange={(e)=>
            setFrom(e.target.value)
          }
        />
        </Grid>
     
     <Grid item xs={5}>
     <TextField
          disabled={disable}
          value={to}
          autoComplete="off"
          label=" "
          
          id="price_to"
          InputProps={{
            startAdornment: <InputAdornment position="start">მდე</InputAdornment>,
          }}
          onChange={(e)=>
            setTo(e.target.value)
          }
        />
     </Grid>
     <Grid item xs={2}>
     <IconButton  disabled={disable} aria-label="filter" onClick={filterByPrice} color="primary" style={{marginTop: "30px", padding: "3px", paddingTop:"10px"}}>
     <ArrowDropDownCircleIcon  style={{width: "100%", height: "100%"}} />
      </IconButton>
     </Grid>
     </Grid>
    <List component="nav" aria-label="category">
      {
       cat.map(x=>( <ListItem
       key={x.id}
        button
        selected={selectedIndex === x.position}
        onClick={(event) => handleListItemClick(event, x.position, x.slug)}
      >
        <ListItemText primary={x.name}/>
      </ListItem>))  
      } 
      </List>
    </Paper >
  </Grid>
  <Grid item xs={8}  >
   
    <Grid
  container
  direction="row"
  justify="flex-start"
  spacing={1}
      >
{ ads.map((x)=>(
  <Grid item  md={12} xs={12} lg={6} key={x.id} >
  <Paper  elevation={3}  style={{height: "100%"}}>
    <Grid container spacing={1} >
    <Grid item xs={8}  >
    
    <Typography variant="h6" style={{paddingLeft: "10px"}}  gutterBottom>
       <strong> {x.name}</strong>
       </Typography>
       </Grid>
       <Grid item xs={4}  >
      
<Typography variant="subtitle1"  style={{paddingRight: "10px"}} align="right" > <strong>{x.price} ₾</strong></Typography>
      </Grid>
    <Grid item  xs={12} sm={4} lg={4} md={4} style={{paddingLeft: "10px"}}>
<img  alt="Smiley face" src={x.picture}  height="140" width="100%"/>
        </Grid>
        <Grid item xs={12} sm={8} lg={8} md={8}>
        <Grid container spacing={1} justify="center" >
        <Grid item xs={12}>
        <Typography variant="subtitle2" gutterBottom style={{paddingRight: "10px"}} >
       კატეგორია: {x["categories.name"]}
      </Typography>
      <Typography variant="subtitle2" gutterBottom style={{paddingRight: "10px"}} >
       ავტორი: {
       x["users.author"].split("%")[0]+" "+x["users.author"].split("%")[1]
       }
      </Typography>
      <Typography variant="body2" gutterBottom  style={{paddingRight: "10px"}} > 
            <strong>აღწერა: </strong>{x.description.slice(0,140) }{
            x.description.length>140 ? '...':''
            }
          
          
      </Typography>
        </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{overflow: 'hidden', paddingLeft: "10px",}}> 
       
        </Grid>
    </Grid>
    </Paper>
    
  </Grid>)
)}

  </Grid>

  
       </Grid>
      
  </Grid>
  );
}

