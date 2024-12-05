// Action Types
export const FETCH_COLORS_REQUEST = "FETCH_COLORS_REQUEST";
export const FETCH_COLORS_SUCCESS = "FETCH_COLORS_SUCCESS";
export const FETCH_COLORS_FAILURE = "FETCH_COLORS_FAILURE";

export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";

export const FETCH_SIZES_REQUEST = "FETCH_SIZES_REQUEST";
export const FETCH_SIZES_SUCCESS = "FETCH_SIZES_SUCCESS";
export const FETCH_SIZES_FAILURE = "FETCH_SIZES_FAILURE";

// Action Creators
export const fetchColorsRequest = () => ({ type: FETCH_COLORS_REQUEST });
export const fetchColorsSuccess = colors => ({
  type: FETCH_COLORS_SUCCESS,
  payload: colors
});
export const fetchColorsFailure = error => ({
  type: FETCH_COLORS_FAILURE,
  payload: error
});

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST
});
export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories
});
export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error
});

export const fetchSizesRequest = () => ({ type: FETCH_SIZES_REQUEST });
export const fetchSizesSuccess = sizes => ({
  type: FETCH_SIZES_SUCCESS,
  payload: sizes
});
export const fetchSizesFailure = error => ({
  type: FETCH_SIZES_FAILURE,
  payload: error
});
