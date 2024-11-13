export const GET_OWNER_REQUEST = 'GET_OWNER_REQUEST'
export const GET_OWNER_SUCCESS = 'GET_OWNER_SUCCESS'
export const GET_OWNER_FAILURE = 'GET_OWNER_FAILURE'

export const PUT_OWNER_REQUEST = 'PUT_OWNER_REQUEST'
export const PUT_OWNER_SUCCESS = 'PUT_OWNER_SUCCESS'
export const PUT_OWNER_FAILURE = 'PUT_OWNER_FAILURE'

export const POST_OWNER_REQUEST = 'POST_OWNER_REQUEST'
export const POST_OWNER_SUCCESS = 'POST_OWNER_SUCCESS'
export const POST_OWNER_FAILURE = 'POST_OWNER_FAILURE'

export const DELETE_OWNER_REQUEST = 'DELETE_OWNER_REQUEST'
export const DELETE_OWNER_SUCCESS = 'DELETE_OWNER_SUCCESS'
export const DELETE_OWNER_FAILURE = 'DELETE_OWNER_FAILURE'

export const getOwnerRequest = () => ({
    type: GET_OWNER_REQUEST
})

export const getOwnerSuccess = (data) => ({
    type: GET_OWNER_SUCCESS,
    payload: data
})

export const getOwnerFailure = (error) => ({
    type: GET_OWNER_FAILURE,
    payload: error
})

export const putOwnerRequest = (data) => ({
    type: PUT_OWNER_REQUEST,
    payload: {data}
})

export const putOwnerSuccess = () => ({
    type: PUT_OWNER_SUCCESS,
})

export const putOwnerFailure = () => ({
    type: PUT_OWNER_FAILURE,
})

export const postOwnerRequest = (data) => ({
    type: POST_OWNER_REQUEST,
    payload: {data}
})

export const postOwnerSuccess = () => ({
    type: POST_OWNER_SUCCESS
})

export const postOwnerFailure = (error) => ({
    type: POST_OWNER_FAILURE,
    payload: error
})

export const deleteOwnerRequest = (keyDelete) => ({
    type: DELETE_OWNER_REQUEST,
    payload: keyDelete
})

export const deleteOwnerSuccess = (data) => ({
    type: DELETE_OWNER_SUCCESS,
    payload: {data}
})

export const deleteOwnerFailure = () => ({
    type: DELETE_OWNER_FAILURE,
})

