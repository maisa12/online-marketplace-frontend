import React, {useState, useEffect} from 'react';
import '../App.css';
import {
    Grid,
    Link
  } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {categories, selectCategory} from './mainComponents/mainRequests';
import MainNav from './mainComponents/MainNav';
import MainContent from './mainComponents/MainContent';
export default function Filter({match}){
    const {category, fromPrice, toPrice, thisWeek, pageNumber} = match.params;
    const [selectedIndex, setSelectedIndex] =useState(0);
    const [cat, setCategories] =useState([]);
    const [ads, setAds] =useState([]);
    const [pegination, setPegination] =useState(0);
    const [page, setPage] = useState(0);
    const [from, setFrom] =useState('');
    const [to, setTo] =useState('');
    const [selected, setSelected] = useState('');
    const [lastWeek, setLastWeek] = useState(false);
    const disabled = false;
    const color = "DarkOliveGreen";
    const handleListItemClick = (event, index, slug) => {
        setSelectedIndex(index);
        setSelected(slug)
        setFrom('');
        setTo('');
      };
    const handleCheckBox = (event) => {
        setLastWeek(event.target.checked)
      };
    //select
    const selectCategoryIndex = (selectedCategory, categoryArray) =>{
        for(let item of categoryArray){
            if(item.slug===selectedCategory){
                setSelectedIndex(item.position);
                return 
            }
        }
    }
      useEffect(()=>{
        categories(setCategories);
        setSelected(category);
        if(fromPrice!=="0"){
            setFrom(fromPrice);
        }
        if(toPrice!=="0"){
            setTo(toPrice);
        }
        if(thisWeek==="true"){
            setLastWeek(true);
        }
        selectCategory(category, setAds, fromPrice, toPrice, thisWeek, setPegination, pageNumber);
      },[]);
      useEffect(()=>{selectCategoryIndex(category, cat)},[cat]);
    const mainNavProps = {selected, selectedIndex, handleListItemClick, from, setFrom, to, setTo, lastWeek, handleCheckBox, cat, disabled, color};
    const mainContentProps ={ads};
   

    return (
    <Grid container spacing={1} justify="center" style={{width: "100%"}} >
        <Grid item xs={3} >
            <MainNav mainNavProps={mainNavProps} />
        </Grid>


        <Grid item xs={8}>
            <MainContent mainContentProps={mainContentProps}/>
           
            <Link  href={`/filter/${category}/${fromPrice}/${toPrice}/${thisWeek}/${page}`} underline="none"> 
                <Pagination count={pegination} page={Number(pageNumber)} onChange={(event, page)=>setPage(page)} style={{width: '40%', marginLeft:'30%', marginTop:'10px', marginBottom: '20px'}} />
            </Link> 
        </Grid>
    </Grid>
    )
}