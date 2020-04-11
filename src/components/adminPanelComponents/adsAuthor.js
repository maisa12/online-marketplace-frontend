import React from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

function Authors(adsButton, addAd, aut, setAddAd){
    const handleChangeAuthor = event => {
        setAddAd(prevState => {
          return { ...prevState, author: event.target.value}
                         })
                        }
    if(adsButton===true){
    return(
      <FormControl variant="filled" style={{width: "50%"}}>
      <InputLabel id="demo-simple-select-filled-label">ავტორი</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
          value={addAd.author}
          onChange={handleChangeAuthor}
          required
      >
    {aut.map(x=>(<MenuItem value={x.id} key={x.id}>{x.name_lastname.split("%")[0]+" "+x.name_lastname.split("%")[1]}</MenuItem>))}
      </Select>
    </FormControl>
    )
    }
    else{
      return(
        <Typography variant="button" display="inline" style={{textAlign: "center"}} >
         ავტორი:{addAd.author}
      </Typography>
      )
    }
  }
  export {Authors}