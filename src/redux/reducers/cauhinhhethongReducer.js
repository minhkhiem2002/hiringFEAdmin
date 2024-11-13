import {
  GET_CAU_HINH_HE_THONG_REQUEST,
  GET_CAU_HINH_HE_THONG_SUCCESS,
  GET_CAU_HINH_HE_THONG_FAILURE,
  PUT_CAU_HINH_HE_THONG_REQUEST,
  PUT_CAU_HINH_HE_THONG_SUCCESS,
  PUT_CAU_HINH_HE_THONG_FAILURE,
} from "../actions/cauhinhhethongActions";

const initialState = {
  data: null,
  error: null,
  isLoading: false,
  isSuccessGet: false,
  isError: false,
  isLoadingPut: false,
  isSuccessPut: false,
  isErrorPut: false,
};

const cauhinhhethongReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAU_HINH_HE_THONG_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_CAU_HINH_HE_THONG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_CAU_HINH_HE_THONG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case PUT_CAU_HINH_HE_THONG_REQUEST:
      return {
        ...state,
        isLoadingPut: true,
        isErrorPut: false,
        isSuccessPut: false,
      };
    case PUT_CAU_HINH_HE_THONG_SUCCESS:
      return {
        ...state,
        isLoadingPut: false,
        isSuccessPut: true,
        data: action.payload,
      };
    case PUT_CAU_HINH_HE_THONG_FAILURE:
      return {
        ...state,
        isLoadingPut: false,
        isErrorPut: true,
        isSuccessPut: false,
      };
    default:
      return state;
  }
};

export default cauhinhhethongReducer;
