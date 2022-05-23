const initialState = {
  allMovie: [],
  favMovie: [],
};

export const reducer = (state = initialState, action) => {
  let allMovie;
  let favMovie;
  switch (action.type) {
    case "SUBMIT":
      allMovie = [...state.allMovie, action.payload];
      return { ...state, allMovie };

      case "DELETE_MOVIE":
        allMovie = [];
        return { ...state, allMovie };

    case "ADD_FAVORITE":
      const same = state.favMovie.find(
        (item) => item.imdbID === action.payload.imdbID
      );
      if (same === undefined) {
        favMovie = [...state.favMovie, action.payload];
        return { ...state, favMovie };
      }
    case "DELETE_FAVORITE":
      favMovie = state.favMovie.filter(
        (item, index) => index !== action.payload
      );
      return { ...state, favMovie };
    default:
      return state;
  }
};
