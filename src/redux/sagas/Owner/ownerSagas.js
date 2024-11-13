import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_FIELDS_OWNER_REQUEST, deleteFieldsOwnerFailure, GET_FIELDS_OWNER_REQUEST, getFieldsOwnerFailure, getFieldsOwnerSuccess, POST_FIELDS_OWNER_REQUEST, postFieldsOwnerFailure, postFieldsOwnerSuccess, PUT_FIELDS_OWNER_REQUEST, putFieldsOwnerFailure, putFieldsOwnerSuccess } from "../../actions/Owner/fieldsActions";
import { sportUrl } from "../../const_api";
import { toast } from "react-toastify";

function getFieldsOwnerApi(OwnerId) {
    return axios.get(`https://sportappdemo.azurewebsites.net/api/Owner/GetFields?OwnerId=${OwnerId}`);
}
function* getFieldsOwner(action) {
  try {
    const {OwnerId} = action.payload;
    console.log(action.payload)
    const response = yield call(getFieldsOwnerApi,OwnerId);
    if(response.status == 200){
      yield put(getFieldsOwnerSuccess(response.data));
    }
  } catch (error) {
    yield put(getFieldsOwnerFailure());
  }
}
function postFieldsOwnerApi(data, token){
  return axios.post(sportUrl + `DmBps/Post`, data, {
    headers: {
          'Authorization': `Bearer ${token}`,
    }
});
}
function* postFieldsOwner(action){
  try {
    const { data } = action.payload;
    const iddkdn = sessionStorage.getItem('iddkdn');
    const token = sessionStorage.getItem('token');
    if (!iddkdn || !token) {
      throw new Error('iddkdn và token không hợp lệ');
    }
    const response = yield call(postFieldsOwnerApi, data , token);
    if(response.status == 200){
      toast.success("Thêm thành công !", {
        autoClose: 1000,
      });
      yield put(postFieldsOwnerSuccess());
      const responseFieldsOwner = yield call(getFieldsOwnerApi, iddkdn, token);
      if(responseFieldsOwner.status == 200){
        yield put(getFieldsOwnerSuccess(responseFieldsOwner.data.data));
      }
    }

  } catch (error) {
    toast.error("Thêm không thành công!", {
      autoClose: 1000,
    });
    yield put(postFieldsOwnerFailure());
  }
}

function deleteFieldsOwnerApi(data ,token){
  return axios.delete(sportUrl + `DmBps/Delete`, {
    headers: {
          'Authorization': `Bearer ${token}`,
    },
   data
});
}
function* deleteFieldsOwner(action){
  try {
    const keyDelete = action.payload;
    const iddkdn = sessionStorage.getItem('iddkdn');
    const token = sessionStorage.getItem('token');
    if (!iddkdn || !token) {
      throw new Error('iddkdn và token không hợp lệ');
    }
    const response = yield call(deleteFieldsOwnerApi, keyDelete, token);
    if(response.status == 200){
      toast.success("Xóa hành công !", {
        autoClose: 1000,
      });
      const responseFieldsOwner = yield call(getFieldsOwnerApi, iddkdn, token);
      if(responseFieldsOwner.status == 200){
        yield put(getFieldsOwnerSuccess(responseFieldsOwner.data.data));
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
    yield put(deleteFieldsOwnerFailure()); 
  }
}

function putFieldsOwnerApi(data, token){
  return axios.put(sportUrl + `DmBps/Put`, data, {
    headers: {
          'Authorization': `Bearer ${token}`,
    }
  });
}
function* putFieldsOwner(action){
  try {
    const { data } = action.payload;
    const iddkdn = sessionStorage.getItem('iddkdn');
    const token = sessionStorage.getItem('token');
    if (!iddkdn || !token) {
      throw new Error('iddkdn và token không hợp lệ');
    }
    const response = yield call(putFieldsOwnerApi, data , token);
    if(response.status == 200){
      toast.success("Chỉnh sửa thành công!", {
        autoClose: 1000,
      });
      yield put(putFieldsOwnerSuccess());
      const responseFieldsOwner = yield call(getFieldsOwnerApi, iddkdn, token);
      if(responseFieldsOwner.status == 200){
        yield put(getFieldsOwnerSuccess(responseFieldsOwner.data.data));
      }
    }
  } catch (error) {
    toast.error("Chỉnh sửa không thành công!", {
      autoClose: 1000,
    });
    yield put(putFieldsOwnerFailure());
  }
}

function* FieldsOwnerSagas(){
   yield takeLatest(GET_FIELDS_OWNER_REQUEST, getFieldsOwner);
   yield takeLatest(POST_FIELDS_OWNER_REQUEST, postFieldsOwner);
   yield takeLatest(DELETE_FIELDS_OWNER_REQUEST, deleteFieldsOwner);
   yield takeLatest(PUT_FIELDS_OWNER_REQUEST, putFieldsOwner);
}
export default FieldsOwnerSagas;