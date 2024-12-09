import {
    GET_BAN_REQUEST,
    GET_BAN_SUCCESS,
    GET_BAN_FAILURE,
    PUT_BAN_REQUEST,
    PUT_BAN_SUCCESS,
    PUT_BAN_FAILURE,
    POST_BAN_REQUEST,
    POST_BAN_SUCCESS,
    POST_BAN_FAILURE,
    DELETE_BAN_REQUEST,
    DELETE_BAN_SUCCESS,
    DELETE_BAN_FAILURE,
  } from "../../actions/Admin/banActions";
  
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
  
  const BanReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BAN_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case GET_BAN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case GET_BAN_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case PUT_BAN_REQUEST:
        return {
          ...state,
          isLoading: true,
          editSuccess : false,
        };
      case PUT_BAN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case PUT_BAN_FAILURE:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case POST_BAN_REQUEST:
        return {
          ...state,
          isLoading: false,
          addSuccess : false
        };
      case POST_BAN_SUCCESS:
        return {
          ...state,
          isLoading: true,
          addSuccess : true,
        };
      case POST_BAN_FAILURE:
        return {
          ...state,
          isLoading: false,
          addSuccess : true,
        };
      case DELETE_BAN_REQUEST:
        return {
          ...state,
          isLoading: true,
          deleteSuccess : false
        };
      case DELETE_BAN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
          data: action.payload,
        };
      case DELETE_BAN_FAILURE:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
        };
      default:
        return state;
    }
  };
  export default BanReducer;
  