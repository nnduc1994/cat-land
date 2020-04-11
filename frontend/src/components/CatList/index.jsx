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
import Avatar from '@material-ui/core/Avatar';

import axios from 'axios';
import Config from '../../config';
import { SearchForm } from '../common/SearchForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1.5),
    },
  },
  name: {
    textDecoration: 'none'
  }
}));

export const CatList = () => {
  const classes = useStyles();

  const [limit] = useState(10);
  const [cats, setCats] = useState([]);
  const [offset, setOffset] = useState(0);
  const[currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [name, setNameQuery] = useState("");
  const [origin, setOrigin] = useState("");
  
  useEffect( () => {
    async function fetchCats() {
      try {
        const response =
         await axios.get(`${Config.backendURL}/v1/cats?limit=${limit}&offset=${offset}&name=${name}&origin=${origin}`);
        setCats(response.data.cats);
        setTotal(response.data.total)
      }
      catch(e) {
        console.log('Error while fetching list of cat', e)
      } 
    }
    fetchCats();  
  }, [limit, name, offset, origin, setCurrentPage]);

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

  const handleChangeNameQuery = (nameToSearch) => {
    setOffset(0);
    setNameQuery(nameToSearch);
  }

  const handleChangeOriginQuery = (originToSearch) => {
    setOffset(0);
    setOrigin(originToSearch);
  }

  const emptyRows = limit - Math.min(limit, total - currentPage * limit);

  return(
    <div>
        <div className={classes.search}>
          <SearchForm searchText="country origin" chipColor="primary" currentSearchString={origin} onSubmit={handleChangeOriginQuery} ></SearchForm>
          <SearchForm searchText="breed name" currentSearchString={name} onSubmit={handleChangeNameQuery} ></SearchForm>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                  <TableCell>Breed Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Temperament</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              { 
                cats.map((cat) => (
                  <TableRow key={cat.name}>
                    <TableCell component="th" scope="row">
                      <a className={classes.name} href={`/cats/${cat._id}`}>{cat.name}</a>
                    </TableCell>
                    <TableCell>{cat.description}</TableCell>
                    <TableCell>{cat.temperament}</TableCell>
                    <TableCell>{cat.origin}</TableCell>
                    <TableCell>          
                      <Avatar src={cat.pictureURL} />
                    </TableCell>
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
                  rowsPerPageOptions={[]}
                  page={currentPage}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
      </TableContainer>
    </div>
   
  );
}