import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { 
  DELETE_FIELDS_OWNER_REQUEST, deleteFieldsOwnerFailure, deleteFieldsOwnerSuccess, 
  GET_FIELDS_OWNER_REQUEST, getFieldsOwnerFailure, getFieldsOwnerSuccess, 
  GET_FIELD_DETAIL_OWNER_REQUEST, getFieldDetailOwnerSuccess, getFieldDetailOwnerFailure,
  POST_FIELDS_OWNER_REQUEST, postFieldsOwnerFailure, postFieldsOwnerSuccess, 
  PUT_FIELDS_OWNER_REQUEST, putFieldsOwnerFailure, putFieldsOwnerSuccess 
} from "../../actions/Owner/fieldsActions";
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

function getFieldDetailOwnerApi(endpoint) {
  return axios.get(`https://sportappdemo.azurewebsites.net/api/SportField/GetSportFieldUpdate?EndPoint=${endpoint}`);
}
function* getFieldDetailOwner(action) {
try {
  const {endpoint} = action.payload;
  const response = yield call(getFieldDetailOwnerApi,endpoint);
  if(response.status == 200){
    yield put(getFieldDetailOwnerSuccess(response.data));
  }
} catch (error) {
  yield put(getFieldDetailOwnerFailure());
}
}
function postFieldsOwnerApi(data) {

  return axios.post(
    `https://sportappdemo.azurewebsites.net/api/SportField/CreateSportField`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

function* postFieldsOwner(action){
  try {
    const { data } = action.payload;
    const response = yield call(postFieldsOwnerApi, data);
    if(response.status == 200){
      toast.success("Thêm thành công !", {
        autoClose: 1000,
      });
      yield put(postFieldsOwnerSuccess());
    }
  } catch (error) {
    toast.error("Thêm không thành công!", {
      autoClose: 1000,
    });
    yield put(postFieldsOwnerFailure());
  }
}

function deleteFieldsOwnerApi(data){
  return axios.delete(sportUrl + `SportField/DeleteSportField`,
   {data});
}
function* deleteFieldsOwner(action){
  try {
    const keyDelete = action.payload;
    const data = {
      sportFieldId: keyDelete,
    }
    const response = yield call(deleteFieldsOwnerApi, data);
    if(response.status == 200){
      toast.success("Xóa hành công !", {
        autoClose: 1000,
      });
        yield put(deleteFieldsOwnerSuccess());
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

function putFieldsOwnerApi(data){
  return axios.patch(sportUrl + `SportField/UpdateSportField`, data);
}
function* putFieldsOwner(action){
  try {
    const { data } = action.payload;
    const response = yield call(putFieldsOwnerApi, data);
    if(response.status == 200){
      toast.success("Chỉnh sửa thành công!", {
        autoClose: 1000,
      });
      yield put(putFieldsOwnerSuccess());
    }
  } catch (error) {
    toast.error(error.response.data.message || "Chỉnh sửa sân không thành công", {
      autoClose: 1000,
    });
    yield put(putFieldsOwnerFailure());
  }
}

function* FieldsOwnerSagas(){
   yield takeLatest(GET_FIELDS_OWNER_REQUEST, getFieldsOwner);
   yield takeLatest(GET_FIELD_DETAIL_OWNER_REQUEST, getFieldDetailOwner);
   yield takeLatest(POST_FIELDS_OWNER_REQUEST, postFieldsOwner);
   yield takeLatest(DELETE_FIELDS_OWNER_REQUEST, deleteFieldsOwner);
   yield takeLatest(PUT_FIELDS_OWNER_REQUEST, putFieldsOwner);
}
export default FieldsOwnerSagas;