// Action types
export const GET_ORDERS_ADMIN_REQUEST = 'GET_ORDERS_ADMIN_REQUEST';
export const GET_ORDERS_ADMIN_SUCCESS = 'GET_ORDERS_ADMIN_SUCCESS';
export const GET_ORDERS_ADMIN_FAILURE = 'GET_ORDERS_ADMIN_FAILURE';

export const GET_SPORT_PRODUCT_COUNT_ADMIN_REQUEST = 'GET_SPORT_PRODUCT_COUNT_ADMIN_REQUEST';
export const GET_SPORT_PRODUCT_COUNT_ADMIN_SUCCESS = 'GET_SPORT_PRODUCT_COUNT_ADMIN_SUCCESS';
export const GET_SPORT_PRODUCT_COUNT_ADMIN_FAILURE = 'GET_SPORT_PRODUCT_COUNT_ADMIN_FAILURE';

export const GET_TOTAL_REVENUE_ADMIN_REQUEST = 'GET_TOTAL_REVENUE_ADMIN_REQUEST';
export const GET_TOTAL_REVENUE_ADMIN_SUCCESS = 'GET_TOTAL_REVENUE_ADMIN_SUCCESS';
export const GET_TOTAL_REVENUE_ADMIN_FAILURE = 'GET_TOTAL_REVENUE_ADMIN_FAILURE';

export const GET_REVENUE_BY_YEAR_ADMIN_REQUEST = 'GET_REVENUE_BY_YEAR_ADMIN_REQUEST';
export const GET_REVENUE_BY_YEAR_ADMIN_SUCCESS = 'GET_REVENUE_BY_YEAR_ADMIN_SUCCESS';
export const GET_REVENUE_BY_YEAR_ADMIN_FAILURE = 'GET_REVENUE_BY_YEAR_ADMIN_FAILURE';

export const GET_REVENUE_CURRENT_MONTH_ADMIN_REQUEST = 'GET_REVENUE_CURRENT_MONTH_ADMIN_REQUEST';
export const GET_REVENUE_CURRENT_MONTH_ADMIN_SUCCESS = 'GET_REVENUE_CURRENT_MONTH_ADMIN_SUCCESS';
export const GET_REVENUE_CURRENT_MONTH_ADMIN_FAILURE = 'GET_REVENUE_CURRENT_MONTH_ADMIN_FAILURE';

export const GET_REVENUE_TODAY_ADMIN_REQUEST = 'GET_REVENUE_TODAY_ADMIN_REQUEST';
export const GET_REVENUE_TODAY_ADMIN_SUCCESS = 'GET_REVENUE_TODAY_ADMIN_SUCCESS';
export const GET_REVENUE_TODAY_ADMIN_FAILURE = 'GET_REVENUE_TODAY_ADMIN_FAILURE';

// Action creators
export const getOrdersAdminRequest = () => ({
    type: GET_ORDERS_ADMIN_REQUEST
});

export const getOrdersAdminSuccess = (data) => ({
    type: GET_ORDERS_ADMIN_SUCCESS,
    payload: data
});

export const getOrdersAdminFailure = (error) => ({
    type: GET_ORDERS_ADMIN_FAILURE,
    payload: error
});

export const getSportProductCountAdminRequest = () => ({
    type: GET_SPORT_PRODUCT_COUNT_ADMIN_REQUEST
});

export const getSportProductCountAdminSuccess = (data) => ({
    type: GET_SPORT_PRODUCT_COUNT_ADMIN_SUCCESS,
    payload: data
});

export const getSportProductCountAdminFailure = (error) => ({
    type: GET_SPORT_PRODUCT_COUNT_ADMIN_FAILURE,
    payload: error
});

export const getTotalRevenueAdminRequest = () => ({
    type: GET_TOTAL_REVENUE_ADMIN_REQUEST
});

export const getTotalRevenueAdminSuccess = (data) => ({
    type: GET_TOTAL_REVENUE_ADMIN_SUCCESS,
    payload: data
});

export const getTotalRevenueAdminFailure = (error) => ({
    type: GET_TOTAL_REVENUE_ADMIN_FAILURE,
    payload: error
});

export const getRevenueByYearAdminRequest = () => ({
    type: GET_REVENUE_BY_YEAR_ADMIN_REQUEST
});

export const getRevenueByYearAdminSuccess = (data) => ({
    type: GET_REVENUE_BY_YEAR_ADMIN_SUCCESS,
    payload: data
});

export const getRevenueByYearAdminFailure = (error) => ({
    type: GET_REVENUE_BY_YEAR_ADMIN_FAILURE,
    payload: error
});

export const getRevenueCurrentMonthAdminRequest = () => ({
    type: GET_REVENUE_CURRENT_MONTH_ADMIN_REQUEST
});

export const getRevenueCurrentMonthAdminSuccess = (data) => ({
    type: GET_REVENUE_CURRENT_MONTH_ADMIN_SUCCESS,
    payload: data
});

export const getRevenueCurrentMonthAdminFailure = (error) => ({
    type: GET_REVENUE_CURRENT_MONTH_ADMIN_FAILURE,
    payload: error
});

export const getRevenueTodayAdminRequest = () => ({
    type: GET_REVENUE_TODAY_ADMIN_REQUEST
});

export const getRevenueTodayAdminSuccess = (data) => ({
    type: GET_REVENUE_TODAY_ADMIN_SUCCESS,
    payload: data
});

export const getRevenueTodayAdminFailure = (error) => ({
    type: GET_REVENUE_TODAY_ADMIN_FAILURE,
    payload: error
});
