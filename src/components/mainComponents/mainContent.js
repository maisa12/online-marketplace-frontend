import React from 'react';
import {
    Paper, 
    Grid, 
    Typography,
    Link
  } from '@material-ui/core';
export default function MainContent({mainContentProps}){
    const {ads} = mainContentProps;
return(
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
                    <Link color='textPrimary' href={`/ad/${x.id}`} underline="none">
                      <Typography variant="h6" style={{paddingLeft: "10px"}}  gutterBottom>
                              <strong> {x.name}</strong>
                            </Typography>
                            </Link>
                        </Grid>
                    <Grid item xs={4}  >
                          <Typography variant="subtitle1"  style={{paddingRight: "10px"}} align="right" > <strong>{x.price} ₾</strong></Typography>
                      </Grid>
                    <Grid item  xs={12} sm={4} lg={4} md={4} style={{paddingLeft: "10px"}}>
                      <Link color='textPrimary' href={`/ad/${x.id}`} underline="none">
                          <img  alt={x.name} src={x.picture}  height="140" width="100%"/>
                          </Link>
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
)
}