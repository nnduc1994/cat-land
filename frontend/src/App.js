import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { CatDetail } from './components/CatDetail/index';
import { CatList } from './components/CatList/index';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { SpinnerContextProvider } from './contexts/SpinerContext';

function App() {
  return (
    <SpinnerContextProvider>
       <div className="App">
          <AppBar position="static" style={{ background: '#FFC489' }}>
          <Toolbar>
            <Typography variant="h6">
              <a href='/'>Cat Land </a>
            </Typography>

          </Toolbar>
        </AppBar>
        <Container className="App-main-content">
          <LoadingSpinner></LoadingSpinner>
          <Router>
            <Switch>
                  <Route exact path="/" component={CatList} />
                  <Route exact path="/cats/:id" component={CatDetail} />
            </Switch>
          </Router>
        </Container>
      </div>
    </SpinnerContextProvider>
  );
}

export default App;
