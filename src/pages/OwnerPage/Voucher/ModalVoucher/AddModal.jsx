import React, { useState } from "react";
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
import { postVoucherRequest } from "../../../../redux/actions/Owner/voucherActions";

const AddModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    quantity: 0,
    minPrice: 0,
    percentSale: 0,
    maxSale: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Chuyển các giá trị số thành dạng number
    if (name === "quantity" || name === "minPrice" || name === "percentSale" || name === "maxSale") {
      setFormData({
        ...formData,
        [name]: value === "" ? 0 : Number(value), // Nếu input rỗng thì đặt giá trị là 0
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    // Chuyển đổi startTime và endTime thành datetime với thời gian là 00:00:00
    const updatedFormData = {
      ...formData,
      startTime: `${formData.startTime}T00:00:00.000Z`,
      endTime: `${formData.endTime}T23:59:59.999Z`,
    };
    dispatch(postVoucherRequest(updatedFormData));
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
            Tạo Voucher Mới
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <Divider className="mb-4" />

        {/* Form */}
        <Grid container spacing={2}>
          {/* Column 1 */}
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
          {/* Column 2 */}
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
          {/* Column 3 */}
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
          {/* Column 4 */}
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
            Tạo
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddModal;
