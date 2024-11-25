import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_OWNER_REQUEST, deleteOwnerFailure, deleteOwnerSuccess, GET_OWNER_REQUEST, getOwnerFailure, getOwnerSuccess, POST_OWNER_REQUEST, postOwnerFailure, postOwnerSuccess, PUT_OWNER_REQUEST, putOwnerFailure, putOwnerSuccess } from "../../actions/Admin/ownerActions";
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
function postOwnerApi(data){
  return axios.post('https://sportappdemo.azurewebsites.net/api/User/CreateUser', data);
}
function* postOwner(action){
  try {
    const { data } = action.payload;
    const response = yield call(postOwnerApi, data);
    if(response.status == 200){
      toast.success("Thêm thành công !", {
        autoClose: 1000,
      });
      yield put(postOwnerSuccess());
    }

  } catch (error) {
    toast.error("Thêm không thành công!", {
      autoClose: 1000,
    });
    yield put(postOwnerFailure());
  }
}

function deleteOwnerApi(data){
  return axios.delete(sportUrl + `Owner/DeleteOwner`, {
    data
 });
}
function* deleteOwner(action){
  try {
    const keyDelete = action.payload;
    const data = {
      ownerId:keyDelete
    }
    const response = yield call(deleteOwnerApi, data);
    if(response.status == 200){
      toast.success("Xóa hành công !", {
        autoClose: 1000,
      });
      yield put(deleteOwnerSuccess()); 
    }else{
      toast.error("Xóa không thành công !", {
        autoClose: 1000,
      });
      yield put(deleteOwnerFailure()); 
    }
  } catch (error) {
    toast.error("Xóa không thành công!", {
      autoClose: 1000,
    });
    yield put(deleteOwnerFailure()); 
  }
}

function putOwnerApi(data){
  return axios.put(sportUrl + `Owner/UpdateOwner`, data);
}
function* putOwner(action){
  try {
    const { data } = action.payload;
    const response = yield call(putOwnerApi, data);
    if(response.status == 200){
      toast.success("Chỉnh sửa thành công!", {
        autoClose: 1000,
      });
      yield put(putOwnerSuccess());
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