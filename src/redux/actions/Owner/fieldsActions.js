export const GET_FIELDS_OWNER_REQUEST = 'GET_FIELDS_OWNER_REQUEST'
export const GET_FIELDS_OWNER_SUCCESS = 'GET_FIELDS_OWNER_SUCCESS'
export const GET_FIELDS_OWNER_FAILURE = 'GET_FIELDS_OWNER_FAILURE'

export const PUT_FIELDS_OWNER_REQUEST = 'PUT_FIELDS_OWNER_REQUEST'
export const PUT_FIELDS_OWNER_SUCCESS = 'PUT_FIELDS_OWNER_SUCCESS'
export const PUT_FIELDS_OWNER_FAILURE = 'PUT_FIELDS_OWNER_FAILURE'

export const POST_FIELDS_OWNER_REQUEST = 'POST_FIELDS_OWNER_REQUEST'
export const POST_FIELDS_OWNER_SUCCESS = 'POST_FIELDS_OWNER_SUCCESS'
export const POST_FIELDS_OWNER_FAILURE = 'POST_FIELDS_OWNER_FAILURE'

export const DELETE_FIELDS_OWNER_REQUEST = 'DELETE_FIELDS_OWNER_REQUEST'
export const DELETE_FIELDS_OWNER_SUCCESS = 'DELETE_FIELDS_OWNER_SUCCESS'
export const DELETE_FIELDS_OWNER_FAILURE = 'DELETE_FIELDS_OWNER_FAILURE'

export const getFieldsOwnerRequest = (OwnerId) => ({
    type: GET_FIELDS_OWNER_REQUEST,
    payload: {OwnerId}
})

export const getFieldsOwnerSuccess = (data) => ({
    type: GET_FIELDS_OWNER_SUCCESS,
    payload: data
})

export const getFieldsOwnerFailure = (error) => ({
    type: GET_FIELDS_OWNER_FAILURE,
    payload: error
})

export const putFieldsOwnerRequest = (data) => ({
    type: PUT_FIELDS_OWNER_REQUEST,
    payload: {data}
})

export const putFieldsOwnerSuccess = () => ({
    type: PUT_FIELDS_OWNER_SUCCESS,
})

export const putFieldsOwnerFailure = () => ({
    type: PUT_FIELDS_OWNER_FAILURE,
})

export const postFieldsOwnerRequest = (data) => ({
    type: POST_FIELDS_OWNER_REQUEST,
    payload: {data}
})

export const postFieldsOwnerSuccess = () => ({
    type: POST_FIELDS_OWNER_SUCCESS
})

export const postFieldsOwnerFailure = (error) => ({
    type: POST_FIELDS_OWNER_FAILURE,
    payload: error
})

export const deleteFieldsOwnerRequest = (keyDelete) => ({
    type: DELETE_FIELDS_OWNER_REQUEST,
    payload: keyDelete
})

export const deleteFieldsOwnerSuccess = (data) => ({
    type: DELETE_FIELDS_OWNER_SUCCESS,
    payload: {data}
})

export const deleteFieldsOwnerFailure = () => ({
    type: DELETE_FIELDS_OWNER_FAILURE,
})

