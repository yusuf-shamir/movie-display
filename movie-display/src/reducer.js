const initialState = {
  movies: null,
  error: null,
  byGenre: null,
  byYear: null,
  genre: ""
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        movies: action.movies,
        byGenre: { 'sport': [3] },
        byYear: { 2010: [4] },
      }
    case 'FETCH_MOVIES_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'CHANGE_GENRE':
      return {
        ...state,
        genre: action.genre
      }
    default:
      return state
  }
}

export default reducer