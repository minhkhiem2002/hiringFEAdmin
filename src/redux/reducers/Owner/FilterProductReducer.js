import {
  FETCH_COLORS_REQUEST,
  FETCH_COLORS_SUCCESS,
  FETCH_COLORS_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_SIZES_REQUEST,
  FETCH_SIZES_SUCCESS,
  FETCH_SIZES_FAILURE
} from "../../actions/Owner/FilterProductActions";

const initialState = {
  colors: [],
  categories: [],
  sizes: [],
  loading: false,
  error: null
};

const filterProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLORS_REQUEST:
    case FETCH_CATEGORIES_REQUEST:
    case FETCH_SIZES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_COLORS_SUCCESS:
      return { ...state, loading: false, colors: action.payload };

    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case FETCH_SIZES_SUCCESS:
      return { ...state, loading: false, sizes: action.payload };

    case FETCH_COLORS_FAILURE:
    case FETCH_CATEGORIES_FAILURE:
    case FETCH_SIZES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default filterProductReducer;
