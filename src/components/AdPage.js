import React, {useState, useEffect} from 'react';
import {
    Grid,
    Paper,
    Typography
  } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function AdPage({match}){
    const [loading, setLoading] = useState(true);
    const [adContent, setAdContent] = useState({name: '', picture: '', "categories.name": '', "users.author": '', price:'', description: '', createdAt: ""});
    const {adId} = match.params;
    const getAdContent = async() =>{
      const req = await fetch(`http://localhost:8000/ad/${adId}`);
      const response = await req.json();
       setAdContent(response);
       setLoading(false);
    }
    useEffect(()=>{getAdContent()},[])
   const date = new Date(adContent.createdAt);
    return (
       <span>
          {loading===true?(
            <div align="center">
               <CircularProgress color="inherit" />
            </div>
            ):(
            <Grid container spacing={1} justify="center" style={{width: "100%"}} >
          <Grid item xs={4} >
      <Paper>
          <img src={adContent.picture} alt={adContent.name} width="100%"/>
      </Paper>
  </Grid>

  <Grid item xs={7}  >
     <Paper style={{padding: "10px"}}>
           <Grid container spacing={1} justify="center" >
                <Grid item xs={12}>
                <Typography variant="h6"  gutterBottom>
                              <strong> {adContent.name}</strong>
                   </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{paddingRight: "10px"}} >
                        კატეგორია:{adContent["categories.name"]}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{paddingRight: "10px"}} >
                        ავტორი:  {
                                      adContent["users.author"].split("%")[0]+" "+adContent["users.author"].split("%")[1]
                                          }
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{paddingRight: "10px"}} >
                          ფასი: {adContent.price} ₾
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom style={{paddingRight: "10px"}} >
                          თარიღი: {date.toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" gutterBottom  style={{paddingRight: "10px"}} > 
                            <strong>აღწერა:</strong>{adContent.description}
                    </Typography>
                  </Grid>
            </Grid>         
      </Paper>
    </Grid>
   </Grid>
    )
    }   
</span>
    )
}