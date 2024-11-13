export const GET_CUSTOMER_REQUEST = 'GET_CUSTOMER_REQUEST'
export const GET_CUSTOMER_SUCCESS = 'GET_CUSTOMER_SUCCESS'
export const GET_CUSTOMER_FAILURE = 'GET_CUSTOMER_FAILURE'

export const PUT_CUSTOMER_REQUEST = 'PUT_CUSTOMER_REQUEST'
export const PUT_CUSTOMER_SUCCESS = 'PUT_CUSTOMER_SUCCESS'
export const PUT_CUSTOMER_FAILURE = 'PUT_CUSTOMER_FAILURE'

export const POST_CUSTOMER_REQUEST = 'POST_CUSTOMER_REQUEST'
export const POST_CUSTOMER_SUCCESS = 'POST_CUSTOMER_SUCCESS'
export const POST_CUSTOMER_FAILURE = 'POST_CUSTOMER_FAILURE'

export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST'
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS'
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE'

export const getCustomerRequest = () => ({
    type: GET_CUSTOMER_REQUEST
})

export const getCustomerSuccess = (data) => ({
    type: GET_CUSTOMER_SUCCESS,
    payload: data
})

export const getCustomerFailure = (error) => ({
    type: GET_CUSTOMER_FAILURE,
    payload: error
})

export const putCustomerRequest = (data) => ({
    type: PUT_CUSTOMER_REQUEST,
    payload: {data}
})

export const putCustomerSuccess = () => ({
    type: PUT_CUSTOMER_SUCCESS,
})

export const putCustomerFailure = () => ({
    type: PUT_CUSTOMER_FAILURE,
})

export const postCustomerRequest = (data) => ({
    type: POST_CUSTOMER_REQUEST,
    payload: {data}
})

export const postCustomerSuccess = () => ({
    type: POST_CUSTOMER_SUCCESS
})

export const postCustomerFailure = (error) => ({
    type: POST_CUSTOMER_FAILURE,
    payload: error
})

export const deleteCustomerRequest = (keyDelete) => ({
    type: DELETE_CUSTOMER_REQUEST,
    payload: keyDelete
})

export const deleteCustomerSuccess = (data) => ({
    type: DELETE_CUSTOMER_SUCCESS,
    payload: {data}
})

export const deleteCustomerFailure = () => ({
    type: DELETE_CUSTOMER_FAILURE,
})

