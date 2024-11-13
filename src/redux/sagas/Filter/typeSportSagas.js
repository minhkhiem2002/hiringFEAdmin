import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_SPORTTYPE_REQUEST, getSportTypeFailure, getSportTypeSuccess } from "../../actions/Filter/typeSportActions";

function getSportTypeApi() {
    return axios.get(`https://sportappdemo.azurewebsites.net/api/FieldType/GetFieldTypes`);
}
function* getSportType() {
  try {
    const response = yield call(getSportTypeApi);
    if(response.status == 200){
      yield put(getSportTypeSuccess(response.data));
    }
  } catch (error) {
    yield put(getSportTypeFailure());
  }
}

function* SportTypeSagas(){
   yield takeLatest(GET_SPORTTYPE_REQUEST, getSportType);
}
export default SportTypeSagas;