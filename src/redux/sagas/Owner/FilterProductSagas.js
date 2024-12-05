import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_COLORS_REQUEST,
  fetchColorsSuccess,
  fetchColorsFailure,
  FETCH_CATEGORIES_REQUEST,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  FETCH_SIZES_REQUEST,
  fetchSizesSuccess,
  fetchSizesFailure,
} from '../../actions/Owner/FilterProductActions';

// API URLs
const COLORS_API = 'https://sportappdemo.azurewebsites.net/api/Color/GetColors';
const CATEGORIES_API = 'https://sportappdemo.azurewebsites.net/api/Category/GetCategories';
const SIZES_API = 'https://sportappdemo.azurewebsites.net/api/Size/GetSizes';

// Workers
function* fetchColorsSaga() {
  try {
    const response = yield call(axios.get, COLORS_API);
    yield put(fetchColorsSuccess(response.data));
  } catch (error) {
    yield put(fetchColorsFailure(error.message));
  }
}

function* fetchCategoriesSaga() {
  try {
    const response = yield call(axios.get, CATEGORIES_API);
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

function* fetchSizesSaga() {
  try {
    const response = yield call(axios.get, SIZES_API);
    yield put(fetchSizesSuccess(response.data));
  } catch (error) {
    yield put(fetchSizesFailure(error.message));
  }
}

// Watchers
export default function* filterProductSaga() {
  yield takeLatest(FETCH_COLORS_REQUEST, fetchColorsSaga);
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
  yield takeLatest(FETCH_SIZES_REQUEST, fetchSizesSaga);
}
