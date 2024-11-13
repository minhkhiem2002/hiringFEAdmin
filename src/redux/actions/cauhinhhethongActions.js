export const GET_CAU_HINH_HE_THONG_REQUEST = 'GET_CAU_HINH_HE_THONG_REQUEST'
export const GET_CAU_HINH_HE_THONG_SUCCESS = 'GET_CAU_HINH_HE_THONG_SUCCESS'
export const GET_CAU_HINH_HE_THONG_FAILURE = 'GET_CAU_HINH_HE_THONG_FAILURE'

export const PUT_CAU_HINH_HE_THONG_REQUEST = 'PUT_CAU_HINH_HE_THONG_REQUEST'
export const PUT_CAU_HINH_HE_THONG_SUCCESS = 'PUT_CAU_HINH_HE_THONG_SUCCESS'
export const PUT_CAU_HINH_HE_THONG_FAILURE = 'PUT_CAU_HINH_HE_THONG_FAILURE'

export const getCauHinhHeThongRequest = () => ({
    type: GET_CAU_HINH_HE_THONG_REQUEST,
})

export const getCauHinhHeThongSuccess = (data) => ({
    type: GET_CAU_HINH_HE_THONG_SUCCESS,
    payload: data
})

export const getCauHinhHeThongFailure = (error) => ({
    type: GET_CAU_HINH_HE_THONG_FAILURE,
    payload: {error}
})

export const putCauHinhHeThongRequest = (data) => ({
    type: PUT_CAU_HINH_HE_THONG_REQUEST,
    payload: {data}
})

export const putCauHinhHeThongSuccess = (data) => ({
    type: PUT_CAU_HINH_HE_THONG_SUCCESS,
    payload: data
})

export const putCauHinhHeThongFailure = (error) => ({
    type: PUT_CAU_HINH_HE_THONG_FAILURE,
    payload: {error}
})