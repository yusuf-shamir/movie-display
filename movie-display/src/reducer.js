const initialState = {
  movies: null,
  error: null,
  genre: "",
  years: [2000, 2020],
  loading: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        movies: action.movies,
        loading: false
      }
    case 'FETCH_MOVIES_ERROR':
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case 'CHANGE_GENRE':
      return {
        ...state,
        genre: action.genre
      }
    case 'CHANGE_YEARS':
      return {
        ...state,
        years: action.years
      }
    default:
      return state
  }
}

export default reducer