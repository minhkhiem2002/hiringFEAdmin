import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";
import authReducer from "./authReducer";
import CustomerReducer from "./Admin/customerReducer";
import OwnerReducer from "./Admin/ownerReducer";
import FieldsOwnerReducer from "./Owner/fieldsReducer";
import SportTypeReducer from "./Filter/typeSportReducer";

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
});

export default rootReducer;
