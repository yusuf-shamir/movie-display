import React, { Component } from 'react';
import './Movies.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import axios from 'axios';

class Movies extends Component {

  state = {
    movies: []
  }

  componentDidMount() {
    axios.get('https://sometimes-maybe-flaky-api.gdshive.io').then(res => {
      this.setState({ movies: res.data })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const movieList = this.state.movies.length ? (
      this.state.movies.map(movie => {
        return (
          <ListItem button key={movie.name}>{movie.name}</ListItem>
        )
      })

    ) : (
        <div>error</div>
      )
    return (
      <List>
        {movieList}
      </List>
    )
  }
}

export default Movies;