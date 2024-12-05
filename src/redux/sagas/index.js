import { all } from "redux-saga/effects";
import userInfoSagas from "./userInfoSagas";
import authSagas from "./authSagas";

import CustomerSagas from "./Admin/customerSagas";
import OwnerSagas from "./Admin/ownerSagas";
import FieldsOwnerSagas from "./Owner/ownerSagas";
import SportTypeSagas from "./Filter/typeSportSagas";
import VoucherSagas from "./Owner/voucherSagas";
import ProductSagas from "./Owner/productSagas";
import filterProductSaga from "./Owner/FilterProductSagas";
import dashboardSagas from "./Owner/dashboardSagas";

export default function* rootSaga() {
  yield all([
    authSagas(),
    userInfoSagas(),

    CustomerSagas(),
    OwnerSagas(),
    FieldsOwnerSagas(),
    SportTypeSagas(),
    VoucherSagas(),
    ProductSagas(),
    filterProductSaga(),
    dashboardSagas(),
  ]);
}
