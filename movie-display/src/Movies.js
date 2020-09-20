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
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import axios from 'axios';

class Movies extends Component {

  componentDidMount() {
    this.props.fetchMovies()
  }

  render() {

    const changeGenre = (event) => {
      this.props.changeGenre(event.target.value)
    }

    const changeYears = (event, newValue) => {
      this.props.changeYears(newValue)
    }

    const { movies, genre, years } = this.props

    const movieList = (movies !== null) ? (
      Object.entries(movies).map((movie) => {
        return (
          <Link to={`/movie/${movie[0]}`}><ListItem button key={movie[0]}>{movie[1].name}</ListItem></Link>
        )
      })
    ) : (
        <div>There are no movies to be displayed</div>
      )
    return (
      <div>
        <Typography id="range-year" gutterBottom>
          Year range
        </Typography>
        <Slider
          onChange={changeYears}
          value={years}
          min={2000}
          max={2020}
          defaultValue={[2000, 2020]}
          valueLabelDisplay="auto"
          aria-labelledby="range-year"
        />
        <Typography id="select-genre" gutterBottom>
          Genre
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genre}
          onChange={changeGenre}
          aria-labelledby="select-genre"
        >
          <MenuItem value={''}></MenuItem>
          <MenuItem value={'Action'}>Action</MenuItem>
          <MenuItem value={'Adventure'}>Adventure</MenuItem>
        </Select>
        <List>
          {movieList}
        </List>
      </div>
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

function changeYears(years) {
  return {
    type: 'CHANGE_YEARS',
    years: years
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

function changeYearsAction(years) {
  return dispatch => {
    dispatch(changeYears(years))
  }
}

const mapStateToProps = (state, selfProps) => {
  if (state.movies) {
    return {
      genre: state.genre,
      years: state.years,
      movies: state.movies.filter(movie => state.genre ? movie.genre === state.genre : true).filter(movie => movie.productionYear >= state.years[0] && movie.productionYear <= state.years[1])
    }
  } else {
    return {
      movies: null
    }
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMovies: fetchMoviesAction,
  changeGenre: changeGenreAction,
  changeYears: changeYearsAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Movies);