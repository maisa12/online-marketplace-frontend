import React, {useEffect} from 'react';
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

export default function PanelTable({selectedIndex}){
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [columns, setColumns] = React.useState([]);
    const [rows, setRows] = React.useState([]);
      useEffect(()=>{
        if(selectedIndex===0)user();
        if(selectedIndex===2)category();
        if(selectedIndex===1)ads();
      },[selectedIndex]);

    function user(){
      setColumns([{ id: 'name', label: 'სახელი', minWidth: '20%' },
      { id: 'lastName', label: 'გვარი', minWidth: '25%' },
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
        setRows([
          { name: 'gio', lastName: 'giushkebi', email: "sss@gmail.com", status: "admin", id: 5}
        ]);
    }
    function category(){
      setColumns([
        { id: 'name', label: 'კატეგორია', minWidth: '20%' },
        { id: 'amount', label: 'ოდენობა', minWidth: '25%' },
        {
          id: 'edition',
          label: 'რედაქტირება',
          minWidth: '20%',
          align: 'right',
        }
      ]);
      setRows([
        { name: 'gio', amount: 'giushkebi'}
      ]);
    }
    function ads(){
      setColumns([
        { id: 'name', label: 'განცხადება', minWidth: '20%' },
        { id: 'status', label: 'სტატუსი', minWidth: '25%' },
        {
          id: 'author',
          label: 'ავტორი',
          minWidth: '35%',
        },
        {
          id: 'category',
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
      setRows([
        { name: 'gio', status: 'active', author: "giushkebii", category: "category"}
      ])
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
                    const value = row[column.id];
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