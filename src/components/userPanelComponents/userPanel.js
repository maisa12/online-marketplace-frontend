import React, {useState, useEffect} from 'react';
import {
    Paper, 
    Grid
  } from '@material-ui/core';
import UserNav from './userNav';
import AdsTable from './adsTable';
import UsersInfo from './usersInfo';
import {ads, info} from './tableContent';
export default function UserPanel(){
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [columns, setColumns] = useState([]);
    const [userInfo, setUserInfo] = useState({name: '', status: '', email: '', phone: ''});
    const [rows, setRows] = useState([]);
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
    const adUpdate = (id) => {
        console.log(id+"update");
    };
    const deleteItem = (id) => {
        console.log(id+"delete");
    };
    const content = (index) => {
        if(index===0){
            return (
                <AdsTable adsTable={adsTable} />
            )
        }
        else{
            return (
                <UsersInfo userInfo={userInfo}/>
            )
        }
    }
    useEffect(()=>{
        content(selectedIndex);
        if(selectedIndex===0){
        ads(setColumns, setRows)
        }
        if(selectedIndex===1){
        info(setUserInfo)
        }
    }, [selectedIndex]);
    const userNavProps = {selectedIndex, handleListItemClick};
    const adsTable ={columns, rows, deleteItem, adUpdate};
    return (
        <Grid container spacing={1} style={{width: "100%"}} justify="center">
             <Grid item xs={3}>
                <Paper>
                    <UserNav userNavProps={userNavProps} />
                </Paper>
             </Grid>
             <Grid item xs={8}>
                <Paper style={{padding: "20px"}}>
                    {content(selectedIndex)}
                </Paper>
             </Grid>
        </Grid>
    )
}