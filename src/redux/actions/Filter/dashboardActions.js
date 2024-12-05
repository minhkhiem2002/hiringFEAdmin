export const GET_SPORTPRODUCTCOUNT_REQUEST = 'GET_SPORTPRODUCTCOUNT_REQUEST'
export const GET_SPORTPRODUCTCOUNT_SUCCESS = 'GET_SPORTPRODUCTCOUNT_SUCCESS'
export const GET_SPORTPRODUCTCOUNT_FAILURE = 'GET_SPORTPRODUCTCOUNT_FAILURE'

export const GET_SPORTTYPE_REQUEST = 'GET_SPORTTYPE_REQUEST'
export const GET_SPORTTYPE_SUCCESS = 'GET_SPORTTYPE_SUCCESS'
export const GET_SPORTTYPE_FAILURE = 'GET_SPORTTYPE_FAILURE'

export const getSportTypeRequest = () => ({
    type: GET_SPORTTYPE_REQUEST
})

export const getSportTypeSuccess = (data) => ({
    type: GET_SPORTTYPE_SUCCESS,
    payload: data
})

export const getSportTypeFailure = (error) => ({
    type: GET_SPORTTYPE_FAILURE,
    payload: error
})

export const getSportProductCountRequest = () => ({
    type: GET_SPORTPRODUCTCOUNT_REQUEST
})

export const getSportProductCountSuccess = (data) => ({
    type: GET_SPORTPRODUCTCOUNT_SUCCESS,
    payload: data
})

export const getSportProductCountFailure = (error) => ({
    type: GET_SPORTPRODUCTCOUNT_FAILURE,
    payload: error
})
