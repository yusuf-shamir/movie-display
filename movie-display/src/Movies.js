import React, { Component } from 'react';
import './Movies.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchMoviesAction from './actions'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';

class Movies extends Component {

  componentDidMount() {
    const { movies } = this.props;

    if (!movies) {
      this.props.fetchMovies()
    }
  }

  render() {

    const changeGenre = (event) => {
      this.props.changeGenre(event.target.value)
    }

    const changeYears = (event, newValue) => {
      this.props.changeYears(newValue)
    }

    const { movies, genre, years, loading, error } = this.props

    let movieGrid;

    if (error) {
      movieGrid = (<div className="load-screen">Please close this tab and try again or click on the refresh button in the browser.</div>)
    } else {
      movieGrid = loading ? (<div className="load-screen"><CircularProgress /></div>) : ((movies !== null) ? (
        movies.map((movie) => {
          return (
            <Grid item key={movie.index} xs={12} md={4} sm={6}>
              <Card variant="outlined">
                <CardContent>
                  <div className="movie-poster">{movie.name}</div>
                  <p className="synopsis-short">{movie.synopsisShort}</p>
                  <div className="tag-container">
                    <div className="tag">{movie.productionYear}</div>
                    <div className="tag">{movie.genre}</div>
                  </div>
                </CardContent>
                <CardActions>
                  <Button style={{ "textTransform": "none" }} to={`/movie/${movie.index}`} component={Link}>Read more</Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })
      ) : (
          <div className="load-screen">There are no movies to be displayed</div>
        ))
    }
    return (
      <div>
        <Accordion id="filter-container">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List style={{ width: "calc(100% - 20px)" }}>
              <ListItem>
                <Typography id="range-year" gutterBottom>
                  Production year range
              </Typography><hr />
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
              </ListItem>
              <Divider />
              <ListItem>
                <Typography id="select-genre" gutterBottom>
                  Genre
              </Typography><hr />
                <Select
                  style={{ width: "200px" }}
                  value={genre}
                  onChange={changeGenre}
                >
                  <MenuItem value={''}>All</MenuItem>
                  <MenuItem value={'Action'}>Action</MenuItem>
                  <MenuItem value={'Adventure'}>Adventure</MenuItem>
                  <MenuItem value={'Animation'}>Animation</MenuItem>
                  <MenuItem value={'Comedy'}>Comedy</MenuItem>
                  <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
                </Select></ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Grid container spacing={4} style={{ height: "400px" }}>
          {movieGrid}
        </Grid>
      </div>
    )
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
  return {
    genre: state.genre,
    years: state.years,
    loading: state.loading,
    error: state.error,
    movies: state.movies ? state.movies.filter(movie => state.genre ? movie.genre === state.genre : true).filter(movie => movie.productionYear >= state.years[0] && movie.productionYear <= state.years[1]) : state.movies
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMovies: fetchMoviesAction,
  changeGenre: changeGenreAction,
  changeYears: changeYearsAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Movies);