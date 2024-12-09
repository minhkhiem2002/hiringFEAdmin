import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_ORDERS_ADMIN_REQUEST,
  getOrdersAdminSuccess,
  getOrdersAdminFailure,
  GET_SPORT_PRODUCT_COUNT_ADMIN_REQUEST,
  getSportProductCountAdminSuccess,
  getSportProductCountAdminFailure,
  GET_TOTAL_REVENUE_ADMIN_REQUEST,
  getTotalRevenueAdminSuccess,
  getTotalRevenueAdminFailure,
  GET_REVENUE_BY_YEAR_ADMIN_REQUEST,
  getRevenueByYearAdminSuccess,
  getRevenueByYearAdminFailure,
  GET_REVENUE_CURRENT_MONTH_ADMIN_REQUEST,
  getRevenueCurrentMonthAdminSuccess,
  getRevenueCurrentMonthAdminFailure,
  GET_REVENUE_TODAY_ADMIN_REQUEST,
  getRevenueTodayAdminSuccess,
  getRevenueTodayAdminFailure,
} from './../../actions/Admin/dashboardActions';

// API URLs
const API_BASE_URL = 'https://sportappdemo.azurewebsites.net/api';
const ORDERS_API_ADMIN = `${API_BASE_URL}/AdminDashboard/GetOrders`;
const SPORT_PRODUCT_COUNT_API_ADMIN = `${API_BASE_URL}/AdminDashboard/GetSportProductCount`;
const TOTAL_REVENUE_API_ADMIN = `${API_BASE_URL}/AdminDashboard/GetTotalRevenue`;
const REVENUE_YEAR_API_ADMIN = `${API_BASE_URL}/AdminDashboard/GetRevenueByYear`;
const REVENUE_CURRENT_MONTH_API_ADMIN = `${API_BASE_URL}/AdminDashboard/GetRevenueCurrentMonth`;
const REVENUE_TODAY_API_ADMIN = `${API_BASE_URL}/AdminDashboard/GetRevenueToday`;

// Workers
function* fetchOrdersAdminSaga() {
  try {
    const response = yield call(axios.get, ORDERS_API_ADMIN); // No AdminId needed
    yield put(getOrdersAdminSuccess(response.data));
  } catch (error) {
    yield put(getOrdersAdminFailure(error.message));
  }
}

function* fetchSportProductCountAdminSaga() {
  try {
    const response = yield call(axios.get, SPORT_PRODUCT_COUNT_API_ADMIN); // No AdminId needed
    yield put(getSportProductCountAdminSuccess(response.data));
  } catch (error) {
    yield put(getSportProductCountAdminFailure(error.message));
  }
}

function* fetchTotalRevenueAdminSaga() {
  try {
    const response = yield call(axios.get, TOTAL_REVENUE_API_ADMIN); // No AdminId needed
    yield put(getTotalRevenueAdminSuccess(response.data));
  } catch (error) {
    yield put(getTotalRevenueAdminFailure(error.message));
  }
}

function* fetchRevenueByYearAdminSaga() {
  try {
    const currentYear = new Date().getFullYear(); // Get current year
    const response = yield call(axios.get, `${REVENUE_YEAR_API_ADMIN}?Year=${currentYear}`); // Pass current year
    yield put(getRevenueByYearAdminSuccess(response.data));
  } catch (error) {
    yield put(getRevenueByYearAdminFailure(error.message));
  }
}

function* fetchRevenueCurrentMonthAdminSaga() {
  try {
    const response = yield call(axios.get, REVENUE_CURRENT_MONTH_API_ADMIN); // No AdminId needed
    yield put(getRevenueCurrentMonthAdminSuccess(response.data));
  } catch (error) {
    yield put(getRevenueCurrentMonthAdminFailure(error.message));
  }
}

function* fetchRevenueTodayAdminSaga() {
  try {
    const response = yield call(axios.get, REVENUE_TODAY_API_ADMIN); // No AdminId needed
    yield put(getRevenueTodayAdminSuccess(response.data));
  } catch (error) {
    yield put(getRevenueTodayAdminFailure(error.message));
  }
}

// Watchers
export default function* dashboardAdminSagas() {
  yield takeLatest(GET_ORDERS_ADMIN_REQUEST, fetchOrdersAdminSaga);
  yield takeLatest(GET_SPORT_PRODUCT_COUNT_ADMIN_REQUEST, fetchSportProductCountAdminSaga);
  yield takeLatest(GET_TOTAL_REVENUE_ADMIN_REQUEST, fetchTotalRevenueAdminSaga);
  yield takeLatest(GET_REVENUE_BY_YEAR_ADMIN_REQUEST, fetchRevenueByYearAdminSaga);
  yield takeLatest(GET_REVENUE_CURRENT_MONTH_ADMIN_REQUEST, fetchRevenueCurrentMonthAdminSaga);
  yield takeLatest(GET_REVENUE_TODAY_ADMIN_REQUEST, fetchRevenueTodayAdminSaga);
}
