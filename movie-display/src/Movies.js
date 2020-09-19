import React, { Component } from 'react';
import './Movies.css';

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
          <div key={movie.name}>{movie.name}</div>
        )
      })

    ) : (
        <div> error</div>
      )
    return (
      <div>
        {movieList}
      </div>
    )
  }
}

export default Movies;