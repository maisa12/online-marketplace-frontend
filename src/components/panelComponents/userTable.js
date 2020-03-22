import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditeIcon from '@material-ui/icons/Edit';


function createData(name, lastName, email, status) {
    const edition = (
        <span>
        <IconButton aria-label="delete" >
        <EditeIcon fontSize="small" />
      </IconButton>
    <IconButton aria-label="delete" >
    <DeleteIcon fontSize="small" />
  </IconButton>
  </span>
  )
    return { name, lastName, email, status, edition};
  }

export default function UserTable(){
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
   
      
      const rows = [
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('gio', 'giushkebi', "sss@gmail.com", "admin"),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
      ];

      const columns = [
        { id: 'name', label: 'სახელი', minWidth: '20%' },
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
          }
      ];
      const useStyles = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 440,
        },
      });
    return( 
    <div>
        <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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