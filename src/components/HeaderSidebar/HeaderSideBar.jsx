import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoRequest } from "../../redux/actions/userInfoActions";
import { useEffect, useState } from "react";
// @ts-ignore
import Thongtintaikhoan from "../ThongTinTaiKhoan/thongtintaikhoan";
import Doimatkhau from "../DoiMatKhau/doimatkhau";
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from "../../redux/actions/authActions";
import { useNavigate } from "react-router";
import { tenphanheMap } from "../../constants";
import Loading from "../Loading/loading";
import UserIcon from '../../assets/icons/User.svg'
import ChangeIcon from '../../assets/icons/Change.svg'
import PasswordIcon from '../../assets/icons/Password.svg'
import LogoutIcon from '../../assets/icons/Logout Rounded.svg'
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function HeaderSideBar({ setExpanded, expanded }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerMatKhau, setOpenDrawerMatKhau] = useState(false);
  const { data, isLoading, isSuccess } = useSelector((state) => state.userInfo);
  const { isUpdateAvatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  
  useEffect(() => {
    if (isSuccess === true || isUpdateAvatar ) {
      dispatch(getUserInfoRequest());
    }
  }, [isSuccess, isUpdateAvatar]);

  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, []);
  
  useEffect(() => {
    setExpanded(isMobile); 
  }, [isMobile, setExpanded]);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };
  const toggleDrawerMatkhau = (newOpen) => () => {
    setOpenDrawerMatKhau(newOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/login");
  };
  const thongtinTaikhoan = () => {
    setOpenDrawer(true);
  };
  const doimatkhau = () => {
    setOpenDrawerMatKhau(true);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className="w-full bg-slate-100">
      {isLoading ? <Loading /> : null}
      <Grid container style={{ height: "calc(100% / 12)" }}>
        <Grid item xs={2} className="flex justify-start items-center">
          <MenuIcon className="cursor-pointer text-[#4590FF] ml-2" onClick={handleExpand} />
        </Grid>
        <Grid item xs={7} className="flex justify-center items-center">
          <span className="text-xl font-bold text-[#4590FF]">HỆ THỐNG QUẢN LÝ SÂN THỂ THAO</span>
        </Grid>
        <Grid item xs={3} className="flex justify-end items-center px-4">
          {data ? (
            <Box className='flex justify-center'>
              <Tooltip title="Tài khoản của tôi" size="small">
                <IconButton
                  size="small"
                >
                  {data.avatar ? (
                    <Avatar
                      className='w-13 h-13'
                      alt="Spotta"
                      src={data.avatar}
                    />
                  ) : (
                    <Avatar className='w-13 h-13' alt="DTSoft">
                      {data.lastName}
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
              <div className='flex flex-col cursor-pointer' onClick={handleClick}>
                <p className='text-xs text-neutral-950 m-0 pt-1'>
                {data.firstName} {data.lastName}
                </p>
                <Chip
                  label={data.gender}
                  color="primary"
                  variant="outlined"
                  size="small"
                  className="text-xs"
                />
              </div>
            </Box>
          ) : (
            <Grid container className="flex justify-end items-center px-4">
              <Grid item xs={3} className="justify-end items-center px-4">
                <Skeleton variant="circular" height={40} width={40} />
              </Grid>
              <Grid item xs={3}>
                <Skeleton variant="rectangular" height={18} width={78} />
                <Skeleton variant="rectangular" height={18} className="mt-1" width={78} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Thongtintaikhoan openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} toggleDrawer={toggleDrawer} />
      <Doimatkhau
        openDrawerMatKhau={openDrawerMatKhau}
        setOpenDrawerMatKhau={setOpenDrawerMatKhau}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            marginTop: '4px',
            border: '1px solid #d3d4d5',
            boxShadow: '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
            borderRadius: '10px'
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={thongtinTaikhoan}>
          <div className='w-full flex py-1'>
            <img
              src={UserIcon}
              alt="icon_menu_users"
              width={20}
              className="mr-2"
            />
            Thông tin tài khoản
          </div>
        </MenuItem>

        <MenuItem onClick={doimatkhau}>
          <div className='w-full flex py-1'>
            <img
              src={PasswordIcon}
              alt="icon_menu_password"
              width={20}
              className="mr-2"
            />
            Đổi mật khẩu
          </div>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          className='mt-1'
        >
          <div className='w-full flex py-1'>
            <img
              src={LogoutIcon}
              alt="icon_menu_logout"
              width={20}
              className="mr-2"
            />
            Đăng xuất
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default HeaderSideBar;
