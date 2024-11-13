import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  CHECK_PASSWORD_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  LOG_OUT,
  CHECK_USER_REQUEST,
  loginSuccess,
  loginFailure,
  checkPasswordSuccess,
  checkPasswordFailure,
  changePasswordSuccess,
  changePasswordFailure,
  logoutSuccess,
  checkUserSuccess,
  checkUserFailure,
} from "../actions/authActions";
import { toast } from "react-toastify";

import { sportUrl } from "../const_api";

const loginApi = async (username, password) => {
  try {
    const response = await axios.post(`${sportUrl}User/SignIn`, {
      email: username,
      password: password
    });
    return response;
  } catch (error) {
    if (error.response.data.error) {
      toast.error(error.response.data.error, {
        autoClose: 3000,
      });
    }
    else {
      throw new Error(error.response.data.message);
    }
  }
};

function* login(action) {
  try {
    const { username, password } = action.payload;
    if (!username || !password) {
      yield put(loginFailure("Email and password are required"));
    }
    const response = yield call(loginApi, username, password);
    if (response.status == 200) {
      sessionStorage.setItem("id", response.data.id);
      sessionStorage.setItem("userRoleId", response.data.userRoleId);
      sessionStorage.setItem("email", response.data.email);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("role", response.data.role);
      yield put(loginSuccess(response.data));
    } else {
      yield put(loginFailure(response.data.error));
    }
  } catch (e) {
    yield put(loginFailure(e.message || "Server is not responding"));
  }
}

const checkPasswordApi = async (username, password) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${sessionStorage.getItem("token")}`
    );
    const response = await axios.post(
      `${authUrl}auth/checkpassword`,
      {
        Username: username,
        CurrentPassword: password
      },
      { headers: myHeaders }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

function* checkPassword(action) {
  try {
    const username = sessionStorage.getItem("user");
    const { password } = action.payload;
    if (!username || !password) {
      yield put(checkPasswordSuccess("Vui lòng nhập tên đăng nhập và mật khẩu"));
    }
    const response = yield call(checkPasswordApi, username, password);
    if (response.status == 200) {
      yield put(checkPasswordSuccess(response.data));
    } else {
      yield put(checkPasswordFailure(response.data.error));
    }
  } catch (e) {
    yield put(checkPasswordFailure(e.message || "Server không hoạt động"));
  }
}

const changePasswordApi = async (username, password, newPassword) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${sessionStorage.getItem("token")}`
    );
    const response = await axios.post(
      `${authUrl}auth/changepassword`,
      {
        Username: username,
        CurrentPassword: password,
        NewPassword: newPassword
      },
      { headers: myHeaders }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

function* changePassword(action) {
  try {
    const username = sessionStorage.getItem("user");
    const { password, newPassword } = action.payload;
    if (!username || !password || !newPassword) {
      yield put(
        changePasswordSuccess(
          "Tên đăng nhập và mật khẩu hiện tại là cần thiết"
        )
      );
    }
    const response = yield call(
      changePasswordApi,
      username,
      password,
      newPassword
    );
    if (response.status == 200) {
      yield put(changePasswordSuccess(response.data));
      toast.success("Đổi mật khẩu thành công!", {
        autoClose: 1000,
      });
    } else {
      toast.error("Đổi mật khẩu không thành công!", {
        autoClose: 1000,
      });
      yield put(changePasswordFailure(response.data.error));
    }
  } catch (e) {
    toast.error("Đổi mật khẩu không thành công!", {
      autoClose: 1000,
    });
    yield put(changePasswordFailure(e.message || "Server không hoạt động"));
  }
}

function* logout() {
  try {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expires");
    sessionStorage.removeItem("iduser");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("iddkdn");

    sessionStorage.removeItem("roleCode");
    sessionStorage.removeItem("roleTable");
    sessionStorage.removeItem("listclaims");
    sessionStorage.removeItem("idnguoidung");
    sessionStorage.removeItem("iddmpm");
    sessionStorage.removeItem("vaitro");
    sessionStorage.removeItem("idqgiaodien");
    sessionStorage.removeItem("pladminusers");
    sessionStorage.removeItem("permitqlpq");
    sessionStorage.removeItem("permitqltb");
    sessionStorage.removeItem("permitqlgm");
    sessionStorage.removeItem("permitqlns");
    sessionStorage.removeItem("permitqltt");
    sessionStorage.removeItem("permitThTC");
    sessionStorage.removeItem("permitqlkh");
    sessionStorage.removeItem("logo");
    sessionStorage.removeItem("tenUser");
    sessionStorage.removeItem("tenDn");
    sessionStorage.removeItem("phanhe");
    sessionStorage.removeItem("namtc");
    sessionStorage.removeItem("sizesl");
    sessionStorage.removeItem("dangsl");
    sessionStorage.removeItem("dvtien");
    sessionStorage.removeItem("nttu");
    sessionStorage.removeItem("ntden");
    sessionStorage.removeItem("ptkt");
    sessionStorage.removeItem("ttdv");

    yield put(logoutSuccess());
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

const checkUserApi = async (id) => {
  try {
    const response = await axios.post(`${authUrl}auth/checkiduserlogin`, {
      Id: id,
    });
    return response;
  } catch (error) {  
      throw new Error(error.response.data.message);
  }
};

function* checkUser(action) {
  try {
    const { id } = action.payload;
    if (!id) {
      yield put(checkUserFailure("id is required"));
    }
    const response = yield call(checkUserApi, id);
    if (response.status == 200) {
      yield put(checkUserSuccess(response.data));
    } else {
      yield put(checkUserFailure(response.data.error));
    }
  } catch (e) {
    yield put(checkUserFailure(e.message || "Server is not responding"));
  }
}

function* authSagas() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(CHECK_PASSWORD_REQUEST, checkPassword);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
  yield takeLatest(LOG_OUT, logout);
  yield takeLatest(CHECK_USER_REQUEST, checkUser)
}

export default authSagas;
