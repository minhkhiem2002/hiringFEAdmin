import React, { useEffect, useState } from "react";
import { Pagination, Button, Menu, MenuItem, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersRequest, rejectOrderRequest, updateOrderStatusRequest } from "../../../redux/actions/Admin/orderActions";
import { FaShippingFast, FaEdit, FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa";
import DeleteModal from "./ModalOrder/DeleteModal";
import Loading from "./../../../components/Loading/loading";

const OrderList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, updateSuccess, rejectSuccess } = useSelector((state) => state.orderAdmin);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const params = {
      PageSize: itemsPerPage,
      PageNumber: page,
      Status: statusFilter,
    };
    dispatch(getOrdersRequest(params));
  }, [dispatch, page, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  useEffect(() => {
    if (updateSuccess || rejectSuccess) {
      const params = {
        PageSize: itemsPerPage,
        PageNumber: page,
        Status: statusFilter,
      };
      dispatch(getOrdersRequest(params));
    }
  }, [dispatch, updateSuccess, rejectSuccess, page, statusFilter]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleOpenMenu = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUpdateStatus = () => {
    if (selectedOrderId) {
      dispatch(updateOrderStatusRequest(selectedOrderId));
    }
    handleCloseMenu();
  };

  const handleRejectStatus = () => {
    if (selectedOrderId) {
      setOpenDeleteModal(true);
    }
    handleCloseMenu();
  };

  const getButtonProps = (status) => {
    switch (status) {
      case "Pending":
        return { label: "Đang xử lý", icon: <FaEdit />, color: "info" };
      case "PaymentReceived":
        return { label: "Thanh toán thành công", icon: <FaCheckCircle />, color: "success" };
      case "PaymentFailed":
        return { label: "Thanh toán thất bại", icon: <FaTimesCircle />, color: "error" };
      case "Transporting":
        return { label: "Đang vận chuyển", icon: <FaTruck />, color: "primary" };
      case "Completed":
        return { label: "Đã giao hàng", icon: <FaCheckCircle />, color: "success" };
      case "Rejected":
        return { label: "Đã hủy", icon: <FaTimesCircle />, color: "error" };
      default:
        return { label: "Chưa có trạng thái", icon: null, color: "default" };
    }
  };

  return (
    <div className="p-6 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý đơn hàng</h1>
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
            variant={statusFilter === "Transporting" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("Transporting")}
          >
            Vận chuyển
          </Button>
          <Button
            variant={statusFilter === "Completed" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("Completed")}
          >
            Đã giao
          </Button>
          <Button
            variant={statusFilter === "Rejected" ? "contained" : "outlined"}
            onClick={() => handleStatusChange("Rejected")}
          >
            Đã hủy
          </Button>
        </div>
      </div>
      {isLoading ? <Loading/> : (
      <div className="grid gap-4">
        {data?.orders?.map((order) => {
          const { label, icon, color } = getButtonProps(order.orderStatus);

          return (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-blue-500 text-2xl">
                  <FaShippingFast />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Đơn hàng #{order.id}</h2>
                  <p className="text-sm text-gray-600">Người nhận: {order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  <p className="text-sm text-gray-600">Địa chỉ: {order.shippingAddress.addressLine}</p>
                  <p className="text-sm text-gray-600">Ngày đặt: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-500">{order.subTotal + order.deliveryFee} VND</p>
                <div className="flex items-center justify-end gap-2 mt-2">
                  <Button
                    variant="contained"
                    startIcon={icon}
                    onClick={(e) => handleOpenMenu(e, order.id)}
                  >
                    {label}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
            )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleUpdateStatus()}>Cập nhật trạng thái</MenuItem>
        <MenuItem onClick={() => handleRejectStatus()}>Hủy đơn</MenuItem>
      </Menu>
      <DeleteModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} id={selectedOrderId} />
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

export default OrderList;
