import React from 'react';
import './App.css';
import { CatDetail } from './components/CatDetail/index'
import { CatList } from './components/CatList/index'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className="App">
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Cat Land
          </Typography>

        </Toolbar>
      </AppBar>
      <Container>
        <Router>
          <Switch>
                <Route exact path="/" component={CatList} />
                <Route exact path="/cats/:id" component={CatDetail} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
