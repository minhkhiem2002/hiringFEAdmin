import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_CUSTOMER_REQUEST, deleteCustomerFailure, deleteCustomerSuccess, GET_CUSTOMER_REQUEST, getCustomerFailure, getCustomerSuccess, POST_CUSTOMER_REQUEST, postCustomerFailure, postCustomerSuccess, PUT_CUSTOMER_REQUEST, putCustomerFailure, putCustomerSuccess } from "../../actions/Admin/customerActions";
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
function postCustomerApi(data){
  return axios.post('https://sportappdemo.azurewebsites.net/api/User/CreateUser', data);
}
function* postCustomer(action){
  try {
    const { data } = action.payload;
    const response = yield call(postCustomerApi, data);
    if(response.status == 200){
      toast.success("Thêm thành công !", {
        autoClose: 1000,
      });
      yield put(postCustomerSuccess());
    }

  } catch (error) {
    toast.error("Thêm không thành công!", {
      autoClose: 1000,
    });
    yield put(postCustomerFailure());
  }
}

function deleteCustomerApi(data ){
  return axios.delete(sportUrl + `Customer/DeleteCustomer`, {
   data
});
}
function* deleteCustomer(action){
  try {
    const keyDelete = action.payload;
    const data = {
      customerId:keyDelete
    }
    const response = yield call(deleteCustomerApi, data);
    if(response.status == 200){
      toast.success("Xóa thành công !", {
        autoClose: 1000,
      });
      yield put(deleteCustomerSuccess());
    }else{
      toast.error("Xóa không thành công !", {
        autoClose: 1000,
      });
      yield put(deleteCustomerFailure()); 
    }
  } catch (error) {
    console.log('Error',error)
    toast.error("Xóa không thành công!", {
      autoClose: 1000,
    });
    yield put(deleteCustomerFailure()); 
  }
}

function putCustomerApi(data){
  return axios.put(sportUrl + `Customer/UpdateCustomer`, data);
}
function* putCustomer(action){
  try {
    const { data } = action.payload;
    const response = yield call(putCustomerApi, data);
    if(response.status == 200){
      toast.success("Chỉnh sửa thành công!", {
        autoClose: 1000,
      });
      yield put(putCustomerSuccess());
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