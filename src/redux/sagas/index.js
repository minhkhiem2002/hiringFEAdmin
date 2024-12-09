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
import dashboardAdminSagas from "./Admin/dashboardSagas";
import bookingByOwnerSagas from "./Owner/bookingSagas";
import orderAdminSagas from "./Admin/orderSagas";
import BanSagas from "./Admin/banSagas";

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
    dashboardAdminSagas(),
    bookingByOwnerSagas(),
    orderAdminSagas(),
    BanSagas(),
  ]);
}
