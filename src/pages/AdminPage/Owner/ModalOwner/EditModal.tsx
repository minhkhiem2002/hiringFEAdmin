import React, { useState, useEffect } from 'react';
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
import { putOwnerRequest } from './../../../../redux/actions/Admin/ownerActions';

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

const EditModal = ({ openEditModal, setOpenEditModal, ownerData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    location: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (ownerData) {
      setFormData({
        firstName: ownerData.firstName || '',
        lastName: ownerData.lastName || '',
        email: ownerData.email || '',
        gender: ownerData.gender || '',
        dateOfBirth: ownerData.dateOfBirth || '',
        location: ownerData.location || '',
      });
    }
  }, [ownerData]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const dataToUpdate = {
      ...formData,
      id: ownerData.id,
      dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
    };

    console.log('Dữ liệu cập nhật:', dataToUpdate);
    dispatch(putOwnerRequest(dataToUpdate)); 
    setOpenEditModal(false);
  };

  return (
    <BootstrapDialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <DialogTitle>
        Chỉnh sửa Chủ sân
        <IconButton
          aria-label="close"
          onClick={() => setOpenEditModal(false)}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {['firstName', 'lastName', 'email', 'location'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={
                  field === 'firstName' ? 'Họ' :
                  field === 'lastName' ? 'Tên' :
                  field === 'email' ? 'Email' : 'Địa chỉ'
                }
                fullWidth
                variant="outlined"
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
        <Button onClick={() => setOpenEditModal(false)} color="secondary">
          Đóng
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditModal;
