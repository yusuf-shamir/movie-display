import React, { Component } from 'react';
import './Movie.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

class Movie extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div>
        <div>{movie.name}</div>
        <div>{movie.productionYear}</div>
        <div>{movie.productionYear}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, selfProps) => {
  return {
    movie: state.movies[selfProps.match.params.id]
  }
}

export default connect(mapStateToProps)(Movie);