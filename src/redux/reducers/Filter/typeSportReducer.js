import {
    GET_SPORTTYPE_REQUEST,
    GET_SPORTTYPE_SUCCESS,
    GET_SPORTTYPE_FAILURE,
  } from "../../actions/Filter/typeSportActions";
  
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
  
  const SportTypeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SPORTTYPE_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case GET_SPORTTYPE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case GET_SPORTTYPE_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        return state;
    }
  };
  export default SportTypeReducer;
  