import React, { useState } from 'react';
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { postCustomerRequest } from '../../../../redux/actions/Admin/customerActions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '600px',
    maxWidth: 'none',
  },
}));

const AddModal = ({ openAddModal, setOpenAddModal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    avatar: '',
    dateOfBirth: '',
    location: '',
    role: 'Customer',
  });

  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    const dataToSubmit = {
      ...formData,
      dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
    };

    console.log('Dữ liệu gửi lên:', dataToSubmit);
    dispatch(postCustomerRequest(dataToSubmit)); 
    setOpenAddModal(false);
  };

  return (
    <BootstrapDialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
      <DialogTitle>
        Thêm mới Khách hàng
        <IconButton
          aria-label="close"
          onClick={() => setOpenAddModal(false)}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'location'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={
                  field === 'firstName' ? 'Họ' :
                  field === 'lastName' ? 'Tên' :
                  field === 'email' ? 'Email' :
                  field === 'password' ? 'Mật khẩu' :
                  field === 'confirmPassword' ? 'Xác nhận mật khẩu' : 'Địa chỉ'
                }
                fullWidth
                variant="outlined"
                type={field.includes('password') ? 'password' : 'text'}
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Giới tính"
              fullWidth
              variant="outlined"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Ngày sinh"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Lưu
        </Button>
        <Button onClick={() => setOpenAddModal(false)} color="secondary">
          Đóng
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default AddModal;
