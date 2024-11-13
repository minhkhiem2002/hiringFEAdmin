import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_OWNER_REQUEST, deleteOwnerFailure, GET_OWNER_REQUEST, getOwnerFailure, getOwnerSuccess, POST_OWNER_REQUEST, postOwnerFailure, postOwnerSuccess, PUT_OWNER_REQUEST, putOwnerFailure, putOwnerSuccess } from "../../actions/Admin/ownerActions";
import { sportUrl } from "../../const_api";
import { toast } from "react-toastify";

function getOwnerApi() {
    return axios.get('https://sportappdemo.azurewebsites.net/api/Owner/GetAllOwner');
}
function* getOwner() {
  try {
    const response = yield call(getOwnerApi);
    if(response.status == 200){
      yield put(getOwnerSuccess(response.data));
    }
  } catch (error) {
    yield put(getOwnerFailure());
  }
}
function postOwnerApi(data, token){
  return axios.post(sportUrl + `DmBps/Post`, data, {
    headers: {
          'Authorization': `Bearer ${token}`,
    }
});
}
function* postOwner(action){
  try {
    const { data } = action.payload;
    const iddkdn = sessionStorage.getItem('iddkdn');
    const token = sessionStorage.getItem('token');
    if (!iddkdn || !token) {
      throw new Error('iddkdn và token không hợp lệ');
    }
    const response = yield call(postOwnerApi, data , token);
    if(response.status == 200){
      toast.success("Thêm thành công !", {
        autoClose: 1000,
      });
      yield put(postOwnerSuccess());
      const responseOwner = yield call(getOwnerApi, iddkdn, token);
      if(responseOwner.status == 200){
        yield put(getOwnerSuccess(responseOwner.data.data));
      }
    }

  } catch (error) {
    toast.error("Thêm không thành công!", {
      autoClose: 1000,
    });
    yield put(postOwnerFailure());
  }
}

function deleteOwnerApi(data ,token){
  return axios.delete(sportUrl + `DmBps/Delete`, {
    headers: {
          'Authorization': `Bearer ${token}`,
    },
   data
});
}
function* deleteOwner(action){
  try {
    const keyDelete = action.payload;
    const iddkdn = sessionStorage.getItem('iddkdn');
    const token = sessionStorage.getItem('token');
    if (!iddkdn || !token) {
      throw new Error('iddkdn và token không hợp lệ');
    }
    const response = yield call(deleteOwnerApi, keyDelete, token);
    if(response.status == 200){
      toast.success("Xóa hành công !", {
        autoClose: 1000,
      });
      const responseOwner = yield call(getOwnerApi, iddkdn, token);
      if(responseOwner.status == 200){
        yield put(getOwnerSuccess(responseOwner.data.data));
      }
    }else{
      toast.error("Xóa không thành công !", {
        autoClose: 1000,
      });
    }
  } catch (error) {
    toast.error("Xóa không thành công!", {
      autoClose: 1000,
    });
    yield put(deleteOwnerFailure()); 
  }
}

function putOwnerApi(data, token){
  return axios.put(sportUrl + `DmBps/Put`, data, {
    headers: {
          'Authorization': `Bearer ${token}`,
    }
  });
}
function* putOwner(action){
  try {
    const { data } = action.payload;
    const iddkdn = sessionStorage.getItem('iddkdn');
    const token = sessionStorage.getItem('token');
    if (!iddkdn || !token) {
      throw new Error('iddkdn và token không hợp lệ');
    }
    const response = yield call(putOwnerApi, data , token);
    if(response.status == 200){
      toast.success("Chỉnh sửa thành công!", {
        autoClose: 1000,
      });
      yield put(putOwnerSuccess());
      const responseOwner = yield call(getOwnerApi, iddkdn, token);
      if(responseOwner.status == 200){
        yield put(getOwnerSuccess(responseOwner.data.data));
      }
    }
  } catch (error) {
    toast.error("Chỉnh sửa không thành công!", {
      autoClose: 1000,
    });
    yield put(putOwnerFailure());
  }
}

function* OwnerSagas(){
   yield takeLatest(GET_OWNER_REQUEST, getOwner);
   yield takeLatest(POST_OWNER_REQUEST, postOwner);
   yield takeLatest(DELETE_OWNER_REQUEST, deleteOwner);
   yield takeLatest(PUT_OWNER_REQUEST, putOwner);
}
export default OwnerSagas;