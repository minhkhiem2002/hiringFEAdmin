import {
    GET_CUSTOMER_REQUEST,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMER_FAILURE,
    PUT_CUSTOMER_REQUEST,
    PUT_CUSTOMER_SUCCESS,
    PUT_CUSTOMER_FAILURE,
    POST_CUSTOMER_REQUEST,
    POST_CUSTOMER_SUCCESS,
    POST_CUSTOMER_FAILURE,
    DELETE_CUSTOMER_REQUEST,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAILURE,
  } from "../../actions/Admin/customerActions";
  
  const initialState = {
    data: null,
    error: null,
    isLoading: false,
    isSuccess : false,
    isError: false,
    addSuccess : false,
    deleteSuccess: false,
    editSuccess : false
  };
  
  const CustomerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CUSTOMER_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case GET_CUSTOMER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case GET_CUSTOMER_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case PUT_CUSTOMER_REQUEST:
        return {
          ...state,
          isLoading: true,
          editSuccess : false,
        };
      case PUT_CUSTOMER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case PUT_CUSTOMER_FAILURE:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case POST_CUSTOMER_REQUEST:
        return {
          ...state,
          isLoading: false,
          addSuccess : false
        };
      case POST_CUSTOMER_SUCCESS:
        return {
          ...state,
          isLoading: true,
          addSuccess : true,
        };
      case POST_CUSTOMER_FAILURE:
        return {
          ...state,
          isLoading: false,
          addSuccess : true,
        };
      case DELETE_CUSTOMER_REQUEST:
        return {
          ...state,
          isLoading: true,
          deleteSuccess : false
        };
      case DELETE_CUSTOMER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
          data: action.payload,
        };
      case DELETE_CUSTOMER_FAILURE:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
        };
      default:
        return state;
    }
  };
  export default CustomerReducer;
  