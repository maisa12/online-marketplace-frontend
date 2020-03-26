import React, {useEffect, useState} from 'react';
import {
        Table, 
        TableBody, 
        TableCell, 
        TableContainer, 
        TableHead, 
        TablePagination, 
        TableRow, 
        IconButton
        } from  '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditeIcon from '@material-ui/icons/Edit';

export default function PanelTable({selectedIndex, openAd, openCat, openUser}){
    const [page, setPage] = useState(0);
    const [updateAd, setUpdateAd] = useState(null);
    const [updateCat, setUpdateCat] = useState(null);
    const [updateUser, setUpdateUser] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
      useEffect(()=>{
        if(selectedIndex===0)user();
        if(selectedIndex===2)category();
        if(selectedIndex===1)ads();
      },[selectedIndex]);
     useEffect(()=>{
       const u = openAd;
       setUpdateAd(u);
       const s =updateAd;
       if(s===true){
        ads()
      }
      },[openAd])
      useEffect(()=>{
        setUpdateCat(openCat);
        if(updateCat===true){
          category()
       }
       },[openCat])
       useEffect(()=>{
        setUpdateUser(openUser);
        if(updateUser===true){
         user()
       }
       },[openUser])
     
   async function user(){
      setColumns([{ id: 'name', label: 'სახელი/გვარი', minWidth: '20%' },
      { id: 'number', label: 'მობილურის ნომერი', minWidth: '25%' },
      {
        id: 'email',
        label: 'ელ-ფოსტა',
        minWidth: '35%',
      },
      {
        id: 'status',
        label: 'სტატუსი',
        minWidth: '20%',
        align: 'right'
      },
      {
          id: 'edition',
          label: 'რედაქტირება',
          minWidth: '20%',
          align: 'right',
        }]);
        const request = await fetch(`http://localhost:8000/users`);
        const userArray = await request.json();
        userArray.forEach(x=>x.name=x.name.split("%")[0]+" "+x.name.split("%")[1]);
        setRows(userArray);
    }
    async function  category(){
      setColumns([
        { id: 'name', label: 'კატეგორია', minWidth: '20%' },
        { id: 'slug', label: 'Slug', minWidth: '25%' },
        { id: 'position', label: 'პოზიცია', minWidth: '25%' },
        {
          id: 'edition',
          label: 'რედაქტირება',
          minWidth: '30%',
          align: 'right',
        }
      ]);
      const request = await fetch(`http://localhost:8000/categories`);
      const array = await request.json();
      setRows(array)
    }
    async function ads(){
      setColumns([
        { id: 'name', label: 'განცხადება', minWidth: '20%' },
        { id: 'active', label: 'სტატუსი', minWidth: '20%' },
        {
          id: 'author',
          label: 'ავტორი',
          minWidth: '20%',
        },
        {
          id: 'categories.name',
          label: 'კატეგორია',
          minWidth: '20%',
          align: 'right'
        },
        {
            id: 'edition',
            label: 'რედაქტირება',
            minWidth: '20%',
            align: 'right',
          }
      ]);
      const request = await fetch(`http://localhost:8000/ads`);
      const array = await request.json();
      setRows(array)
    }
   
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const edition = (userId) =>{
          return (
        <span>
        <IconButton aria-label="delete" >
        <EditeIcon fontSize="small" />
      </IconButton>
    <IconButton aria-label="delete" >
    <DeleteIcon fontSize="small" />
  </IconButton>
  </span>
  );
      }   
    return( 
    <div>
        <TableContainer >
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                 <strong> {column.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {

                const addEdit = Object.entries(item).concat([["edition", edition(item.id)]])
               const row = Object.fromEntries(addEdit);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map(column => {
                    var value = row[column.id];
                    if(typeof value==="boolean"){
                      if(value){value="აქტიურ"}
                      else{value="არა აქტიური"}
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </div>
    );
}