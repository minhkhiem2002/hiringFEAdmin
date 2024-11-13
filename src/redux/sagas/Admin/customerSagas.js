import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_CUSTOMER_REQUEST, deleteCustomerFailure, GET_CUSTOMER_REQUEST, getCustomerFailure, getCustomerSuccess, POST_CUSTOMER_REQUEST, postCustomerFailure, postCustomerSuccess, PUT_CUSTOMER_REQUEST, putCustomerFailure, putCustomerSuccess } from "../../actions/Admin/customerActions";
import { sportUrl } from "../../const_api";
import { toast } from "react-toastify";

function getCustomerApi() {
    return axios.get('https://sportappdemo.azurewebsites.net/api/Customer/GetAllCustomer');
}
function* getCustomer() {
  try {
    const response = yield call(getCustomerApi);
    if(response.status == 200){
      yield put(getCustomerSuccess(response.data));
    }
  } catch (error) {
    yield put(getCustomerFailure());
  }
}
function postCustomerApi(data, token){
  return axios.post(sportUrl + `DmBps/Post`, data, {
    headers: {
          'Authorization': `Bearer ${token}`,
    }
});
}
function* postCustomer(action){
  try {
    const { data } = action.payload;
    const iddkdn = sessionStorage.getItem('iddkdn');
    const token = sessionStorage.getItem('token');
    if (!iddkdn || !token) {
      throw new Error('iddkdn và token không hợp lệ');
    }
    const response = yield call(postCustomerApi, data , token);
    if(response.status == 200){
      toast.success("Thêm thành công !", {
        autoClose: 1000,
      });
      yield put(postCustomerSuccess());
      const responseCustomer = yield call(getCustomerApi, iddkdn, token);
      if(responseCustomer.status == 200){
        yield put(getCustomerSuccess(responseCustomer.data.data));
      }
    }

  } catch (error) {
    toast.error("Thêm không thành công!", {
      autoClose: 1000,
    });
    yield put(postCustomerFailure());
  }
}

function deleteCustomerApi(data ,token){
  return axios.delete(sportUrl + `DmBps/Delete`, {
    headers: {
          'Authorization': `Bearer ${token}`,
    },
   data
});
}
function* deleteCustomer(action){
  try {
    const keyDelete = action.payload;
    const iddkdn = sessionStorage.getItem('iddkdn');
    const token = sessionStorage.getItem('token');
    if (!iddkdn || !token) {
      throw new Error('iddkdn và token không hợp lệ');
    }
    const response = yield call(deleteCustomerApi, keyDelete, token);
    if(response.status == 200){
      toast.success("Xóa hành công !", {
        autoClose: 1000,
      });
      const responseCustomer = yield call(getCustomerApi, iddkdn, token);
      if(responseCustomer.status == 200){
        yield put(getCustomerSuccess(responseCustomer.data.data));
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
    yield put(deleteCustomerFailure()); 
  }
}

function putCustomerApi(data, token){
  return axios.put(sportUrl + `DmBps/Put`, data, {
    headers: {
          'Authorization': `Bearer ${token}`,
    }
  });
}
function* putCustomer(action){
  try {
    const { data } = action.payload;
    const iddkdn = sessionStorage.getItem('iddkdn');
    const token = sessionStorage.getItem('token');
    if (!iddkdn || !token) {
      throw new Error('iddkdn và token không hợp lệ');
    }
    const response = yield call(putCustomerApi, data , token);
    if(response.status == 200){
      toast.success("Chỉnh sửa thành công!", {
        autoClose: 1000,
      });
      yield put(putCustomerSuccess());
      const responseCustomer = yield call(getCustomerApi, iddkdn, token);
      if(responseCustomer.status == 200){
        yield put(getCustomerSuccess(responseCustomer.data.data));
      }
    }
  } catch (error) {
    toast.error("Chỉnh sửa không thành công!", {
      autoClose: 1000,
    });
    yield put(putCustomerFailure());
  }
}

function* CustomerSagas(){
   yield takeLatest(GET_CUSTOMER_REQUEST, getCustomer);
   yield takeLatest(POST_CUSTOMER_REQUEST, postCustomer);
   yield takeLatest(DELETE_CUSTOMER_REQUEST, deleteCustomer);
   yield takeLatest(PUT_CUSTOMER_REQUEST, putCustomer);
}
export default CustomerSagas;