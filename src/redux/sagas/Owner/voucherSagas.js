import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { DELETE_VOUCHER_REQUEST, deleteVoucherFailure, deleteVoucherSuccess, GET_VOUCHER_REQUEST, getVoucherFailure, getVoucherSuccess, POST_VOUCHER_REQUEST, postVoucherFailure, postVoucherSuccess, PUT_VOUCHER_REQUEST, putVoucherFailure, putVoucherSuccess } from "../../actions/Owner/voucherActions";
import { sportUrl } from "../../const_api";
import { toast } from "react-toastify";

// Hàm API với các tham số bổ sung
function getVoucherApi(pageSize, pageNumber) {
  return axios.get(`https://sportappdemo.azurewebsites.net/api/Voucher/GetVouchers`, {
      params: {
          PageSize: pageSize,
          PageNumber: pageNumber,
      },
  });
}

// Generator function để xử lý logic lấy dữ liệu
function* getVoucher(action) {
  try {
      const { data } = action.payload; 
      console.log(`getVoucher1`,data)
      const response = yield call(getVoucherApi, data.pageSize, data.pageNumber); 
      if (response.status === 200) {
          yield put(getVoucherSuccess(response.data)); 
      }
  } catch (error) {
      console.error(error);
      yield put(getVoucherFailure()); 
  }
}

function postVoucherApi(data) {

  return axios.post(
    `https://sportappdemo.azurewebsites.net/api/Voucher/CreateVoucher`,
    data,
  );
}

function* postVoucher(action){
  try {
    const { data } = action.payload;
    const response = yield call(postVoucherApi, data);
    if(response.status == 200){
      toast.success("Thêm thành công !", {
        autoClose: 1000,
      });
      yield put(postVoucherSuccess());
    }
  } catch (error) {
    toast.error("Thêm không thành công!", {
      autoClose: 1000,
    });
    yield put(postVoucherFailure());
  }
}

function deleteVoucherApi(data){
  return axios.delete(sportUrl + `Voucher/DeleteVoucher`, {data});
}
function* deleteVoucher(action){
  try {
    const keyDelete = action.payload;
    const data = {
      voucherId: keyDelete
    }
    const response = yield call(deleteVoucherApi, data);
    if(response.status == 200){
      toast.success("Xóa hành công !", {
        autoClose: 1000,
      });
        yield put(deleteVoucherSuccess());
    }else{
      toast.error("Xóa không thành công !", {
        autoClose: 1000,
      });
      yield put(deleteVoucherFailure()); 
    }
  } catch (error) {
    toast.error("Xóa không thành công!", {
      autoClose: 1000,
    });
    yield put(deleteVoucherFailure()); 
  }
}

function putVoucherApi(data){
  return axios.patch(sportUrl + `Voucher/UpdateVoucher`, data);
}
function* putVoucher(action){
  try {
    const { data } = action.payload;
    const response = yield call(putVoucherApi, data);
    if(response.status == 200){
      toast.success("Chỉnh sửa thành công!", {
        autoClose: 1000,
      });
      yield put(putVoucherSuccess());
    }
  } catch (error) {
    toast.error("Chỉnh sửa không thành công!", {
      autoClose: 1000,
    });
    yield put(putVoucherFailure());
  }
}

function* VoucherSagas(){
   yield takeLatest(GET_VOUCHER_REQUEST, getVoucher);
   yield takeLatest(POST_VOUCHER_REQUEST, postVoucher);
   yield takeLatest(DELETE_VOUCHER_REQUEST, deleteVoucher);
   yield takeLatest(PUT_VOUCHER_REQUEST, putVoucher);
}
export default VoucherSagas;