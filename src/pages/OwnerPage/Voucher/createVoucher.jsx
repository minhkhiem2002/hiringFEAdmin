import React, { useState, useEffect } from "react";
import { TextField, Pagination, IconButton, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddModal from "./ModalVoucher/AddModal";
import EditModal from "./ModalVoucher/EditModal";
import { getVoucherRequest } from "../../../redux/actions/Owner/voucherActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading/loading";
import DeleteModal from "./ModalVoucher/DeleteModal";

const CreateVoucher = () => {
  const dispatch = useDispatch();
  const { data: vouchers, isLoading, isError, addSuccess, deleteSuccess, editSuccess } = useSelector(
    (state) => state.voucher
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(
      getVoucherRequest({
        OwnerId: sessionStorage.getItem("userRoleId"),
        pageSize: itemsPerPage,
        pageNumber: currentPage,
      })
    );
}, []);

  // Gọi API khi thay đổi trang hoặc searchTerm
  useEffect(() => {
      dispatch(
        getVoucherRequest({
          pageSize: itemsPerPage,
          pageNumber: currentPage,
        })
      );
  }, [currentPage, addSuccess, deleteSuccess, editSuccess]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEdit = (voucher) => {
    setSelectedVoucher(voucher);
    setOpenEdit(true);
  };

  const handleDelete = (id) => {
    setIdDelete(id)
    setOpenDelete(true);
  };

  const handleCreateVoucher = () => {
    setOpenAdd(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <TextField
          label="Tìm kiếm voucher..."
          variant="outlined"
          size="small"
          className="w-[400px] bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleCreateVoucher}
        >
          Tạo Voucher
        </Button>
      </div>

      {/* Loading/Error */}
      {isLoading ? (
        <Loading/>
      ) : isError ? (
        <p>Có lỗi xảy ra khi tải dữ liệu.</p>
      ) : vouchers?.length === 0 ? (
        <p>Không tìm thấy voucher nào.</p>
      ) : (
        <>
          {/* Grid Layout */}
          <div className="grid grid-cols-3 gap-6">
            {vouchers?.voucherList?.map((voucher) => (
              <div
                key={voucher.id}
                className="relative border rounded-lg shadow-md bg-white p-4 text-sm"
              >
                <div className="absolute top-2 right-2 text-xs flex gap-2">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(voucher)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(voucher.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
                <h3 className="text-lg font-bold text-red-500 mb-1">
                  Giảm {voucher.percentSale}%
                </h3>
                <p className="text-gray-700 mb-1">
                  Đơn Tối Thiểu: {voucher.minPrice.toLocaleString()}đ
                </p>
                <p className="text-gray-700 mb-1">
                  Giảm tối đa: {voucher.maxSale.toLocaleString()}đ
                </p>
                <p className="text-gray-700 mb-1">Số lượng: {voucher.quantity}</p>
                <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
                  <span>Sản phẩm nhất định</span>
                  <span>HSD: {new Date(voucher.endTime).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-orange-500 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Đã dùng 100%</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              count={Math.ceil(vouchers?.count / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </>
      )}

      {/* Modals */}
      <AddModal open={openAdd} onClose={() => setOpenAdd(false)} />
      <EditModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          voucher={selectedVoucher}
        />
      <DeleteModal openDeleteModal={openDelete} setOpenDeleteModal={setOpenDelete} infoDetail={idDelete}/>
    </div>
  );
};

export default CreateVoucher;
