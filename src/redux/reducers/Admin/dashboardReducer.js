import {
  GET_ORDERS_ADMIN_REQUEST,
  GET_ORDERS_ADMIN_SUCCESS,
  GET_ORDERS_ADMIN_FAILURE,
  
  GET_SPORT_PRODUCT_COUNT_ADMIN_REQUEST,
  GET_SPORT_PRODUCT_COUNT_ADMIN_SUCCESS,
  GET_SPORT_PRODUCT_COUNT_ADMIN_FAILURE,
  
  GET_TOTAL_REVENUE_ADMIN_REQUEST,
  GET_TOTAL_REVENUE_ADMIN_SUCCESS,
  GET_TOTAL_REVENUE_ADMIN_FAILURE,
  
  GET_REVENUE_BY_YEAR_ADMIN_REQUEST,
  GET_REVENUE_BY_YEAR_ADMIN_SUCCESS,
  GET_REVENUE_BY_YEAR_ADMIN_FAILURE,
  
  GET_REVENUE_CURRENT_MONTH_ADMIN_REQUEST,
  GET_REVENUE_CURRENT_MONTH_ADMIN_SUCCESS,
  GET_REVENUE_CURRENT_MONTH_ADMIN_FAILURE,
  
  GET_REVENUE_TODAY_ADMIN_REQUEST,
  GET_REVENUE_TODAY_ADMIN_SUCCESS,
  GET_REVENUE_TODAY_ADMIN_FAILURE
} from '../../actions/Admin/dashboardActions';

// Initial state
const initialState = {
  orders: {
    loading: false,
    data: [],
    error: null
  },
  sportProductCount: {
    loading: false,
    data: null,
    error: null
  },
  totalRevenue: {
    loading: false,
    data: null,
    error: null
  },
  revenueByYear: {
    loading: false,
    data: null,
    error: null
  },
  revenueCurrentMonth: {
    loading: false,
    data: null,
    error: null
  },
  revenueToday: {
    loading: false,
    data: null,
    error: null
  }
};

const dashboardAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    // Orders
    case GET_ORDERS_ADMIN_REQUEST:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: true
        }
      };
    case GET_ORDERS_ADMIN_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: false,
          data: action.payload
        }
      };
    case GET_ORDERS_ADMIN_FAILURE:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: false,
          error: action.payload
        }
      };

    // Sport Product Count
    case GET_SPORT_PRODUCT_COUNT_ADMIN_REQUEST:
      return {
        ...state,
        sportProductCount: {
          ...state.sportProductCount,
          loading: true
        }
      };
    case GET_SPORT_PRODUCT_COUNT_ADMIN_SUCCESS:
      return {
        ...state,
        sportProductCount: {
          ...state.sportProductCount,
          loading: false,
          data: action.payload
        }
      };
    case GET_SPORT_PRODUCT_COUNT_ADMIN_FAILURE:
      return {
        ...state,
        sportProductCount: {
          ...state.sportProductCount,
          loading: false,
          error: action.payload
        }
      };

    // Total Revenue
    case GET_TOTAL_REVENUE_ADMIN_REQUEST:
      return {
        ...state,
        totalRevenue: {
          ...state.totalRevenue,
          loading: true
        }
      };
    case GET_TOTAL_REVENUE_ADMIN_SUCCESS:
      return {
        ...state,
        totalRevenue: {
          ...state.totalRevenue,
          loading: false,
          data: action.payload
        }
      };
    case GET_TOTAL_REVENUE_ADMIN_FAILURE:
      return {
        ...state,
        totalRevenue: {
          ...state.totalRevenue,
          loading: false,
          error: action.payload
        }
      };

    // Revenue By Year
    case GET_REVENUE_BY_YEAR_ADMIN_REQUEST:
      return {
        ...state,
        revenueByYear: {
          ...state.revenueByYear,
          loading: true
        }
      };
    case GET_REVENUE_BY_YEAR_ADMIN_SUCCESS:
      return {
        ...state,
        revenueByYear: {
          ...state.revenueByYear,
          loading: false,
          data: action.payload
        }
      };
    case GET_REVENUE_BY_YEAR_ADMIN_FAILURE:
      return {
        ...state,
        revenueByYear: {
          ...state.revenueByYear,
          loading: false,
          error: action.payload
        }
      };

    // Revenue Current Month
    case GET_REVENUE_CURRENT_MONTH_ADMIN_REQUEST:
      return {
        ...state,
        revenueCurrentMonth: {
          ...state.revenueCurrentMonth,
          loading: true
        }
      };
    case GET_REVENUE_CURRENT_MONTH_ADMIN_SUCCESS:
      return {
        ...state,
        revenueCurrentMonth: {
          ...state.revenueCurrentMonth,
          loading: false,
          data: action.payload
        }
      };
    case GET_REVENUE_CURRENT_MONTH_ADMIN_FAILURE:
      return {
        ...state,
        revenueCurrentMonth: {
          ...state.revenueCurrentMonth,
          loading: false,
          error: action.payload
        }
      };

    // Revenue Today
    case GET_REVENUE_TODAY_ADMIN_REQUEST:
      return {
        ...state,
        revenueToday: {
          ...state.revenueToday,
          loading: true
        }
      };
    case GET_REVENUE_TODAY_ADMIN_SUCCESS:
      return {
        ...state,
        revenueToday: {
          ...state.revenueToday,
          loading: false,
          data: action.payload
        }
      };
    case GET_REVENUE_TODAY_ADMIN_FAILURE:
      return {
        ...state,
        revenueToday: {
          ...state.revenueToday,
          loading: false,
          error: action.payload
        }
      };

    default:
      return state;
  }
};

export default dashboardAdminReducer;
