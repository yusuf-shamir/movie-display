import React, { Component } from 'react';
import './Movies.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import axios from 'axios';

class Movies extends Component {

  componentDidMount() {
    this.props.fetchMovies()
  }

  render() {

    const changeGenre = (event) => {
      this.props.changeGenre(event.target.value)
      alert(event.target.value)
    }

    const { movies } = this.props
    const genre = ''

    const movieList = (movies !== null) ? (
      Object.entries(movies).map((movie) => {
        return (
          <Link to={`/movie/${movie[0]}`}><ListItem button key={movie[0]}>{genre}{movie[1].name}</ListItem></Link>
        )
      })
    ) : (
        <div>There are no movies to be displayed</div>
      )
    return (
      <div>
        <FormControl>
          {genre}
          <InputLabel>Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={changeGenre}
          >
            <MenuItem value={'Action'}>Action</MenuItem>
            <MenuItem value={'Adventure'}>Adventure</MenuItem>
          </Select>
        </FormControl>
        <List>
          {movieList}
        </List></div>
    )
  }
}

function fetchMoviesSuccess(movies) {
  return {
    type: 'FETCH_MOVIES_SUCCESS',
    movies: movies
  }
}

function fetchMoviesError(error) {
  return {
    type: 'FETCH_MOVIES_ERROR',
    error: error
  }
}

function changeGenre(genre) {
  return {
    type: 'CHANGE_GENRE',
    genre: genre
  }
}

function fetchMoviesAction() {
  return dispatch => {
    axios.get('https://sometimes-maybe-flaky-api.gdshive.io').then(res => {
      dispatch(fetchMoviesSuccess(res.data))
    }).catch(error => {
      dispatch(fetchMoviesError(error))
    })
  }
}

function changeGenreAction(genre) {
  return dispatch => {
    dispatch(changeGenre(genre))
  }
}

const mapStateToProps = (state, selfProps) => {
  if (state.movies) {
    return {
      movies: state.movies.filter(movie => state.genre ? movie.genre === state.genre : true)
    }
  } else {
    return {
      movies: null
    }
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMovies: fetchMoviesAction,
  changeGenre: changeGenreAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Movies);