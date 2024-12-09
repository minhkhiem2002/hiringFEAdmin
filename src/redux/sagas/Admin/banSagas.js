import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_BAN_REQUEST, deleteBanFailure, deleteBanSuccess, GET_BAN_REQUEST, getBanFailure, getBanSuccess, POST_BAN_REQUEST, postBanFailure, postBanSuccess, PUT_BAN_REQUEST, putBanFailure, putBanSuccess } from "../../actions/Admin/banActions";
import { sportUrl } from "../../const_api";
import { toast } from "react-toastify";

function getBanApi() {
    return axios.get('https://sportappdemo.azurewebsites.net/api/BanList/GetBanLists?PageSize=100&PageNumber=1');
}
function* getBan() {
  try {
    const response = yield call(getBanApi);
    if(response.status == 200){
      yield put(getBanSuccess(response.data));
    }
  } catch (error) {
    yield put(getBanFailure());
  }
}
function postBanApi(data){
  return axios.post('https://sportappdemo.azurewebsites.net/api/User/CreateUser', data);
}
function* postBan(action){
  try {
    const { data } = action.payload;
    const response = yield call(postBanApi, data);
    if(response.status == 200){
      toast.success("Thêm thành công !", {
        autoClose: 1000,
      });
      yield put(postBanSuccess());
    }

  } catch (error) {
    toast.error("Thêm không thành công!", {
      autoClose: 1000,
    });
    yield put(postBanFailure());
  }
}

function deleteBanApi(data ){
  return axios.delete(sportUrl + `Ban/DeleteBan`, {
   data
});
}
function* deleteBan(action){
  try {
    const keyDelete = action.payload;
    const data = {
      customerId:keyDelete
    }
    const response = yield call(deleteBanApi, data);
    if(response.status == 200){
      toast.success("Xóa thành công !", {
        autoClose: 1000,
      });
      yield put(deleteBanSuccess());
    }else{
      toast.error("Xóa không thành công !", {
        autoClose: 1000,
      });
      yield put(deleteBanFailure()); 
    }
  } catch (error) {
    console.log('Error',error)
    toast.error("Xóa không thành công!", {
      autoClose: 1000,
    });
    yield put(deleteBanFailure()); 
  }
}

function putBanApi(data){
  return axios.put(sportUrl + `Ban/UpdateBan`, data);
}
function* putBan(action){
  try {
    const { data } = action.payload;
    const response = yield call(putBanApi, data);
    if(response.status == 200){
      toast.success("Chỉnh sửa thành công!", {
        autoClose: 1000,
      });
      yield put(putBanSuccess());
    }
  } catch (error) {
    toast.error("Chỉnh sửa không thành công!", {
      autoClose: 1000,
    });
    yield put(putBanFailure());
  }
}

function* BanSagas(){
   yield takeLatest(GET_BAN_REQUEST, getBan);
   yield takeLatest(POST_BAN_REQUEST, postBan);
   yield takeLatest(DELETE_BAN_REQUEST, deleteBan);
   yield takeLatest(PUT_BAN_REQUEST, putBan);
}
export default BanSagas;