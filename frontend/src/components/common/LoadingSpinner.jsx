import React, { useContext } from 'react'
import { SpinnerContext } from '../../contexts/SpinerContext'
import { makeStyles } from '@material-ui/core/styles';

const spinnerImgURL = 'https://i.pinimg.com/originals/5c/5f/e5/5c5fe58ae7d00aa9582fe287421fb427.gif';
const useStyles = makeStyles((theme) => ({
  loadingSpinner: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export const LoadingSpinner = () => {
  const classes = useStyles();
  const { isShowingSpinner } = useContext(SpinnerContext);
  return isShowingSpinner ? (
    <div className={classes.loadingSpinner}>
      <div>
        <img src={spinnerImgURL} alt='loading'/>
        <p>Loading....</p>
      </div>
    </div>
  ) : <></>
}