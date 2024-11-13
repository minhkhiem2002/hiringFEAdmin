import { Button } from "@mui/material";
import NotFoundImage from "../../assets/images/NotFoundImage.gif";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";

function NotFoundPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleNavigate = () => {
    dispatch(logout());
    navigate("/login")
  };

  return (
    <div className="bg-white h-screen w-full flex flex-col relative justify-center items-center">
      <p className="text-9xl font-bold absolute top-20">404</p>
      <img src={NotFoundImage} alt="Page Not Found" className="w-1/2 h-fit" />
      <div className="absolute bottom-20 justify-center items-center flex flex-col">
        <p className="text-3xl font-semibold">Oopss! Có vẻ bạn đã bị lạc</p>
        <p className="mb-2">Trang bạn tìm kiếm không tồn tại!!!</p>
        <Button
          onClick={handleNavigate} // Gọi hàm khi nút được nhấn
          variant="contained"
          color="success"
          sx={{ textTransform: "none" }}
        >
          Quay về đăng nhập
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
