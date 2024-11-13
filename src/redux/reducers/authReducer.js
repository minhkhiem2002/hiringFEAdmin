import { 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    CHECK_PASSWORD_REQUEST,CHECK_PASSWORD_SUCCESS,CHECK_PASSWORD_FAILURE,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
    LOG_OUT,
    CHECK_USER_REQUEST, CHECK_USER_SUCCESS, CHECK_USER_FAILURE
} from "../actions/authActions";

const initialState = {
    data: null,
    error: null,
    isLoading: false,
    isError: false,
    isUserSuccess: false,
    isChecked: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case LOGIN_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                isChecked: true,
                isUserSuccess: true,
                data: action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: null
            }
        case CHECK_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case CHECK_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload 
            }
        case CHECK_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload 
            }
        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case LOG_OUT:
            return {
                ...initialState,
                isChecked: false,
            }
            case CHECK_USER_REQUEST:
                return {
                  ...state,
                  isLoading: true,
                  isError: false,
                  isChecked: false,
                };
              case CHECK_USER_SUCCESS:
                return {
                  ...state,
                  isLoading: false,
                  isUserSuccess: true,
                  isChecked: true,
                  data: action.payload,
                };
              case CHECK_USER_FAILURE:
                return {
                  ...state,
                  isLoading: false,
                  isError: true,
                  isUserSuccess: false,
                  isChecked: true,
                  data: null,
                };
        default: 
            return state;
    }
}

export default authReducer