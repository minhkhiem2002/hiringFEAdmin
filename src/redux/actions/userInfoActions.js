export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST'
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE'

export const PUT_USER_INFO_REQUEST = 'PUT_USER_INFO_REQUEST'
export const PUT_USER_INFO_SUCCESS = 'PUT_USER_INFO_SUCCESS'
export const PUT_USER_INFO_FAILURE = 'PUT_USER_INFO_FAILURE'

export const getUserInfoRequest = () => ({
    type: GET_USER_INFO_REQUEST,
})

export const getUserInfoSuccess = (data) => ({
    type: GET_USER_INFO_SUCCESS,
    payload: data
})

export const getUserInfoFailure = (error) => ({
    type: GET_USER_INFO_FAILURE,
    payload: {error}
})

export const putUserInfoRequest = (data) => ({
    type: PUT_USER_INFO_REQUEST,
    payload: { data }
})

export const putUserInfoSuccess = (data) => ({
    type: PUT_USER_INFO_SUCCESS,
    payload: data
})

export const putUserInfoFailure = (error) => ({
    type: PUT_USER_INFO_FAILURE,
    payload: {error}
})