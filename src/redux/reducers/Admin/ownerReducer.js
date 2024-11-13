import {
    GET_OWNER_REQUEST,
    GET_OWNER_SUCCESS,
    GET_OWNER_FAILURE,
    PUT_OWNER_REQUEST,
    PUT_OWNER_SUCCESS,
    PUT_OWNER_FAILURE,
    POST_OWNER_REQUEST,
    POST_OWNER_SUCCESS,
    POST_OWNER_FAILURE,
    DELETE_OWNER_REQUEST,
    DELETE_OWNER_SUCCESS,
    DELETE_OWNER_FAILURE,
  } from "../../actions/Admin/ownerActions";
  
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
  
  const OwnerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_OWNER_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case GET_OWNER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case GET_OWNER_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case PUT_OWNER_REQUEST:
        return {
          ...state,
          isLoading: true,
          editSuccess : false,
        };
      case PUT_OWNER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case PUT_OWNER_FAILURE:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case POST_OWNER_REQUEST:
        return {
          ...state,
          isLoading: false,
          addSuccess : false
        };
      case POST_OWNER_SUCCESS:
        return {
          ...state,
          isLoading: true,
          addSuccess : true,
        };
      case POST_OWNER_FAILURE:
        return {
          ...state,
          isLoading: false,
          addSuccess : true,
        };
      case DELETE_OWNER_REQUEST:
        return {
          ...state,
          isLoading: true,
          deleteSuccess : false
        };
      case DELETE_OWNER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
          data: action.payload,
        };
      case DELETE_OWNER_FAILURE:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
        };
      default:
        return state;
    }
  };
  export default OwnerReducer;
  