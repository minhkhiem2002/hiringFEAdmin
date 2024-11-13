import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { 
    GET_USER_INFO_REQUEST, getUserInfoSuccess, getUserInfoFailure,
    PUT_USER_INFO_REQUEST, putUserInfoSuccess, putUserInfoFailure
} from '../actions/userInfoActions';
import { toast } from "react-toastify";
import { sportUrl } from '../const_api';

//GET_USER_INFO

function getUserApi(id) {
    return axios.get(sportUrl + `User/GetUser?UserId=${id}`)
}
function* getUserInfo() {
    try {
        const id = sessionStorage.getItem('id')
        if (!id) {
            throw new Error('User Id or access token not found in session')
        }
        const response = yield call(getUserApi,id)
        yield put(getUserInfoSuccess(response.data))
    } catch (e) {
        yield put(getUserInfoFailure(e))
    }
}

//PUT_USER_INFO

const putUserApi = (data) => {
    return axios.put(sportUrl + `User/UpdateUser`, data)
}

function* putUserInfo(action) {
    try {
        const {data} = action.payload
        if (!data) {
            throw new Error('User Id or access token not found in session')
        }
        const response = yield call(putUserApi, data)
        console.log(response)
        if (response.status == 200) {
        yield put(putUserInfoSuccess(response.data))
        toast.success("Đổi thông tin người dùng thành công!", {
            autoClose: 1000,
          });
        } else {
            toast.error("Đổi thông tin người dùng không thành công!", {
              autoClose: 1000,
            });
            yield put(putUserInfoSuccess(response.data.error));
          }
    }   catch (e) {
        toast.error("Đổi thông tin người dùng không thành công!", {
            autoClose: 1000,
          });
        yield put(putUserInfoFailure(e))
    }
}
function* userInfoSagas() {
    yield takeLatest(GET_USER_INFO_REQUEST, getUserInfo)
    yield takeLatest(PUT_USER_INFO_REQUEST, putUserInfo) 
}

export default userInfoSagas