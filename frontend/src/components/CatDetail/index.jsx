import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import { SpinnerContext } from '../../contexts/SpinerContext';
import Config from '../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: 'auto'
  },
  avatar: {
    margin: 'auto',
    width: theme.spacing(17),
    height: theme.spacing(17),
    marginBottom: '2rem'
  }
}));

export const CatDetail = () => {
  const classes = useStyles();
  const { setIsShowingSpinner } = useContext(SpinnerContext);

  let { id } = useParams();
  const [cat, setCat] = useState({ });

  useEffect( () => {
    async function fetchCat() {
      try {
        setIsShowingSpinner(true);
        const response = await axios.get(`${Config.backendURL}/v1/cats/${id}`);
        setCat(response.data);
        setIsShowingSpinner(false);
      }
      catch(e) {
        setIsShowingSpinner(false);
        console.log('Error while fetching cat', e);
      } 
    }
    fetchCat();  
  }, [id, setIsShowingSpinner]);

  return(
    <Card className={classes.root}>
      <CardContent>
          <Avatar className={classes.avatar} src={cat.pictureURL} />
            <Typography variant="h6" gutterBottom>
              <strong>Name:</strong> {cat.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Description:</strong> {cat.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Temperament:</strong> {cat.temperament}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Origin:</strong>  {cat.origin}
            </Typography>
      </CardContent>
    </Card>
  );
}