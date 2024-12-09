import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { putVoucherRequest } from "../../../../redux/actions/Owner/voucherActions";

const EditModal = ({ open, onClose, voucher }) => {
  const [formData, setFormData] = useState({
    name: "",
    voucherId: "",
    startTime: "",
    endTime: "",
    quantity: 0,
    minPrice: 0,
    percentSale: 0,
    maxSale: 0,
  });

  useEffect(() => {
    if (voucher) {
      setFormData({
        name: voucher.name || "",
        voucherId: voucher.voucherId,
        startTime: voucher.startTime?.slice(0, 10) || "",
        endTime: voucher.endTime?.slice(0, 10) || "",
        quantity: voucher.quantity || 0,
        minPrice: voucher.minPrice || 0,
        percentSale: voucher.percentSale || 0,
        maxSale: voucher.maxSale || 0,
      });
    }
  }, [voucher]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["quantity", "minPrice", "percentSale", "maxSale"].includes(name)) {
      setFormData({ ...formData, [name]: value === "" ? 0 : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const updatedFormData = {
      ...formData,
      startTime: `${formData.startTime}T00:00:00.000Z`,
      endTime: `${formData.endTime}T23:59:59.999Z`,
    };
    dispatch(putVoucherRequest(updatedFormData));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="absolute top-1/2 left-1/2 bg-white p-6 rounded-lg shadow-lg"
        style={{ transform: "translate(-50%, -50%)", width: "600px" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" className="font-bold text-gray-700">
            Chỉnh sửa Voucher
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <Divider className="mb-4" />

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Tên Voucher"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số lượng"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Thời gian bắt đầu"
              name="startTime"
              type="date"
              value={formData.startTime}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Thời gian kết thúc"
              name="endTime"
              type="date"
              value={formData.endTime}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Giá tối thiểu"
              name="minPrice"
              type="number"
              value={formData.minPrice}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Giảm giá (%)"
              name="percentSale"
              type="number"
              value={formData.percentSale}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Giảm tối đa"
              name="maxSale"
              type="number"
              value={formData.maxSale}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Divider className="my-4" />

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button variant="contained" color="error" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
