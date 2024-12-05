import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { 
  DELETE_PRODUCT_REQUEST, 
  deleteProductFailure, 
  deleteProductSuccess, 
  GET_PRODUCT_REQUEST, 
  getProductFailure, 
  getProductSuccess, 
  GET_PRODUCT_DETAIL_REQUEST, 
  getProductDetailFailure, 
  getProductDetailSuccess, 
  POST_PRODUCT_REQUEST, 
  postProductFailure, 
  postProductSuccess, 
  POST_ADDCOLOR_PRODUCT_REQUEST, 
  postAddColorProductFailure, 
  postAddColorProductSuccess, 
  PUT_PRODUCT_REQUEST, 
  putProductFailure, 
  putProductSuccess 
} from "../../actions/Owner/productActions";
import { sportUrl } from "../../const_api";
import { toast } from "react-toastify";

// Hàm API với các tham số bổ sung
function getProductApi(params) {
  return axios.get(`https://sportappdemo.azurewebsites.net/api/SportProduct/GetSportProducts`, { params });
}

function* getProduct(action) {
  try {
    const response = yield call(getProductApi, action.payload);
    if (response.status === 200) {
      yield put(getProductSuccess(response.data));
    }
  } catch (error) {
    yield put(getProductFailure(error));
  }
}

function getProductDetailApi(endpoint) {
  return axios.get(`https://sportappdemo.azurewebsites.net/api/SportProduct/GetSportProductDetail?EndPoint=${endpoint}`);
}

function* getProductDetail(action) {
  try {
    const response = yield call(getProductDetailApi, action.payload);
    if (response.status === 200) {
      yield put(getProductDetailSuccess(response.data));
    }
  } catch (error) {
    yield put(getProductDetailFailure(error));
  }
}


function postProductApi(data) {

  return axios.post(
    `https://sportappdemo.azurewebsites.net/api/SportProduct/CreateSportProduct`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

function* postProduct(action){
  try {
    const { data } = action.payload;
    const response = yield call(postProductApi, data);
    if(response.status == 200){
      toast.success("Thêm thành công !", {
        autoClose: 1000,
      });
      yield put(postProductSuccess());
    }
  } catch (error) {
    toast.error("Thêm không thành công!", {
      autoClose: 1000,
    });
    yield put(postProductFailure());
  }
}

function postAddColorProductApi(data) {

  return axios.post(
    `https://sportappdemo.azurewebsites.net/api/SportProduct/AddColor`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

function* postAddColorProduct(action){
  try {
    const { data } = action.payload;
    const response = yield call(postAddColorProductApi, data);
    if(response.status == 200){
      toast.success("Thêm màu thành công !", {
        autoClose: 1000,
      });
      yield put(postAddColorProductSuccess());
    }
  } catch (error) {
    toast.error("Thêm màu không thành công!", {
      autoClose: 1000,
    });
    yield put(postAddColorProductFailure());
  }
}


function deleteProductApi(data){
  return axios.delete(sportUrl + `Product/DeleteProduct`, {data});
}
function* deleteProduct(action){
  try {
    const keyDelete = action.payload;
    const data = {
      voucherId: keyDelete
    }
    const response = yield call(deleteProductApi, data);
    if(response.status == 200){
      toast.success("Xóa hành công !", {
        autoClose: 1000,
      });
        yield put(deleteProductSuccess());
    }else{
      toast.error("Xóa không thành công !", {
        autoClose: 1000,
      });
      yield put(deleteProductFailure()); 
    }
  } catch (error) {
    toast.error("Xóa không thành công!", {
      autoClose: 1000,
    });
    yield put(deleteProductFailure()); 
  }
}

function putProductApi(data){
  return axios.patch(sportUrl + `Product/UpdateProduct`, data);
}
function* putProduct(action){
  try {
    const { data } = action.payload;
    const response = yield call(putProductApi, data);
    if(response.status == 200){
      toast.success("Chỉnh sửa thành công!", {
        autoClose: 1000,
      });
      yield put(putProductSuccess());
    }
  } catch (error) {
    toast.error("Chỉnh sửa không thành công!", {
      autoClose: 1000,
    });
    yield put(putProductFailure());
  }
}

function* ProductSagas(){
   yield takeLatest(GET_PRODUCT_REQUEST, getProduct);
   yield takeLatest(GET_PRODUCT_DETAIL_REQUEST, getProductDetail);
   yield takeLatest(POST_PRODUCT_REQUEST, postProduct);
   yield takeLatest(POST_ADDCOLOR_PRODUCT_REQUEST, postAddColorProduct);
   yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProduct);
   yield takeLatest(PUT_PRODUCT_REQUEST, putProduct);
}
export default ProductSagas;