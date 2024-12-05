import {
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_DETAIL_REQUEST,
    GET_PRODUCT_DETAIL_SUCCESS,
    GET_PRODUCT_DETAIL_FAILURE,
    PUT_PRODUCT_REQUEST,
    PUT_PRODUCT_SUCCESS,
    PUT_PRODUCT_FAILURE,
    POST_PRODUCT_REQUEST,
    POST_PRODUCT_SUCCESS,
    POST_PRODUCT_FAILURE,
    POST_ADDCOLOR_PRODUCT_REQUEST,
    POST_ADDCOLOR_PRODUCT_SUCCESS,
    POST_ADDCOLOR_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
  } from "../../actions/Owner/productActions";
  
  const initialState = {
    data: null,
    dataDetail: null,
    error: null,
    isLoading: false,
    isSuccess : false,
    isError: false,
    addSuccess : false,
    addColorSuccess: false,
    deleteSuccess: false,
    editSuccess : false
  };
  
  const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRODUCT_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case GET_PRODUCT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case GET_PRODUCT_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case GET_PRODUCT_DETAIL_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case GET_PRODUCT_DETAIL_SUCCESS:
        return {
          ...state,
          isLoading: false,
          dataDetail: action.payload,
        };
      case GET_PRODUCT_DETAIL_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case PUT_PRODUCT_REQUEST:
        return {
          ...state,
          isLoading: true,
          editSuccess : false,
        };
      case PUT_PRODUCT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case PUT_PRODUCT_FAILURE:
        return {
          ...state,
          isLoading: false,
          editSuccess : false,
        };
      case POST_PRODUCT_REQUEST:
        return {
          ...state,
          isLoading: true,
          addSuccess : false
        };
      case POST_PRODUCT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          addSuccess : true,
        };
      case POST_PRODUCT_FAILURE:
        return {
          ...state,
          isLoading: false,
          addSuccess : false,
        };
      case POST_ADDCOLOR_PRODUCT_REQUEST:
        return {
          ...state,
          isLoading: true,
          addColorSuccess : false
        };
      case POST_ADDCOLOR_PRODUCT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          addColorSuccess : true,
        };
      case POST_ADDCOLOR_PRODUCT_FAILURE:
        return {
          ...state,
          isLoading: false,
          addColorSuccess : false,
        };
      case DELETE_PRODUCT_REQUEST:
        return {
          ...state,
          isLoading: true,
          deleteSuccess : false
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
          data: action.payload,
        };
      case DELETE_PRODUCT_FAILURE:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : false,
        };
      default:
        return state;
    }
  };
  export default ProductReducer;
  