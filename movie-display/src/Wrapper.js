import React, { Component } from 'react';
import './Movies.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';

import Movies from './Movies'
import Movie from './Movie'

class Wrapper extends Component {

  componentDidMount() {
    this.props.fetchMovies()
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Movies} />
        <Route exact path="/movie/:id" component={Movie} />
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies
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

function fetchMoviesAction() {
  return dispatch => {
    axios.get('https://sometimes-maybe-flaky-api.gdshive.io').then(res => {
      dispatch(fetchMoviesSuccess(res.data))
    }).catch(error => {
      dispatch(fetchMoviesError(error))
    })
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMovies: fetchMoviesAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);