export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST'
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE'

export const GET_PRODUCT_DETAIL_REQUEST = 'GET_PRODUCT_DETAIL_REQUEST'
export const GET_PRODUCT_DETAIL_SUCCESS = ' GET_PRODUCT_DETAIL_SUCCESS'
export const GET_PRODUCT_DETAIL_FAILURE = 'GET_PRODUCT_DETAIL_FAILURE'

export const PUT_PRODUCT_REQUEST = 'PUT_PRODUCT_REQUEST'
export const PUT_PRODUCT_SUCCESS = 'PUT_PRODUCT_SUCCESS'
export const PUT_PRODUCT_FAILURE = 'PUT_PRODUCT_FAILURE'

export const POST_PRODUCT_REQUEST = 'POST_PRODUCT_REQUEST'
export const POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS'
export const POST_PRODUCT_FAILURE = 'POST_PRODUCT_FAILURE'

export const POST_ADDCOLOR_PRODUCT_REQUEST = 'POST_ADDCOLOR_PRODUCT_REQUEST'
export const POST_ADDCOLOR_PRODUCT_SUCCESS = 'POST_ADDCOLOR_PRODUCT_SUCCESS'
export const POST_ADDCOLOR_PRODUCT_FAILURE = 'POST_ADDCOLOR_PRODUCT_FAILURE'

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST'
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE'

export const getProductRequest = (params) => ({
    type: GET_PRODUCT_REQUEST,
    payload: params,
  });  

export const getProductSuccess = (data) => ({
    type: GET_PRODUCT_SUCCESS,
    payload: data
})

export const getProductFailure = (error) => ({
    type: GET_PRODUCT_FAILURE,
    payload: error
})

export const getProductDetailRequest = (endpoint) => ({
    type: GET_PRODUCT_DETAIL_REQUEST,
    payload: endpoint,
  });  

export const getProductDetailSuccess = (data) => ({
    type: GET_PRODUCT_DETAIL_SUCCESS,
    payload: data
})

export const getProductDetailFailure = (error) => ({
    type: GET_PRODUCT_DETAIL_FAILURE,
    payload: error
})

export const putProductRequest = (data) => ({
    type: PUT_PRODUCT_REQUEST,
    payload: {data}
})

export const putProductSuccess = () => ({
    type: PUT_PRODUCT_SUCCESS,
})

export const putProductFailure = () => ({
    type: PUT_PRODUCT_FAILURE,
})

export const postProductRequest = (data) => ({
    type: POST_PRODUCT_REQUEST,
    payload: {data}
})

export const postProductSuccess = () => ({
    type: POST_PRODUCT_SUCCESS
})

export const postProductFailure = (error) => ({
    type: POST_PRODUCT_FAILURE,
    payload: error
})

export const postAddColorProductRequest = (data) => ({
    type: POST_ADDCOLOR_PRODUCT_REQUEST,
    payload: {data}
})

export const postAddColorProductSuccess = () => ({
    type: POST_ADDCOLOR_PRODUCT_SUCCESS
})

export const postAddColorProductFailure = (error) => ({
    type: POST_ADDCOLOR_PRODUCT_FAILURE,
    payload: error
})


export const deleteProductRequest = (keyDelete) => ({
    type: DELETE_PRODUCT_REQUEST,
    payload: keyDelete
})

export const deleteProductSuccess = (data) => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload: {data}
})

export const deleteProductFailure = () => ({
    type: DELETE_PRODUCT_FAILURE,
})

