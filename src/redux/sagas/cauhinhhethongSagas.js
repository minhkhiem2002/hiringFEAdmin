import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { toast } from "react-toastify";
import { baseUrl } from '../const_api';
import { 
    GET_CAU_HINH_HE_THONG_REQUEST, getCauHinhHeThongSuccess, getCauHinhHeThongFailure,
    PUT_CAU_HINH_HE_THONG_REQUEST, putCauHinhHeThongSuccess, putCauHinhHeThongFailure
} from "./../actions/cauhinhhethongActions";

//GET_USER_INFO

function getCauHinhHeThongApi(id, token) {
    const filterArray = JSON.stringify(["IDNguoidung", "=", Number(id)]);
    const encodedFilter = encodeURIComponent(filterArray);
    return axios.get(`${baseUrl}Clks/Get?&filter=${encodedFilter}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
function* getCauHinhHeThong() {
    try {
        const id = sessionStorage.getItem('idnguoidung')
        const token = sessionStorage.getItem('token')
        if (!id || !token) {
            throw new Error('id người dùng và token không hợp lệ')
        }
        const response = yield call(getCauHinhHeThongApi,id,token)
        yield put(getCauHinhHeThongSuccess(response.data))
    } catch (e) {
        yield put(getCauHinhHeThongFailure(e))
    }
}

function putCauHinhHeThongApi(token, data) {
    return axios.put(baseUrl + 'Clks/Put', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
        }
    });
}

function* putCauHinhHeThong(action) {
    try {
        const {data} = action.payload
        const token = sessionStorage.getItem("token");
        if (!data || !token) {
            throw new Error('id người dùng và token không hợp lệ')
        }
        const response = yield call(putCauHinhHeThongApi, token, data)
        if (response.status == 200) {
        yield put(putCauHinhHeThongSuccess(response.data))
        toast.success("Đổi thông tin cấu hình hệ thống thành công!", {
            autoClose: 1000,
          });
        } else {
            toast.error("Đổi thông tin cấu hình hệ thống không thành công!", {
              autoClose: 1000,
            });
            yield put(putCauHinhHeThongSuccess(response.data.error));
          }
    }   catch (e) {
        toast.error("Đổi thông tin cấu hình hệ thống không thành công!", {
            autoClose: 1000,
          });
        yield put(putCauHinhHeThongFailure(e))
    }
}

function* cauhinhhethongSagas() {
    yield takeLatest(GET_CAU_HINH_HE_THONG_REQUEST, getCauHinhHeThong)
    yield takeLatest(PUT_CAU_HINH_HE_THONG_REQUEST, putCauHinhHeThong)
}

export default cauhinhhethongSagas