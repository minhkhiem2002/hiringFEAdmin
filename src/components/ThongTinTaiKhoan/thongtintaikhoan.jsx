import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Grid,
  Button,
  TextField,
  FormControl,
  Stack,
  Skeleton,
  Typography,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { Cancel, Save } from "@mui/icons-material";
import { validate } from "../../ultils";
import { useDispatch, useSelector } from "react-redux";
import { putUserInfoRequest } from "../../redux/actions/userInfoActions";

function Thongtintaikhoan({ openDrawer, setOpenDrawer, toggleDrawer }) {
  const [data, setData] = useState();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'avatar') return
    setData({ ...data, [name]: value });
    const errors = validate({ ...data, [name]: value });
    setFormError(errors);
  };
  const handleChangeAvatar = async (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
    const { avatar, ...newData } = data;
    const updatedData = {
      ...newData,
      userId: sessionStorage.getItem("id")
    };

    console.log(updatedData)
    dispatch(putUserInfoRequest(updatedData));
    setOpenDrawer(false)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data);
    setFormError(errors);

    if (Object.values(errors).every((error) => !error)) {
    }
  };

  const {
    data: dataUser,
    isLoading,
    isLoadingPut
  } = useSelector((state) => state.userInfo);
  useEffect(() => {
    if (!isLoading && dataUser) {
      setData(dataUser);

    }
  }, [openDrawer == true, isLoading, dataUser]);
  const isFormValid = () => {
    return (
      data?.firstName &&
      data?.lastName &&
      data?.email &&
      data?.location &&
      !formError.firstName &&
      !formError.lastName &&
      !formError.email &&
      !formError.phoneNumber
    );
  };

  return (
    <div className="w-full h-full">
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {isLoading ? (
          <div className="w-[480px] px-4 py-4">
            <Stack spacing={1}>
              <Skeleton variant="text" height={60} />
              <Grid container columnSpacing={2} w-full>
                <Grid item xs={4}>
                  <Skeleton variant="circular" height={140} />
                </Grid>
                <Grid item xs={8} rowSpacing={2}>
                  <Skeleton variant="rectangular" height={60} width={278}/>
                  <Skeleton variant="rectangular" height={60} className="mt-4" width={278}/>
                </Grid>
              </Grid>
              <Skeleton variant="rectangular" height={50} className="mt-4"/>
              <Skeleton variant="rectangular" height={50} className="mt-4"/>
              <Skeleton variant="rectangular" height={50} className="mt-4"/>
              <Skeleton variant="rectangular" height={50} className="mt-4"/>
              <Skeleton variant="rectangular" height={50} className="mt-4"/>
              <Skeleton variant="rounded" height={100} className="mt-4"/>
            </Stack>
          </div>
        ) : (
          <div className="relative h-screen w-[480px] px-4 py-4">
            <Typography variant="h6" className="text-[#4590FF] font-semibold text-xl">Thông tin người dùng</Typography>
            <Box className="grow">
              <FormControl component="fieldset" onSubmit={handleSubmit}>
                <Grid container>
                  <Grid
                    item
                    xs={4}
                    className="flex justify-center items-center h-36"
                  >
                    <input
                      type="file"
                      onChange={handleChangeAvatar}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <img
                        src={image ? image : data?.avatar}
                        alt="Avatar"
                        className="w-32 h-32 border rounded-full"
                      />
                    </label>
                  </Grid>
                  <Grid item container xs={8} className="h-40">
                    <Grid item xs={12} className="h-10">
                      <TextField
                        label="Tên đăng nhập"
                        variant="filled"
                        name="email"
                        value={data?.email}
                        fullWidth
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      spacing={1}
                      className="h-30 pt-8"
                    >
                      <Grid item xs={7} className="flex items-start">
                        <TextField
                          label="Họ và tên đệm"
                          variant="outlined"
                          name="firstName"
                          required
                          value={data?.firstName}
                          onChange={handleChange}
                          fullWidth
                          error={!!formError.firstName}
                          helperText={
                            <span className="block">
                              {formError.firstName}
                            </span>
                          }
                        />
                      </Grid>
                      <Grid item xs={5} className="flex items-start">
                        <TextField
                          label="Tên"
                          name="lastName"
                          required
                          variant="outlined"
                          value={data?.lastName}
                          onChange={handleChange}
                          fullWidth
                          error={!!formError.lastName}
                          helperText={
                            <span className="block">
                              {formError.lastName ? (
                                formError.lastName
                              ) : (
                                <span className="text-white">a</span>
                              )}
                            </span>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Số điện thoại"
                      name="phoneNumber"
                      variant="outlined"
                      value={data?.phoneNumber}
                      onChange={handleChange}
                      fullWidth
                      error={!!formError.phoneNumber}
                      helperText={
                        <span className="block">
                          {formError.phoneNumber ? (
                            formError.phoneNumber
                          ) : (
                            <span className="text-white">a</span>
                          )}
                        </span>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} className="pt-1">
                    <TextField
                      label="Email"
                      required
                      name="email"
                      variant="outlined"
                      value={data?.email}
                      onChange={handleChange}
                      fullWidth
                      error={!!formError.email}
                      helperText={formError.email}
                    />
                  </Grid>
                  <Grid item xs={12} className="pt-6">
                    <TextField
                      label="Địa chỉ"
                      required
                      name="location"
                      variant="outlined"
                      value={data?.location}
                      onChange={handleChange}
                      fullWidth
                      error={!!formError.location}
                      helperText={formError.location}
                    />
                  </Grid>
                  <Grid item xs={12} className="pt-6">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Giới tính</InputLabel>
                      <Select
                        label="Giới tính"
                        name="gender"
                        value={data?.gender}
                        onChange={handleChange}
                        error={!!formError.gender}
                      >
                        <MenuItem value="Male">Nam</MenuItem>
                        <MenuItem value="Female">Nữ</MenuItem>
                        <MenuItem value="Other">Giới tính khác</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className="pt-6">
                    <TextField
                      label="Ngày sinh"
                      type="date"
                      name="dateOfBirth"
                      value={data?.dateOfBirth ? data?.dateOfBirth.split("T")[0] : ""}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      className="w-full"
                    />
                  </Grid>
                  <Grid item xs={12} className="">
                    <Stack direction="row" spacing={2} className="mt-24 justify-end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!isFormValid()}
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
                        onClick={toggleDrawer(false)}
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
                  </Grid>
                </Grid>
              </FormControl>
            </Box>
          </div>
        )}
      </Drawer>
    </div>
  );
}
export default Thongtintaikhoan;