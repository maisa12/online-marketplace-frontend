import React, { useState} from 'react';
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

export default function PanelTable({selectedIndex, columns, rows, adUpdate}){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
     
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
        <IconButton aria-label="delete" onClick={()=>adUpdate(userId)}>
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
                      if(value){value="აქტიური"}
                      else{value="ინაქტივირებული"}
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