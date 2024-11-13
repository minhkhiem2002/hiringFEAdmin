import { 
    GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE,
    PUT_USER_INFO_REQUEST, PUT_USER_INFO_SUCCESS, PUT_USER_INFO_FAILURE 
} from "../actions/userInfoActions";

const initialState = {
    data: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLoadingPut: false,
    isErrorPut: false,
}

const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case GET_USER_INFO_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case GET_USER_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case PUT_USER_INFO_REQUEST:
            return {
                ...state,
                isLoadingPut: true,
                isErrorPut: false,
                isSuccess: false,
            }
        case PUT_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoadingPut: false,
                data: action.payload,
                isSuccess: true,
            }
        case PUT_USER_INFO_FAILURE:
            return {
                ...state,
                isLoadingPut: false,
                isErrorPut: true,
                isSuccess: false,
            }
        default: 
            return state;
    }
}

export default userInfoReducer