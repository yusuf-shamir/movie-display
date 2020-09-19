import React, { Component } from 'react';
import './Movie.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';

import axios from 'axios';

class Movie extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div>test</div>
    )
  }
}

export default Movie;