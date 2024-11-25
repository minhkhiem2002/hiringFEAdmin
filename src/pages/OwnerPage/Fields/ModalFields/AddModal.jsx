import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getSportTypeRequest } from '../../../../redux/actions/Filter/typeSportActions';
import { postFieldsOwnerRequest } from '../../../../redux/actions/Owner/fieldsActions';
import SelectBox from 'devextreme-react/select-box';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '800px',
    maxWidth: 'none',
  },
}));

const AddModal = ({ openAddModal, setOpenAddModal }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Address: '',
    Sport: '',
    Description: '',
    FieldTypeId: '',
    Images: [],
    Prices: [],
  });

  const dispatch = useDispatch();
  const { data: dataType } = useSelector((state) => state.filterSportType);

  useEffect(() => {
    if (openAddModal) {
      dispatch(getSportTypeRequest());
    }
  }, [openAddModal]);

  const [previewImages, setPreviewImages] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; // Lấy file đầu tiên từ input
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
  
      if (formData.Images.length >= 4) {
        alert('You can upload a maximum of 4 images.');
        return;
      }
  
      setPreviewImages((prevPreviews) => [...prevPreviews, imagePreviewUrl]);
  
      setFormData((prevData) => ({
        ...prevData,
        Images: [...prevData.Images, file],
      }));
    } else {
      console.log("No file selected");
    }
  };
  

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...previewImages];
    const updatedImages = [...formData.Images];

    updatedPreviews.splice(index, 1);
    updatedImages.splice(index, 1);

    setPreviewImages(updatedPreviews);
    setFormData((prevData) => ({
      ...prevData,
      Images: updatedImages,
    }));
  };

  const handleAddPriceSlot = () => {
    setFormData((prevData) => ({
      ...prevData,
      Prices: [...prevData.Prices, { StartTime: '', EndTime: '', Price: '' }],
    }));
  };

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...formData.Prices];
    newPrices[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      Prices: newPrices,
    }));
  };

  const handleSubmit = () => {
    if (formData.Images.length < 1) {
      alert('You must upload at least 1 image.');
      return;
    }
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('Name', formData.Name);
    formDataToSubmit.append('Sport', formData.Sport);
    formDataToSubmit.append('Address', formData.Address);
    formDataToSubmit.append('Description', formData.Description);
    formDataToSubmit.append('FieldTypeId', formData.FieldTypeId);
    formDataToSubmit.append('OwnerId', sessionStorage.getItem('userRoleId'));
  
    // Append images
    formData.Images.forEach((image) => {
      formDataToSubmit.append('Images', image);
    });
  
    if (Array.isArray(formData.Prices)) {
      formDataToSubmit.append('Prices', JSON.stringify(formData.Prices));
    }
  
    dispatch(postFieldsOwnerRequest(formDataToSubmit));
  
    setOpenAddModal(false);
  };
  

  return (
    <BootstrapDialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
      <DialogTitle>
        Add New Field
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
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span">
                Upload Images
              </Button>
            </label>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="relative w-24 h-24 border border-gray-300 flex items-center justify-center">
                  {previewImages[index] ? (
                    <>
                      <img src={previewImages[index]} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(index)}
                        sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'white' }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : (
                    <span className="text-gray-400">Empty</span>
                  )}
                </div>
              ))}
            </div>
          </Grid>

          {['Name', 'Sport', 'Address', 'Description'].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field}
                fullWidth
                variant="outlined"
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <SelectBox
              items={dataType || []}
              height={55}
              value={formData.FieldTypeId}
              onValueChanged={(e) => handleInputChange('FieldTypeId', e.value)}
              displayExpr="name"
              valueExpr="id"
              searchEnabled={true}
              placeholder="Select field type"
              showClearButton={true}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAddPriceSlot}>
              Add Time Slot
            </Button>
            {formData.Prices.map((priceSlot, index) => (
              <Grid container spacing={2} key={index} className="mt-4">
                <Grid item xs={4}>
                  <TextField
                    label="Start Time"
                    type="time"
                    fullWidth
                    value={priceSlot.StartTime}
                    onChange={(e) => handlePriceChange(index, 'StartTime', e.target.value)}
                    className="mt-4"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="End Time"
                    type="time"
                    fullWidth
                    value={priceSlot.EndTime}
                    onChange={(e) => handlePriceChange(index, 'EndTime', e.target.value)}
                     className="mt-4"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Price"
                    type="number"
                    fullWidth
                    value={priceSlot.Price}
                    onChange={(e) => handlePriceChange(index, 'Price', e.target.value)}
                     className="mt-4"
                  />
                </Grid>
              </Grid>
            ))}
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
