const initialState = {
  movies: null,
  error: null,
  genre: "",
  years: [2000, 2020]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        movies: action.movies
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