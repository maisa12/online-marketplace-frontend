import React from 'react';
import {
    Paper, 
    Grid, 
    List,
    ListItem,
    ListItemText,
    TextField,
    InputAdornment,
    Button
  } from '@material-ui/core';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
export default function MainNav({mainNavProps}){
    const{selectedIndex, handleListItemClick, from, setFrom, to, setTo, lastWeek, handleCheckBox, cat, disabled, filter, color} = mainNavProps;
    return(
        <Paper >
        <Grid container spacing={0} justify="center" direction="row"  alignItems="baseline">
          <Grid item xs={6} style={{paddingLeft: "5px"}}>
              <TextField
                value={from}
                autoComplete="off"
                label="ფასი"
                id="price_from"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">დან</InputAdornment>,
                }}
                onChange={(e)=>
                    setFrom(e.target.value)
                }
              />
            </Grid>
       
          <Grid item xs={6} style={{paddingRight: "5px"}}>
              <TextField
                  value={to}
                  autoComplete="off"
                  label=" "
                  type="number"
                  id="price_to"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">მდე</InputAdornment>,
                    }}
                  onChange={(e)=>
                  setTo(e.target.value)
                    }
                />
            </Grid>
        </Grid>
       <FormControlLabel
            style={{marginLeft: "5px"}}
            value="end"
            checked = {lastWeek}
            onChange ={handleCheckBox}
            control={<Checkbox style={{color: "DarkOliveGreen"}} />}
            label="ბოლო კვირის"
            labelPlacement="end"
          />
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
        <Button variant="contained" 
                disabled={disabled}
                color="primary" 
                style={{backgroundColor: color}} 
                onClick={filter}
                fullWidth>
            გაფილტვრა
          </Button>
      </Paper >
    )
}