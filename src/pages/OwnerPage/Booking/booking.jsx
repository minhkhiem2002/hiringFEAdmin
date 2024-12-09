import React, { useEffect, useState } from "react";
import { Pagination, Button, Chip, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FaFootballBall } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";
import { getBookingByOwnerRequest, patchStatusBookingByOwnerRequest } from "./../../../redux/actions/Owner/bookingActions";
import { FaShippingFast, FaEdit, FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa";

const BookingList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, updateSuccess, rejectSuccess } = useSelector((state) => state.bookingOwner);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const params = {
      OwnerId: sessionStorage.getItem("userRoleId"),
      PageSize: itemsPerPage,
      PageNumber: page,
      Status: statusFilter,
    };
    dispatch(getBookingByOwnerRequest(params));
  }, [dispatch, page, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  useEffect(() => {
    if (updateSuccess || rejectSuccess) {
      const params = {
        OwnerId: sessionStorage.getItem("userRoleId"),
        PageSize: itemsPerPage,
        PageNumber: page,
        Status: statusFilter,
      };
      dispatch(getBookingByOwnerRequest(params));
    }
  }, [dispatch, updateSuccess, rejectSuccess, page, statusFilter]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleOpenMenu = (event, bookingId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(bookingId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleUpdateStatus = () => {
    if (selectedOrderId) {
      dispatch(patchStatusBookingByOwnerRequest(selectedOrderId));
    }
    handleCloseMenu();
  };

  const handleRejectStatus = () => {
    if (selectedOrderId) {
      dispatch(patchStatusBookingByOwnerRequest({ id: selectedOrderId, status: "rejectSuccess" }));
    }
    handleCloseMenu();
  };

  const getButtonProps = (status) => {
    switch (status) {
      case "Pending":
        return { label: "Đang xử lý", color: "warning", icon: <FaEdit /> };
      case "PaymentReceived":
        return { label: "Thanh toán thành công", color: "success", icon: <FaCheckCircle /> };
      case "PaymentFailed":
        return { label: "Thất bại", color: "error", icon: <FaTimesCircle /> };
      case "Completed":
        return { label: "Đã nhận sân", color: "primary", icon: <FaCheckCircle /> };
      case "Rejected":
        return { label: "Đã hủy", color: "secondary", icon: <FaTimesCircle /> };
      default:
        return { label: "Chưa có trạng thái", color: "default", icon: null };
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý đơn đặt sân</h1>
        <div className="flex items-center gap-3">
          <Button
            variant={statusFilter === null ? "contained" : "outlined"}
            onClick={() => handleStatusChange(null)}
          >
            Tất cả
          </Button>
          <Button
            variant={statusFilter === "Pending" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("Pending")}
          >
            Đang xử lý
          </Button>
          <Button
            variant={statusFilter === "PaymentReceived" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("PaymentReceived")}
          >
            Thành công
          </Button>
          <Button
            variant={statusFilter === "PaymentFailed" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("PaymentFailed")}
          >
            Thất bại
          </Button>
          <Button
            variant={statusFilter === "Completed" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("Completed")}
          >
            Đã nhận sân
          </Button>
          <Button
            variant={statusFilter === "Rejected" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("Rejected")}
          >
            Đã hủy
          </Button>
        </div>
      </div>
      <div className="grid gap-6">
        {data?.bookingList?.map((booking) => {
          const { label, color, icon } = getButtonProps(booking.status);

          return (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaFootballBall className="w-12 h-12 text-blue-500" />
                </div>
                <div className="ml-6">
                  <h2 className="text-lg font-bold text-gray-900">{booking.name}</h2>
                  <p className="text-sm text-gray-600">Địa chỉ: {booking.address}</p>
                  <p className="text-sm text-gray-600">
                    Ngày: {new Date(booking.date)?.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Thời gian: {booking?.timeSlotBooked?.join(", ")}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{booking.totalPrice} VND</p>
                <Button
                  variant="contained"
                  color={color}
                  startIcon={icon}
                  onClick={(e) => handleOpenMenu(e, booking.id)}
                >
                  {label}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleUpdateStatus()}>Cập nhật trạng thái</MenuItem>
        <MenuItem onClick={() => handleRejectStatus()}>Hủy đơn</MenuItem>
      </Menu>
      <div className="flex justify-center mt-6">
        <Pagination
          count={Math.ceil(data?.count / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default BookingList;