import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "./../../redux/actions/authActions";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import login from "../../assets/images/login.jpg";
import logo_login from "../../assets/images/logo_img.png";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/loading";
import ModalDoiMatKhau from "../../components/ModalDoiMatKhau/ModalDoiMatKhau";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Đăng Nhập";
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [openForgetModal, setOpenForgetModal] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { data, isLoading, isError } = useSelector((state) => state.auth);

  console.log(data)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    let valid = true;

    if (username.trim() === "") {
      setUsernameError("Tên đăng nhập không được để trống.");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Mật khẩu không được để trống.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      console.log('Valid')
      dispatch(loginRequest(username, password));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  useEffect(() => {
    if (data != null) {
      toast.success("Đăng nhập thành công!", {
        autoClose: 100,
        onClose: () => {
          setTimeout(() => {
            navigate("/");
          }, 50);
        },
      });
    }
  }, [data, isError, navigate]);

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    > 
      {isLoading ? <Loading/> : null}
      <div className="w-full h-full flex justify-end z-0">
        <ToastContainer />
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={4} />
          <Grid item xs={4} className="flex justify-center">
            <Container
              component="main"
              maxWidth="xs"
              className="content-center justify-end w-full"
            >
              <CssBaseline />
              <Box className="flex flex-col items-center bg-white p-4 rounded-[3px]">
                <img
                  src={logo_login}
                  alt="image_logo_login"
                  width={200}
                  className="py-2"
                />
                <Typography
                  component="h1"
                  variant="h6"
                  align="center"
                  sx={{ color: "#4590FF", fontWeight: "700" }}
                  className="py-3 w-4/5"
                >
                  HỆ THỐNG QUẢN LÝ ĐẶT CHỖ CÁC DỊCH VỤ THỂ THAO
                </Typography>
                <Box component="form" noValidate className="mt-1">
                  <TextField
                    margin="normal"
                    required
                    autoFocus
                    label="Tên đăng nhập"
                    variant="outlined"
                    name="Tên đăng nhập"
                    sx={{
                      marginTop: "16px",
                      marginBottom: "16px",
                    }}
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    fullWidth
                    error={!!usernameError}
                    helperText={usernameError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    label="Mật khẩu"
                    variant="outlined"
                    name="Mật khẩu"
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="my-2"
                    value={password}
                    fullWidth
                    onKeyDown={handleKeyDown}  
                    error={!!passwordError}
                    helperText={passwordError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsIcon />
                        </InputAdornment>
                      ),
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
                  <Grid container>
                    <Grid item xs>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        className="text-neutral-500 text-[0.875rem]"
                        label="Ghi nhớ đăng nhập"
                      />
                    </Grid>
                    <Grid item className="pt-2">
                      <Link
                        onClick = {() => setOpenForgetModal(true)}
                        variant="body2"
                        sx={{ textDecoration: "none", color: "#737373" }}
                      >
                        <span className="mt-4 text-base">Quên mật khẩu?</span>
                      </Link>
                    </Grid>
                  </Grid>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, borderRadius: "8px", textTransform: "none" }}
                    onClick={handleLogin}
                    className="rounded-[3px]"
                  >
                    Đăng nhập
                  </Button>
                </Box>
              </Box>
            </Container>
          </Grid>
        </Grid>
        <ModalDoiMatKhau
          openForgetModal = {openForgetModal}
          setOpenForgetModal = {setOpenForgetModal}
        />
      </div>
    </div>
  );
};

export default LoginPage;
