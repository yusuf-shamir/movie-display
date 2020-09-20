import React, { Component } from 'react';
import './Movie.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';
import _ from 'lodash';

class Movie extends Component {
  render() {
    const { movie } = this.props;


    const movieDisplay = (movie !== null) ? (
      <div>
        <div>{movie.name}</div>
        <div>{movie.productionYear}</div>
        <div>{movie.productionYear}</div>
      </div>
    ) : (
        <div>Movie not found</div>
      )

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
    movie: movie ? movie : null
  }
}

export default connect(mapStateToProps)(Movie);