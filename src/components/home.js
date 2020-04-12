import React, {useState, useEffect} from 'react';
import '../App.css';
import {
  Grid
} from '@material-ui/core';
import {categories, adRequest, selectCategory} from './mainComponents/mainRequests';
import MainNav from './mainComponents/mainNav';
import MainContent from './mainComponents/mainContent';
export default function Home(){
  const [selectedIndex, setSelectedIndex] =useState(0);
  const [cat, setCategories] =useState([]);
  const [ads, setAds] =useState([]);
  const [from, setFrom] =useState('');
  const [to, setTo] =useState('');
  const [selected, setSelected] = useState('');
  const [lastWeek, setLastWeek] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [color, setColor] = useState("LightGray");
  const handleCheckBox = (event) => {
    setLastWeek(event.target.checked)
  };
  const handleListItemClick = (event, index, slug) => {
    setSelectedIndex(index);
    setSelected(slug)
    setFrom('');
    setTo('');
    setDisabled(false);
    setColor('DarkOliveGreen');
  };
  useEffect(()=>{
    categories(setCategories);
    adRequest(setAds);
  },[]);
const filter=()=>{
  selectCategory(selected, setAds, from, to, lastWeek);
};
const mainNavProps = {selectedIndex, handleListItemClick, from, setFrom, to, setTo, lastWeek, handleCheckBox, cat, disabled, filter, color};
const mainContentProps ={ads};
  return (
<Grid container spacing={1} justify="center" style={{width: "100%"}} >
  <Grid item xs={3} >
        <MainNav mainNavProps={mainNavProps} />
  </Grid>

  <Grid item xs={8}  >
          <MainContent mainContentProps={mainContentProps}/>
      </Grid>
</Grid>
);
}

