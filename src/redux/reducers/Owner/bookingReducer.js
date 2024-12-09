import {
    GET_BOOKING_BY_OWNER_REQUEST,
    GET_BOOKING_BY_OWNER_SUCCESS,
    GET_BOOKING_BY_OWNER_FAILURE,
    PATCH_STATUS_BOOKING_BY_OWNER_REQUEST,
    PATCH_STATUS_BOOKING_BY_OWNER_SUCCESS,
    PATCH_STATUS_BOOKING_BY_OWNER_FAILURE,
    REJECT_BOOKING_BY_OWNER_REQUEST,
    REJECT_BOOKING_BY_OWNER_SUCCESS,
    REJECT_BOOKING_BY_OWNER_FAILURE,
} from '../../actions/Owner/bookingActions';

const initialState = {
    data: null,
    isLoading: false,
    isError: false,
    updateSuccess: false,
    rejectSuccess: false, // Thêm rejectSuccess
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKING_BY_OWNER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };

        case GET_BOOKING_BY_OWNER_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false,
            };

        case GET_BOOKING_BY_OWNER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case PATCH_STATUS_BOOKING_BY_OWNER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                updateSuccess: false, // Reset updateSuccess khi bắt đầu patch
            };

        case PATCH_STATUS_BOOKING_BY_OWNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                updateSuccess: true, // Cập nhật thành công
            };

        case PATCH_STATUS_BOOKING_BY_OWNER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                updateSuccess: false, // Không thành công
            };

        case REJECT_BOOKING_BY_OWNER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                rejectSuccess: false, // Reset rejectSuccess khi bắt đầu reject
            };

        case REJECT_BOOKING_BY_OWNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                rejectSuccess: true, // Từ chối thành công
            };

        case REJECT_BOOKING_BY_OWNER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                rejectSuccess: false, // Không thành công
            };

        default:
            return state;
    }
};

export default bookingReducer;
