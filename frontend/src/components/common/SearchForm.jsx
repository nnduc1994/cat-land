import React, { useState, useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  result: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));

export const SearchForm = ({searchText, currentSearchString ,onSubmit, chipColor } ) => {
  const classes = useStyles();

  const [userInput, setuserInput] = useState(""); // Use this to keep user input
  const [showSearchString, setShowSearchString] = useState(false);

  useEffect( () => {
    if(currentSearchString !== "") {
      setShowSearchString(true);
    }
    else {
      setShowSearchString(false);
    }
  }, [currentSearchString])

  const handleChangeQuery = (e) => {
    e.preventDefault();
    onSubmit(userInput);
  }

  const handleOnInputChange = (e) => {
    setuserInput(e.target.value);
  }

  const handOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(userInput);
    }
  }

  return(
    <div component="form" >
        <InputBase
          placeholder={`Search for ${searchText}`} 
          onChange={ handleOnInputChange }
          onKeyPress={ handOnKeyPress }
        />
        <IconButton onClick={ handleChangeQuery } aria-label="search">
          <SearchIcon />
        </IconButton>
        {
          (showSearchString) ?  <div className={classes.result}>
                                    <Typography>Serch result for {searchText}: </Typography> 
                                    <Chip color={chipColor} size="small" label={currentSearchString} /> 
                                </div>

                              : <></>
        }
      </div>
  )
}