import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    REJECT_ORDER_REQUEST,
    REJECT_ORDER_SUCCESS,
    REJECT_ORDER_FAILURE
} from '../../actions/Admin/orderActions';

const initialState = {
    data: null,
    isLoading: false,
    isError: false,
    updateSuccess: false,
    rejectSuccess: false,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };

        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            };

        case GET_ORDERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                isLoading: true,
                updateSuccess: false,
            };

        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updateSuccess: true,
            };

        case UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                isLoading: false,
                updateSuccess: false,
                isError: true,
            };

        case REJECT_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                rejectSuccess: false,
            };

        case REJECT_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                rejectSuccess: true,
            };

        case REJECT_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                rejectSuccess: false,
                isError: true,
            };

        default:
            return state;
    }
};

export default orderReducer;
