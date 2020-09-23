import axios from 'axios';
import _ from 'lodash';

function fetchMoviesLoading() {
  return {
    type: 'FETCH_MOVIES_LOADING',
    loading: true
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
    dispatch(fetchMoviesLoading())
    axios.get('https://sometimes-maybe-flaky-api.gdshive.io').then(res => {
      dispatch(fetchMoviesSuccess(_.map(res.data, (elem, i) => {
        return _.extend({ index: i + 1 }, elem)
      })))
    }).catch(error => {
      dispatch(fetchMoviesError(error))
    })
  }
}

export default fetchMoviesAction