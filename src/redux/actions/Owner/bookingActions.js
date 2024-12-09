export const GET_BOOKING_BY_OWNER_REQUEST = 'GET_BOOKING_BY_OWNER_REQUEST';
export const GET_BOOKING_BY_OWNER_SUCCESS = 'GET_BOOKING_BY_OWNER_SUCCESS';
export const GET_BOOKING_BY_OWNER_FAILURE = 'GET_BOOKING_BY_OWNER_FAILURE';

export const PATCH_STATUS_BOOKING_BY_OWNER_REQUEST = 'PATCH_STATUS_BOOKING_BY_OWNER_REQUEST';
export const PATCH_STATUS_BOOKING_BY_OWNER_SUCCESS = 'PATCH_STATUS_BOOKING_BY_OWNER_SUCCESS';
export const PATCH_STATUS_BOOKING_BY_OWNER_FAILURE = 'PATCH_STATUS_BOOKING_BY_OWNER_FAILURE';

export const REJECT_BOOKING_BY_OWNER_REQUEST = 'REJECT_BOOKING_BY_OWNER_REQUEST';
export const REJECT_BOOKING_BY_OWNER_SUCCESS = 'REJECT_BOOKING_BY_OWNER_SUCCESS';
export const REJECT_BOOKING_BY_OWNER_FAILURE = 'REJECT_BOOKING_BY_OWNER_FAILURE';

export const getBookingByOwnerRequest = (params) => ({
    type: GET_BOOKING_BY_OWNER_REQUEST,
    payload: {params}
});

export const getBookingByOwnerSuccess = (data) => ({
    type: GET_BOOKING_BY_OWNER_SUCCESS,
    payload: data
});

export const getBookingByOwnerFailure = (error) => ({
    type: GET_BOOKING_BY_OWNER_FAILURE,
    payload: error
});


export const patchStatusBookingByOwnerRequest = (bookingId) => ({
    type: PATCH_STATUS_BOOKING_BY_OWNER_REQUEST,
    payload: {bookingId}
});

export const patchStatusBookingByOwnerSuccess = (data) => ({
    type: PATCH_STATUS_BOOKING_BY_OWNER_SUCCESS,
    payload: data
});

export const patchStatusBookingByOwnerFailure = (error) => ({
    type: PATCH_STATUS_BOOKING_BY_OWNER_FAILURE,
    payload: error
});

export const rejectBookingByOwnerRequest = (data) => ({
    type: REJECT_BOOKING_BY_OWNER_REQUEST,
    payload: {data}
});

export const rejectBookingByOwnerSuccess = (data) => ({
    type: REJECT_BOOKING_BY_OWNER_SUCCESS,
    payload: data
});

export const rejectBookingByOwnerFailure = (error) => ({
    type: REJECT_BOOKING_BY_OWNER_FAILURE,
    payload: error
});
