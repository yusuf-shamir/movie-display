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
import { sizing } from '@material-ui/system';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import _ from 'lodash';

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

    const movieGrid = (movies !== null) ? (
      movies.map((movie) => {
        return (
          <Grid item key={movie.index} xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <div className="movie-poster">{movie.name}</div>
              </CardContent>
              <CardActions>
                <Button style={{ "text-transform": "none" }} to={`/movie/${movie.index}`} component={Link}>Read more</Button>
              </CardActions>
            </Card>
          </Grid>
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
          style={{ width: "calc(100% - 20px)" }}
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
        <Grid container spacing={4} style={{ height: "400px" }}>
          {movieGrid}
        </Grid>
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
      dispatch(fetchMoviesSuccess(_.map(res.data, (elem, i) => {
        return _.extend({ index: i + 1 }, elem)
      })))
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