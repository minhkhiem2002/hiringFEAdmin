import {
    GET_FIELDS_OWNER_REQUEST,
    GET_FIELDS_OWNER_SUCCESS,
    GET_FIELDS_OWNER_FAILURE,
    PUT_FIELDS_OWNER_REQUEST,
    PUT_FIELDS_OWNER_SUCCESS,
    PUT_FIELDS_OWNER_FAILURE,
    POST_FIELDS_OWNER_REQUEST,
    POST_FIELDS_OWNER_SUCCESS,
    POST_FIELDS_OWNER_FAILURE,
    DELETE_FIELDS_OWNER_REQUEST,
    DELETE_FIELDS_OWNER_SUCCESS,
    DELETE_FIELDS_OWNER_FAILURE,
  } from "../../actions/Owner/fieldsActions";
  
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
  
  const FieldsOwnerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FIELDS_OWNER_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case GET_FIELDS_OWNER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case GET_FIELDS_OWNER_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case PUT_FIELDS_OWNER_REQUEST:
        return {
          ...state,
          isLoading: true,
          editSuccess : false,
        };
      case PUT_FIELDS_OWNER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case PUT_FIELDS_OWNER_FAILURE:
        return {
          ...state,
          isLoading: false,
          editSuccess : true,
        };
      case POST_FIELDS_OWNER_REQUEST:
        return {
          ...state,
          isLoading: false,
          addSuccess : false
        };
      case POST_FIELDS_OWNER_SUCCESS:
        return {
          ...state,
          isLoading: true,
          addSuccess : true,
        };
      case POST_FIELDS_OWNER_FAILURE:
        return {
          ...state,
          isLoading: false,
          addSuccess : true,
        };
      case DELETE_FIELDS_OWNER_REQUEST:
        return {
          ...state,
          isLoading: true,
          deleteSuccess : false
        };
      case DELETE_FIELDS_OWNER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
          data: action.payload,
        };
      case DELETE_FIELDS_OWNER_FAILURE:
        return {
          ...state,
          isLoading: false,
          deleteSuccess : true,
        };
      default:
        return state;
    }
  };
  export default FieldsOwnerReducer;
  