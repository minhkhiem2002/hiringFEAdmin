import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import authReducer from "./authReducer";
import CustomerReducer from "./Admin/customerReducer";
import OwnerReducer from "./Admin/ownerReducer";
import FieldsOwnerReducer from "./Owner/fieldsReducer";
import SportTypeReducer from "./Filter/typeSportReducer";
import VoucherReducer from "./Owner/voucherReducer";

const rootReducer = combineReducers({
  // Đăng nhập
  auth: authReducer,

  // Quản lý chung
  userInfo: userInfoReducer,

  //Admin
  getAllCustomer: CustomerReducer,
  getAllOwner: OwnerReducer,
  fieldsOwner: FieldsOwnerReducer,
  filterSportType: SportTypeReducer,
  voucher: VoucherReducer,
});

export default rootReducer;
