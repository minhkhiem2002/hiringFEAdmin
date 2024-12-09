export const GET_BAN_REQUEST = 'GET_BAN_REQUEST'
export const GET_BAN_SUCCESS = 'GET_BAN_SUCCESS'
export const GET_BAN_FAILURE = 'GET_BAN_FAILURE'

export const PUT_BAN_REQUEST = 'PUT_BAN_REQUEST'
export const PUT_BAN_SUCCESS = 'PUT_BAN_SUCCESS'
export const PUT_BAN_FAILURE = 'PUT_BAN_FAILURE'

export const POST_BAN_REQUEST = 'POST_BAN_REQUEST'
export const POST_BAN_SUCCESS = 'POST_BAN_SUCCESS'
export const POST_BAN_FAILURE = 'POST_BAN_FAILURE'

export const DELETE_BAN_REQUEST = 'DELETE_BAN_REQUEST'
export const DELETE_BAN_SUCCESS = 'DELETE_BAN_SUCCESS'
export const DELETE_BAN_FAILURE = 'DELETE_BAN_FAILURE'

export const getBanRequest = () => ({
    type: GET_BAN_REQUEST
})

export const getBanSuccess = (data) => ({
    type: GET_BAN_SUCCESS,
    payload: data
})

export const getBanFailure = (error) => ({
    type: GET_BAN_FAILURE,
    payload: error
})

export const putBanRequest = (data) => ({
    type: PUT_BAN_REQUEST,
    payload: {data}
})

export const putBanSuccess = () => ({
    type: PUT_BAN_SUCCESS,
})

export const putBanFailure = () => ({
    type: PUT_BAN_FAILURE,
})

export const postBanRequest = (data) => ({
    type: POST_BAN_REQUEST,
    payload: {data}
})

export const postBanSuccess = () => ({
    type: POST_BAN_SUCCESS
})

export const postBanFailure = (error) => ({
    type: POST_BAN_FAILURE,
    payload: error
})

export const deleteBanRequest = (keyDelete) => ({
    type: DELETE_BAN_REQUEST,
    payload: keyDelete
})

export const deleteBanSuccess = (data) => ({
    type: DELETE_BAN_SUCCESS,
    payload: {data}
})

export const deleteBanFailure = () => ({
    type: DELETE_BAN_FAILURE,
})

