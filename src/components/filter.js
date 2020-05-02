import React, {useState, useEffect} from 'react';
import '../App.css';
import {
    Grid,
    Typography
  } from '@material-ui/core';
import {categories, selectCategory} from './mainComponents/mainRequests';
import MainNav from './mainComponents/MainNav';
import MainContent from './mainComponents/MainContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from './mainComponents/Pagination';
import queryString from 'query-string';
export default function Filter({match}){
    const {query} = match.params;
    const {category, fromPrice, toPrice, thisWeek, pageNumber, postName} = queryString.parse(query);
    const [selectedIndex, setSelectedIndex] =useState(0);
    const [cat, setCategories] =useState([]);
    const [ads, setAds] =useState([]);
    const [pagination, setPagination] =useState(0);
    const [from, setFrom] =useState('');
    const [to, setTo] =useState('');
    const [selected, setSelected] = useState('');
    const [lastWeek, setLastWeek] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleListItemClick = (event, index, slug) => {
        setSelectedIndex(index);
        setSelected(slug);
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
        if(category!==undefined){
          setSelected(category);
        }
        if(fromPrice!==undefined)setFrom(fromPrice);
        if(toPrice!==undefined)setTo(toPrice);
        if(thisWeek==="true")setLastWeek(true);
        selectCategory(category, setAds, fromPrice, toPrice, thisWeek, setPagination, pageNumber, setLoading,  postName);
      },[category, fromPrice, toPrice, thisWeek, pageNumber, postName]);
      useEffect(()=>{selectCategoryIndex(category, cat)},[cat]);
    const mainNavProps = {postName, selected, selectedIndex, handleListItemClick, from, setFrom, to, setTo, lastWeek, handleCheckBox, cat};
    const mainContentProps ={ads};
    return (
    <Grid container spacing={1} justify="center" style={{width: "100%"}} >
        <Grid item xs={3} >
            <MainNav mainNavProps={mainNavProps} />
        </Grid>
        <Grid item xs={8}>
            {loading===true?(<div align="center">
               <CircularProgress color="inherit" />
            </div>):(<span>
              {postName!==undefined?(
              <span>
                <Typography variant="h6" gutterBottom>
                  ძიების შედეგები:
                </Typography>
              </span>
                ):''}
            <MainContent mainContentProps={mainContentProps}/>
            <Pagination sum={pagination}  query={query}/>
            </span>)}
          
        </Grid>
    </Grid>
    )
}