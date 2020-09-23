import React, { Component } from 'react';
import './Movie.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchMoviesAction from './actions'
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { animateScroll as scroll } from 'react-scroll'

class Movie extends Component {

  componentDidMount() {
    scroll.scrollToTop();
    const { movies } = this.props;

    if (!movies) {
      this.props.fetchMovies()
    }
  }

  render() {
    const { movie, loading, error } = this.props;

    let movieDisplay

    if (error) {
      movieDisplay = (<div className="load-screen">Please close this tab and try again or click on the refresh button in the browser.</div>)
    } else {
      movieDisplay = loading ? (<div className="load-screen"><CircularProgress /></div>) : ((movie !== null) ? (
        <div className="movie-container">
          <Paper className="paper">
            <Typography variant="h3">{movie.name}</Typography>
            <div className="tag-container">
              <div className="tag">{movie.productionYear}</div>
              <div className="tag">{movie.genre}</div>
            </div>
            <Typography>{parse(movie.synopsis)}</Typography>
          </Paper>
        </div>
      ) : (
          <div className="load-screen">Movie not found</div>
        ))
    }
    return (
      <div>
        {movieDisplay}
      </div>
    )
  }
}

const mapStateToProps = (state, selfProps) => {
  const movie = _.find(state.movies, { index: parseInt(selfProps.match.params.id) })
  return {
    movies: state.movies,
    loading: state.loading,
    error: state.error,
    movie: movie ? movie : null
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMovies: fetchMoviesAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Movie);