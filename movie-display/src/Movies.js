import React, { Component } from 'react';
import './Movies.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
    const { movies } = this.props
    const movieList = movies.length ? (
      movies.map(movie => {
        return (
          <Link to="/movie" movie={movie}><ListItem button key={movie.name}>{movie.name}</ListItem></Link>
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

const mapper = (state) => {
  return {
    movies: state.movies
  }
}

export default connect(mapper)(Movies);