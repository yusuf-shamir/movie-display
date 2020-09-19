import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Movies from './Movies';
import Movie from './Movie';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Route exact path="/" component={Movies} />
          <Route exact path="/movie" component={Movie} />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
