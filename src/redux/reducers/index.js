import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import authReducer from "./authReducer";
import CustomerReducer from "./Admin/customerReducer";
import OwnerReducer from "./Admin/ownerReducer";
import FieldsOwnerReducer from "./Owner/fieldsReducer";
import SportTypeReducer from "./Filter/typeSportReducer";
import VoucherReducer from "./Owner/voucherReducer";
import ProductReducer from "./Owner/productReducer";
import filterProductReducer from "./Owner/FilterProductReducer";
import dashboardOwnerReducer from "./Owner/dashboardReducer";
import dashboardAdminReducer from "./Admin/dashboardReducer";
import bookingReducer from "./Owner/bookingReducer";
import orderReducer from "./Admin/orderReducer";
import BanReducer from "./Admin/banReducer";

const rootReducer = combineReducers({
  // Đăng nhập
  auth: authReducer,

  // Quản lý chung
  userInfo: userInfoReducer,

  //Admin
  getAllCustomer: CustomerReducer,
  getAllBan: BanReducer,
  getAllOwner: OwnerReducer,
  fieldsOwner: FieldsOwnerReducer,
  filterSportType: SportTypeReducer,
  voucher: VoucherReducer,
  product: ProductReducer,
  filterProduct: filterProductReducer,
  dashboardOwner:  dashboardOwnerReducer,
  dashboardAdmin: dashboardAdminReducer,
  bookingOwner: bookingReducer,
  orderAdmin: orderReducer,
});

export default rootReducer;
