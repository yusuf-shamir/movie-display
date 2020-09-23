import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Movies from './Movies';
import Movie from './Movie';
import NotFound from './NotFound';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar style={{ "backgroundColor": "rgba(0,0,0,0.05)" }}>
          <Toolbar>
            <Button to={'/'} component={Link}><HomeIcon /></Button>
          </Toolbar>
        </AppBar>
        <Container id="wrapper" maxWidth="md">
          <Switch>
            <Route exact path="/" component={Movies} />
            <Route exact path="/movie/:id" component={Movie} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div >

  );
}

export default App;