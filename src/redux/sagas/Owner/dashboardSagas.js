import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_CUSTOMERS_REQUEST,
  getCustomersSuccess,
  getCustomersFailure,
  GET_SPORT_FIELDS_REQUEST,
  getSportFieldsSuccess,
  getSportFieldsFailure,
  GET_TOTAL_REVENUE_REQUEST,
  getTotalRevenueSuccess,
  getTotalRevenueFailure,
  GET_BOOKING_BY_OWNER_REQUEST,
  getBookingByOwnerSuccess,
  getBookingByOwnerFailure,
  GET_REVENUE_BY_YEAR_REQUEST,
  getRevenueByYearSuccess,
  getRevenueByYearFailure,
  GET_REVENUE_CURRENT_MONTH_REQUEST,
  getRevenueCurrentMonthSuccess,
  getRevenueCurrentMonthFailure,
  GET_REVENUE_TODAY_REQUEST,
  getRevenueTodaySuccess,
  getRevenueTodayFailure,
} from './../../actions/Owner/dashboardActions';

// API URLs
const API_BASE_URL = 'https://sportappdemo.azurewebsites.net/api';
const CUSTOMERS_API = `${API_BASE_URL}/OwnerDashboard/GetCustomers`;
const SPORT_FIELDS_API = `${API_BASE_URL}/OwnerDashboard/GetSportFields`;
const TOTAL_REVENUE_API = `${API_BASE_URL}/OwnerDashboard/GetTotalRevenue`;
const BOOKINGS_API = `${API_BASE_URL}/OwnerDashboard/GetBookingsByOwner`;
const REVENUE_YEAR_API = `${API_BASE_URL}/OwnerDashboard/GetRevenueByYear`;
const REVENUE_CURRENT_MONTH_API = `${API_BASE_URL}/OwnerDashboard/GetRevenueCurrentMonth`;
const REVENUE_TODAY_API = `${API_BASE_URL}/OwnerDashboard/GetRevenueToday`;

// Helper to get OwnerId from sessionStorage
function getOwnerId() {
  return sessionStorage.getItem('userRoleId');
}

// Workers
function* fetchCustomersSaga() {
  try {
    const OwnerId = getOwnerId();
    const response = yield call(axios.get, `${CUSTOMERS_API}?OwnerId=${OwnerId}`);
    yield put(getCustomersSuccess(response.data));
  } catch (error) {
    yield put(getCustomersFailure(error.message));
  }
}

function* fetchSportFieldsSaga() {
  try {
    const OwnerId = getOwnerId();
    const response = yield call(axios.get, `${SPORT_FIELDS_API}?OwnerId=${OwnerId}`);
    yield put(getSportFieldsSuccess(response.data));
  } catch (error) {
    yield put(getSportFieldsFailure(error.message));
  }
}

function* fetchTotalRevenueSaga() {
  try {
    const OwnerId = getOwnerId();
    const response = yield call(axios.get, `${TOTAL_REVENUE_API}?OwnerId=${OwnerId}`);
    yield put(getTotalRevenueSuccess(response.data));
  } catch (error) {
    yield put(getTotalRevenueFailure(error.message));
  }
}

function* fetchBookingsSaga() {
  try {
    const OwnerId = getOwnerId();
    const response = yield call(axios.get, `${BOOKINGS_API}?OwnerId=${OwnerId}&PageSize=9&PageNumber=1`);
    yield put(getBookingByOwnerSuccess(response.data));
  } catch (error) {
    yield put(getBookingByOwnerFailure(error.message));
  }
}

function* fetchRevenueByYearSaga() {
  try {
    const OwnerId = getOwnerId();
    const response = yield call(axios.get, `${REVENUE_YEAR_API}?OwnerId=${OwnerId}`);
    yield put(getRevenueByYearSuccess(response.data));
  } catch (error) {
    yield put(getRevenueByYearFailure(error.message));
  }
}

function* fetchRevenueCurrentMonthSaga() {
  try {
    const OwnerId = getOwnerId();
    const response = yield call(axios.get, `${REVENUE_CURRENT_MONTH_API}?OwnerId=${OwnerId}`);
    yield put(getRevenueCurrentMonthSuccess(response.data));
  } catch (error) {
    yield put(getRevenueCurrentMonthFailure(error.message));
  }
}

function* fetchRevenueTodaySaga() {
  try {
    const OwnerId = getOwnerId();
    const response = yield call(axios.get, `${REVENUE_TODAY_API}?OwnerId=${OwnerId}`);
    yield put(getRevenueTodaySuccess(response.data));
  } catch (error) {
    yield put(getRevenueTodayFailure(error.message));
  }
}

// Watchers
export default function* dashboardSagas() {
  yield takeLatest(GET_CUSTOMERS_REQUEST, fetchCustomersSaga);
  yield takeLatest(GET_SPORT_FIELDS_REQUEST, fetchSportFieldsSaga);
  yield takeLatest(GET_TOTAL_REVENUE_REQUEST, fetchTotalRevenueSaga);
  yield takeLatest(GET_BOOKING_BY_OWNER_REQUEST, fetchBookingsSaga);
  yield takeLatest(GET_REVENUE_BY_YEAR_REQUEST, fetchRevenueByYearSaga);
  yield takeLatest(GET_REVENUE_CURRENT_MONTH_REQUEST, fetchRevenueCurrentMonthSaga);
  yield takeLatest(GET_REVENUE_TODAY_REQUEST, fetchRevenueTodaySaga);
}
