// Action types
export const GET_CUSTOMERS_REQUEST = 'GET_CUSTOMERS_REQUEST';
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS';
export const GET_CUSTOMERS_FAILURE = 'GET_CUSTOMERS_FAILURE';

export const GET_SPORT_FIELDS_REQUEST = 'GET_SPORT_FIELDS_REQUEST';
export const GET_SPORT_FIELDS_SUCCESS = 'GET_SPORT_FIELDS_SUCCESS';
export const GET_SPORT_FIELDS_FAILURE = 'GET_SPORT_FIELDS_FAILURE';

export const GET_TOTAL_REVENUE_REQUEST = 'GET_TOTAL_REVENUE_REQUEST';
export const GET_TOTAL_REVENUE_SUCCESS = 'GET_TOTAL_REVENUE_SUCCESS';
export const GET_TOTAL_REVENUE_FAILURE = 'GET_TOTAL_REVENUE_FAILURE';

export const GET_BOOKING_BY_OWNER_REQUEST = 'GET_BOOKING_BY_OWNER_REQUEST';
export const GET_BOOKING_BY_OWNER_SUCCESS = 'GET_BOOKING_BY_OWNER_SUCCESS';
export const GET_BOOKING_BY_OWNER_FAILURE = 'GET_BOOKING_BY_OWNER_FAILURE';

export const GET_REVENUE_BY_YEAR_REQUEST = 'GET_REVENUE_BY_YEAR_REQUEST';
export const GET_REVENUE_BY_YEAR_SUCCESS = 'GET_REVENUE_BY_YEAR_SUCCESS';
export const GET_REVENUE_BY_YEAR_FAILURE = 'GET_REVENUE_BY_YEAR_FAILURE';

export const GET_REVENUE_CURRENT_MONTH_REQUEST = 'GET_REVENUE_CURRENT_MONTH_REQUEST';
export const GET_REVENUE_CURRENT_MONTH_SUCCESS = 'GET_REVENUE_CURRENT_MONTH_SUCCESS';
export const GET_REVENUE_CURRENT_MONTH_FAILURE = 'GET_REVENUE_CURRENT_MONTH_FAILURE';

export const GET_REVENUE_TODAY_REQUEST = 'GET_REVENUE_TODAY_REQUEST';
export const GET_REVENUE_TODAY_SUCCESS = 'GET_REVENUE_TODAY_SUCCESS';
export const GET_REVENUE_TODAY_FAILURE = 'GET_REVENUE_TODAY_FAILURE';

// Action creators
export const getCustomersRequest = () => ({
    type: GET_CUSTOMERS_REQUEST
});

export const getCustomersSuccess = (data) => ({
    type: GET_CUSTOMERS_SUCCESS,
    payload: data
});

export const getCustomersFailure = (error) => ({
    type: GET_CUSTOMERS_FAILURE,
    payload: error
});

export const getSportFieldsRequest = () => ({
    type: GET_SPORT_FIELDS_REQUEST
});

export const getSportFieldsSuccess = (data) => ({
    type: GET_SPORT_FIELDS_SUCCESS,
    payload: data
});

export const getSportFieldsFailure = (error) => ({
    type: GET_SPORT_FIELDS_FAILURE,
    payload: error
});

export const getTotalRevenueRequest = () => ({
    type: GET_TOTAL_REVENUE_REQUEST
});

export const getTotalRevenueSuccess = (data) => ({
    type: GET_TOTAL_REVENUE_SUCCESS,
    payload: data
});

export const getTotalRevenueFailure = (error) => ({
    type: GET_TOTAL_REVENUE_FAILURE,
    payload: error
});

export const getBookingByOwnerRequest = () => ({
    type: GET_BOOKING_BY_OWNER_REQUEST
});

export const getBookingByOwnerSuccess = (data) => ({
    type: GET_BOOKING_BY_OWNER_SUCCESS,
    payload: data
});

export const getBookingByOwnerFailure = (error) => ({
    type: GET_BOOKING_BY_OWNER_FAILURE,
    payload: error
});

export const getRevenueByYearRequest = () => ({
    type: GET_REVENUE_BY_YEAR_REQUEST
});

export const getRevenueByYearSuccess = (data) => ({
    type: GET_REVENUE_BY_YEAR_SUCCESS,
    payload: data
});

export const getRevenueByYearFailure = (error) => ({
    type: GET_REVENUE_BY_YEAR_FAILURE,
    payload: error
});

export const getRevenueCurrentMonthRequest = () => ({
    type: GET_REVENUE_CURRENT_MONTH_REQUEST
});

export const getRevenueCurrentMonthSuccess = (data) => ({
    type: GET_REVENUE_CURRENT_MONTH_SUCCESS,
    payload: data
});

export const getRevenueCurrentMonthFailure = (error) => ({
    type: GET_REVENUE_CURRENT_MONTH_FAILURE,
    payload: error
});

export const getRevenueTodayRequest = () => ({
    type: GET_REVENUE_TODAY_REQUEST
});

export const getRevenueTodaySuccess = (data) => ({
    type: GET_REVENUE_TODAY_SUCCESS,
    payload: data
});

export const getRevenueTodayFailure = (error) => ({
    type: GET_REVENUE_TODAY_FAILURE,
    payload: error
});
