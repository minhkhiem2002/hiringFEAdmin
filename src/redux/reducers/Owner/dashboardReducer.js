import {
    GET_CUSTOMERS_REQUEST,
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_FAILURE,
    GET_SPORT_FIELDS_REQUEST,
    GET_SPORT_FIELDS_SUCCESS,
    GET_SPORT_FIELDS_FAILURE,
    GET_TOTAL_REVENUE_REQUEST,
    GET_TOTAL_REVENUE_SUCCESS,
    GET_TOTAL_REVENUE_FAILURE,
    GET_BOOKING_BY_OWNER_REQUEST,
    GET_BOOKING_BY_OWNER_SUCCESS,
    GET_BOOKING_BY_OWNER_FAILURE,
    GET_REVENUE_BY_YEAR_REQUEST,
    GET_REVENUE_BY_YEAR_SUCCESS,
    GET_REVENUE_BY_YEAR_FAILURE,
    GET_REVENUE_CURRENT_MONTH_REQUEST,
    GET_REVENUE_CURRENT_MONTH_SUCCESS,
    GET_REVENUE_CURRENT_MONTH_FAILURE,
    GET_REVENUE_TODAY_REQUEST,
    GET_REVENUE_TODAY_SUCCESS,
    GET_REVENUE_TODAY_FAILURE,
  } from "./../../actions/Owner/dashboardActions";
  
  const initialState = {
    customers: {
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
    sportFields: {
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
    totalRevenue: {
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
    bookings: {
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
    revenueByYear: {
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
    revenueCurrentMonth: {
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
    revenueToday: {
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
  };
  
  const dashboardOwnerReducer = (state = initialState, action) => {
    switch (action.type) {
      // Customers
      case GET_CUSTOMERS_REQUEST:
        return {
          ...state,
          customers: { ...state.customers, isLoading: true, isError: false },
        };
      case GET_CUSTOMERS_SUCCESS:
        return {
          ...state,
          customers: { ...state.customers, isLoading: false, data: action.payload, isSuccess: true },
        };
      case GET_CUSTOMERS_FAILURE:
        return {
          ...state,
          customers: { ...state.customers, isLoading: false, isError: true, error: action.payload },
        };
  
      // Sport Fields
      case GET_SPORT_FIELDS_REQUEST:
        return {
          ...state,
          sportFields: { ...state.sportFields, isLoading: true, isError: false },
        };
      case GET_SPORT_FIELDS_SUCCESS:
        return {
          ...state,
          sportFields: { ...state.sportFields, isLoading: false, data: action.payload, isSuccess: true },
        };
      case GET_SPORT_FIELDS_FAILURE:
        return {
          ...state,
          sportFields: { ...state.sportFields, isLoading: false, isError: true, error: action.payload },
        };
  
      // Total Revenue
      case GET_TOTAL_REVENUE_REQUEST:
        return {
          ...state,
          totalRevenue: { ...state.totalRevenue, isLoading: true, isError: false },
        };
      case GET_TOTAL_REVENUE_SUCCESS:
        return {
          ...state,
          totalRevenue: { ...state.totalRevenue, isLoading: false, data: action.payload, isSuccess: true },
        };
      case GET_TOTAL_REVENUE_FAILURE:
        return {
          ...state,
          totalRevenue: { ...state.totalRevenue, isLoading: false, isError: true, error: action.payload },
        };
  
      // Bookings
      case GET_BOOKING_BY_OWNER_REQUEST:
        return {
          ...state,
          bookings: { ...state.bookings, isLoading: true, isError: false },
        };
      case GET_BOOKING_BY_OWNER_SUCCESS:
        return {
          ...state,
          bookings: { ...state.bookings, isLoading: false, data: action.payload, isSuccess: true },
        };
      case GET_BOOKING_BY_OWNER_FAILURE:
        return {
          ...state,
          bookings: { ...state.bookings, isLoading: false, isError: true, error: action.payload },
        };
  
      // Revenue By Year
      case GET_REVENUE_BY_YEAR_REQUEST:
        return {
          ...state,
          revenueByYear: { ...state.revenueByYear, isLoading: true, isError: false },
        };
      case GET_REVENUE_BY_YEAR_SUCCESS:
        return {
          ...state,
          revenueByYear: { ...state.revenueByYear, isLoading: false, data: action.payload, isSuccess: true },
        };
      case GET_REVENUE_BY_YEAR_FAILURE:
        return {
          ...state,
          revenueByYear: { ...state.revenueByYear, isLoading: false, isError: true, error: action.payload },
        };
  
      // Revenue Current Month
      case GET_REVENUE_CURRENT_MONTH_REQUEST:
        return {
          ...state,
          revenueCurrentMonth: { ...state.revenueCurrentMonth, isLoading: true, isError: false },
        };
      case GET_REVENUE_CURRENT_MONTH_SUCCESS:
        return {
          ...state,
          revenueCurrentMonth: { ...state.revenueCurrentMonth, isLoading: false, data: action.payload, isSuccess: true },
        };
      case GET_REVENUE_CURRENT_MONTH_FAILURE:
        return {
          ...state,
          revenueCurrentMonth: { ...state.revenueCurrentMonth, isLoading: false, isError: true, error: action.payload },
        };
  
      // Revenue Today
      case GET_REVENUE_TODAY_REQUEST:
        return {
          ...state,
          revenueToday: { ...state.revenueToday, isLoading: true, isError: false },
        };
      case GET_REVENUE_TODAY_SUCCESS:
        return {
          ...state,
          revenueToday: { ...state.revenueToday, isLoading: false, data: action.payload, isSuccess: true },
        };
      case GET_REVENUE_TODAY_FAILURE:
        return {
          ...state,
          revenueToday: { ...state.revenueToday, isLoading: false, isError: true, error: action.payload },
        };
  
      default:
        return state;
    }
  };
  
  export default dashboardOwnerReducer;
  