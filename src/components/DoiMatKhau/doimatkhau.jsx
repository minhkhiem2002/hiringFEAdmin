import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Grid,
  Button,
  TextField,
  FormControl,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Cancel, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordRequest, checkPasswordRequest } from "../../redux/actions/authActions";
import { ToastContainer } from "react-toastify";

function Doimatkhau({ openDrawerMatKhau, setOpenDrawerMatKhau }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");
  const [showoldPassword, setOldShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showrenewPassword, setShowRenewPassword] = useState(false)
  const [responseMessage, setResponseMessage] = useState("");
  const dispatch = useDispatch();
  const { data} = useSelector(state => state.auth); 

  const handleClickShowOldPassword = () => setOldShowPassword((show) => !show);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowReNewPassword = () => setShowRenewPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [formError, setFormError] = useState({
    newPassword: "",
    renewPassword: "",
  });

  const [validations, setValidations] = useState({
    length: false,
    specialChar: false,
    number: false,
    uppercase: false,
  });

  const validatePassword = (value) => {
    setNewPassword(value);

    setValidations({
      length: value.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      number: /\d/.test(value),
      uppercase: /[A-Z]/.test(value),
    });

    if (value === password) {
      setFormError((prev) => ({
        ...prev,
        newPassword: "Mật khẩu mới không được trùng mật khẩu hiện tại",
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        newPassword: "",
      }));
    }
  };

  const handleBlur = () => {
    checkPassWord(password);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRenewPasswordChange = (e) => {
    setRenewPassword(e.target.value);
    if (e.target.value !== newPassword) {
      setFormError((prev) => ({
        ...prev,
        renewPassword: "Mật khẩu xác nhận không khớp",
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        renewPassword: "",
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      handleChangePassword(password, newPassword);
    }
  };

  const handleChangePassword = (password, newPassword) => {
    dispatch(changePasswordRequest(encodePasswordToBase64(password), encodePasswordToBase64(newPassword)));
    setOpenDrawerMatKhau(false)
  };

  const encodePasswordToBase64 = (value) => {
    return btoa(value);
  };

  useEffect(() => {
    const resetData = () => {
      setResponseMessage("");
      setPassword("");
      setNewPassword("");
      setRenewPassword("");
      setValidations({
        length: false,
        specialChar: false,
        number: false,
        uppercase: false,
      });
      setFormError({
        newPassword: "",
        renewPassword: "",
      });
    };
    if (openDrawerMatKhau === true) {
      resetData();
    }
  }, [openDrawerMatKhau]);

  const checkPassWord = async (value) => {
      dispatch(checkPasswordRequest(encodePasswordToBase64(value)));
  };

  const isFormValid = () => {
    return (
      newPassword.length >= 8 &&
      /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) &&
      /\d/.test(newPassword) &&
      /[A-Z]/.test(newPassword) &&
      newPassword === renewPassword &&
      !formError.newPassword &&
      !formError.renewPassword
    );
  };

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <Drawer
        anchor="right"
        open={openDrawerMatKhau}
        onClose={() => setOpenDrawerMatKhau(false)}
      >
        <div className="relative h-full w-[480px] px-4 py-4">
          <Typography variant="h6">Thay đổi mật khẩu</Typography>
          <Box className="grow mt-4">
            <form onSubmit={handleSave}>
              <FormControl component="fieldset">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Mật khẩu hiện tại"
                      variant="outlined"
                      type={showoldPassword ? "text" : "password"}
                      name="Password"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      error={data ? !!(data.message === "Password không đúng!!!") : !!(responseMessage === "Password không đúng!!!")} 
                      helperText={data ? ((data.message === "Password không đúng!!!") ? data.message : '') : responseMessage}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowOldPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showoldPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Mật khẩu mới"
                      name="psw"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      required
                      value={newPassword}
                      onChange={(e) => validatePassword(e.target.value)}
                      className="mt-1"
                      // disabled={data?.message === "Password không đúng!!!" || !password}
                      error={!!formError.newPassword}
                      helperText={formError.newPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      className={`flex items-center mb-2 ${
                        validations.length
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {validations.length ? (
                        <CheckCircleIcon fontSize="small" />
                      ) : (
                        <RadioButtonUncheckedIcon fontSize="small" />
                      )}
                      <span className="ml-2">Mật khẩu tối thiểu 8 kí tự</span>
                    </div>
                    <div
                      className={`flex items-center mb-2 ${
                        validations.specialChar
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {validations.specialChar ? (
                        <CheckCircleIcon fontSize="small" />
                      ) : (
                        <RadioButtonUncheckedIcon fontSize="small" />
                      )}
                      <span className="ml-2">
                        Chứa ít nhất 1 kí tự đặc biệt
                      </span>
                    </div>
                    <div
                      className={`flex items-center mb-2 ${
                        validations.number
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {validations.number ? (
                        <CheckCircleIcon fontSize="small" />
                      ) : (
                        <RadioButtonUncheckedIcon fontSize="small" />
                      )}
                      <span className="ml-2">Chứa ít nhất 1 chữ số</span>
                    </div>
                    <div
                      className={`flex items-center mb-2 ${
                        validations.uppercase
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {validations.uppercase ? (
                        <CheckCircleIcon fontSize="small" />
                      ) : (
                        <RadioButtonUncheckedIcon fontSize="small" />
                      )}
                      <span className="ml-2">Chứa ít nhất 1 kí tự in hoa</span>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Xác nhận mật khẩu mới"
                      name="renewpassword"
                      type={showrenewPassword ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      required
                      value={renewPassword}
                      onChange={handleRenewPasswordChange}
                      className="mt-1"
                      // disabled={
                      //   !newPassword 
                      //   || formError.newPassword != "" 
                      //   || validations.length == false 
                      //   || validations.number == false 
                      //   || validations.specialChar == false
                      //   || validations.uppercase == false
                      // }
                      error={!!formError.renewPassword}
                      helperText={formError.renewPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowReNewPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showrenewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <Box className="pt-4 flex justify-end">
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    // disabled={!isFormValid()}
                    onClick={handleSave} 
                    size="medium"
                        sx={{
                          minWidth: "100px",
                          borderRadius: "4px",
                          textTransform: "none",
                          backgroundColor: '#4590FF',
                          '&:hover': {
                            backgroundColor: '#357AE8',
                          },
                          color: 'white',
                        }}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setOpenDrawerMatKhau(false)}
                    autoFocus
                        color="primary"
                        size="medium"
                        sx={{
                          minWidth: '100px',
                          borderRadius: '4px',
                          textTransform: 'none',
                          backgroundColor: '#c7c7c7',
                          '&:hover': {
                            backgroundColor: '#a8a8a8',
                          },
                          color: 'white',
                        }}
                  >
                    Hủy bỏ
                  </Button>
                </Stack>
              </Box>
            </form>
          </Box>
        </div>
      </Drawer>
    </div>
  );
}

export default Doimatkhau;
