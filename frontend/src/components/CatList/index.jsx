import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Config from '../../config';

export const CatList = () => {
  const [limit, setLimit] = useState(10);
  const [cats, setCats] = useState([]);
  const [offset, setOffset] = useState(0);
  const[currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect( () => {
    async function fetchCats() {
      try {
        const response = await axios.get(`${Config.backendURL}/v1/cats?limit=${limit}&offset=${offset}`);
        setCats(response.data.cats);
        setTotal(response.data.total)
      }
      catch(e) {
        console.log('Error while fetching list of cat', e)
      } 
    }
    fetchCats();  
  }, [limit, offset]);

  const handleChangePage = (e, page) => {
    if(page < currentPage) {
      setOffset(offset - limit)
      setCurrentPage(page)
    }
    else {
      setOffset(offset + limit)
      setCurrentPage(page)
    }
  }

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const emptyRows = limit - Math.min(limit, total - currentPage * limit);

  return(
    <TableContainer component={Paper}>
    <Table aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Breed Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Temperament</TableCell>
            <TableCell>Origin</TableCell>
          </TableRow>
        </TableHead>
      <TableBody>
        { 
          cats.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <a href={`/cats/${row._id}`}>{row.name}</a>
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.temperament}</TableCell>
              <TableCell>{row.origin}</TableCell>
            </TableRow>
        ))}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={3}
            count={total}
            rowsPerPage={limit}
            rowsPerPageOptions={[1,5, 10, 15, 20]}
            page={currentPage}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
  );
}