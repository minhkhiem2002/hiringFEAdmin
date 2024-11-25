import {
    GET_VOUCHER_REQUEST,
    GET_VOUCHER_SUCCESS,
    GET_VOUCHER_FAILURE,
    PUT_VOUCHER_REQUEST,
    PUT_VOUCHER_SUCCESS,
    PUT_VOUCHER_FAILURE,
    POST_VOUCHER_REQUEST,
    POST_VOUCHER_SUCCESS,
    POST_VOUCHER_FAILURE,
    DELETE_VOUCHER_REQUEST,
    DELETE_VOUCHER_SUCCESS,
    DELETE_VOUCHER_FAILURE,
  } from "../../actions/Owner/voucherActions";
  
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
  
  const VoucherReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_VOUCHER_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case GET_VOUCHER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case GET_VOUCHER_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case PUT_VOUCHER_REQUEST:
        return {
          ...state,
          isLoading: true,
          editSuccess : false,
        };
      case PUT_VOUCHER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case PUT_VOUCHER_FAILURE:
        return {
          ...state,
          isLoading: false,
          editSuccess : false,
        };
      case POST_VOUCHER_REQUEST:
        return {
          ...state,
          isLoading: true,
          addSuccess : false
        };
      case POST_VOUCHER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          addSuccess : true,
        };
      case POST_VOUCHER_FAILURE:
        return {
          ...state,
          isLoading: false,
          addSuccess : false,
        };
      case DELETE_VOUCHER_REQUEST:
        return {
          ...state,
          isLoading: true,
          deleteSuccess : false
        };
      case DELETE_VOUCHER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
          data: action.payload,
        };
      case DELETE_VOUCHER_FAILURE:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : false,
        };
      default:
        return state;
    }
  };
  export default VoucherReducer;
  