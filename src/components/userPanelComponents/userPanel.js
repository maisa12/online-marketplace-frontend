import React from 'react';
import {
    Paper, 
    Grid
  } from '@material-ui/core';
export default function UserPanel(){
    return (
        <Grid container spacing={1} justify="center">
             <Grid item xs={3}>
                <Paper>
                    <h6>panel</h6>
                </Paper>
             </Grid>
             <Grid item xs={8}>
                <Paper>
                    <h6>panel</h6>
                </Paper>
             </Grid>
        </Grid>
    )
}