import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
export default function Pagination({sum, query}){
    const {category, fromPrice, toPrice, thisWeek, pageNumber, postName} = queryString.parse(query);
    let page = Number(pageNumber);
    var before = false;
    var next = false;
    if(page===1)before=true;
    if(page===sum || sum===0)next=true;
    const nextLink = queryString.stringify({category, fromPrice, toPrice, thisWeek, postName, pageNumber: page+1}, {skipNull: true});
    const beforeLink = queryString.stringify({category, fromPrice, toPrice, thisWeek, postName, pageNumber: page-1}, {skipNull: true});
    const arr = (currentPage, pageSum) =>{
        let array =[];
        let item;
            if(pageSum<=5){
                for(let i=1; i<=pageSum; i++){
                     item = {value: i, clicked: i===currentPage?true:false};
                    array.push(item)
                }
            }else if(currentPage<5){
                for(let i=1; i<=4; i++){
                    item = {value: i, clicked: i===currentPage?true:false};
                    array.push(item)
                }
                array.push({value:"dotsE", clicked: false});
                array.push( {value: pageSum, clicked:  false},);
            }
            else if(currentPage>pageSum-3){
                array.push({value: 1, clicked: false});
                array.push({value:"dotsS", clicked: false});
                for(let i=pageSum-3; i<=pageSum; i++){
                    item = {value: i, clicked: i===currentPage?true:false};
                    array.push(item)
                }
             }
             else {
                array = [
                    {value: 1, clicked: false},
                    {value:"dotsE", clicked: false},
                    {value: currentPage-1, clicked:  false},
                    {value: currentPage, clicked:  true},
                    {value: currentPage+1, clicked:  false},
                    {value:"dotsS", clicked: false},
                    {value: pageSum, clicked:  false}
                ]
             }
            return array
            }
    
    return(
        <Grid container justify="center" >
          <Grid item>
          <Paper>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">

                <Button  component={Link} to={`/posts/${beforeLink}`} disabled={before}><NavigateBeforeIcon/></Button>
                {arr(page, sum).map(x=>{
                    if(typeof x.value==="number" && x.clicked===false){
                        const pagenationLink = queryString.stringify({category, fromPrice, toPrice, thisWeek, postName, pageNumber: x.value});
                        return (
                            <Button key={x.value} component={Link} to={`/posts/${pagenationLink}`}>{x.value}</Button>
                        )
                    }
                    if(x.clicked===true){
                        const pagenationLink = queryString.stringify({category, fromPrice, toPrice, thisWeek, postName, pageNumber: x.value});
                        return(
                        <Button key={x.value}  variant="contained"  component={Link} to={`/posts/${pagenationLink}`}>{x.value}</Button>
                        )
                    }
                    if(typeof x.value==="string"){
                        return(
                            <Button key={x.value} disabled><MoreHorizIcon/></Button> 
                        )
                    }
                }
                )}
                <Button  component={Link} to={`/posts/${nextLink}`} disabled={next}><NavigateNextIcon /></Button>
            </ButtonGroup>
            </Paper>
            </Grid>
        </Grid>
    )
}