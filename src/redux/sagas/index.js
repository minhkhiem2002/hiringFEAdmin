import { all } from "redux-saga/effects";
import userInfoSagas from "./userInfoSagas";
import authSagas from "./authSagas";

import CustomerSagas from "./Admin/customerSagas";
import OwnerSagas from "./Admin/ownerSagas";
import FieldsOwnerSagas from "./Owner/ownerSagas";
import SportTypeSagas from "./Filter/typeSportSagas";

export default function* rootSaga() {
  yield all([
    authSagas(),
    userInfoSagas(),

    CustomerSagas(),
    OwnerSagas(),
    FieldsOwnerSagas(),
    SportTypeSagas(),
  ]);
}
