export const GET_VOUCHER_REQUEST = 'GET_VOUCHER_REQUEST'
export const GET_VOUCHER_SUCCESS = 'GET_VOUCHER_SUCCESS'
export const GET_VOUCHER_FAILURE = 'GET_VOUCHER_FAILURE'

export const PUT_VOUCHER_REQUEST = 'PUT_VOUCHER_REQUEST'
export const PUT_VOUCHER_SUCCESS = 'PUT_VOUCHER_SUCCESS'
export const PUT_VOUCHER_FAILURE = 'PUT_VOUCHER_FAILURE'

export const POST_VOUCHER_REQUEST = 'POST_VOUCHER_REQUEST'
export const POST_VOUCHER_SUCCESS = 'POST_VOUCHER_SUCCESS'
export const POST_VOUCHER_FAILURE = 'POST_VOUCHER_FAILURE'

export const DELETE_VOUCHER_REQUEST = 'DELETE_VOUCHER_REQUEST'
export const DELETE_VOUCHER_SUCCESS = 'DELETE_VOUCHER_SUCCESS'
export const DELETE_VOUCHER_FAILURE = 'DELETE_VOUCHER_FAILURE'

export const getVoucherRequest = (data) => ({
    type: GET_VOUCHER_REQUEST,
    payload: {data}
})

export const getVoucherSuccess = (data) => ({
    type: GET_VOUCHER_SUCCESS,
    payload: data
})

export const getVoucherFailure = (error) => ({
    type: GET_VOUCHER_FAILURE,
    payload: error
})

export const putVoucherRequest = (data) => ({
    type: PUT_VOUCHER_REQUEST,
    payload: {data}
})

export const putVoucherSuccess = () => ({
    type: PUT_VOUCHER_SUCCESS,
})

export const putVoucherFailure = () => ({
    type: PUT_VOUCHER_FAILURE,
})

export const postVoucherRequest = (data) => ({
    type: POST_VOUCHER_REQUEST,
    payload: {data}
})

export const postVoucherSuccess = () => ({
    type: POST_VOUCHER_SUCCESS
})

export const postVoucherFailure = (error) => ({
    type: POST_VOUCHER_FAILURE,
    payload: error
})

export const deleteVoucherRequest = (keyDelete) => ({
    type: DELETE_VOUCHER_REQUEST,
    payload: keyDelete
})

export const deleteVoucherSuccess = (data) => ({
    type: DELETE_VOUCHER_SUCCESS,
    payload: {data}
})

export const deleteVoucherFailure = () => ({
    type: DELETE_VOUCHER_FAILURE,
})

