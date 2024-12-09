export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';

export const UPDATE_ORDER_STATUS_REQUEST = 'UPDATE_ORDER_STATUS_REQUEST';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const UPDATE_ORDER_STATUS_FAILURE = 'UPDATE_ORDER_STATUS_FAILURE';

export const REJECT_ORDER_REQUEST = 'REJECT_ORDER_REQUEST';
export const REJECT_ORDER_SUCCESS = 'REJECT_ORDER_SUCCESS';
export const REJECT_ORDER_FAILURE = 'REJECT_ORDER_FAILURE';

export const getOrdersRequest = (params) => ({
    type: GET_ORDERS_REQUEST,
    payload: params
});

export const getOrdersSuccess = (data) => ({
    type: GET_ORDERS_SUCCESS,
    payload: data
});

export const getOrdersFailure = (error) => ({
    type: GET_ORDERS_FAILURE,
    payload: error
});

export const updateOrderStatusRequest = (orderId) => ({
    type: UPDATE_ORDER_STATUS_REQUEST,
    payload: { orderId }
});

export const updateOrderStatusSuccess = (data) => ({
    type: UPDATE_ORDER_STATUS_SUCCESS,
    payload: data
});

export const updateOrderStatusFailure = (error) => ({
    type: UPDATE_ORDER_STATUS_FAILURE,
    payload: error
});

export const rejectOrderRequest = (data) => ({
    type: REJECT_ORDER_REQUEST,
    payload: { data }
});

export const rejectOrderSuccess = (data) => ({
    type: REJECT_ORDER_SUCCESS,
    payload: data
});

export const rejectOrderFailure = (error) => ({
    type: REJECT_ORDER_FAILURE,
    payload: error
});