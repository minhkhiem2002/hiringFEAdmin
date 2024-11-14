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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getSportTypeRequest } from '../../../../redux/actions/Filter/typeSportActions';
import { postFieldsOwnerRequest } from '../../../../redux/actions/Owner/fieldsActions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '800px',
    maxWidth: 'none'
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
  const { data: dataType } = useSelector(state => state.filterSportType);

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
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert('You can upload a maximum of 4 images.');
      return;
    }

    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(fileURLs);

    setFormData((prevData) => ({
      ...prevData,
      Images: files,
    }));
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.Images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);

    setFormData((prevData) => ({
      ...prevData,
      Images: newImages,
    }));
    setPreviewImages(newPreviews);
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
  
    // Append non-file fields
    formDataToSubmit.append('Name', formData.Name);
    formDataToSubmit.append('Sport', formData.Sport);
    formDataToSubmit.append('Address', formData.Address);
    formDataToSubmit.append('Description', formData.Description);
    formDataToSubmit.append('FieldTypeId', formData.FieldTypeId);
    formDataToSubmit.append('OwnerId', sessionStorage.getItem('userRoleId'));
    formDataToSubmit.append('StartTime', "0");
    formDataToSubmit.append('EndTime', "24");
  
    formData.Images.forEach((image) => {
      formDataToSubmit.append('Images', image);
    });
  
    formDataToSubmit.append('Prices', JSON.stringify(formData.Prices));
  
    console.log('Form data to submit:', formDataToSubmit);

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
            />
            <div className="flex space-x-2 mt-2">
              {previewImages.map((src, index) => (
                <div key={index} className="relative">
                  <img src={src} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover" />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'white' }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          {['Name','Sport' ,'Address', 'Description'].map((field) => (
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
            <FormControl fullWidth variant="outlined">
              <InputLabel>Loại sân</InputLabel>
              <Select
                value={formData.FieldTypeId}
                onChange={(e) => handleInputChange('FieldTypeId', e.target.value)}
                label="Loại sân"
              >
                {dataType && dataType.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Price Slot Inputs */}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAddPriceSlot}>
              Add Time Slot
            </Button>
            {formData.Prices.map((priceSlot, index) => (
              <Grid container spacing={2} key={index} className="mt-2">
                <Grid item xs={4}>
                  <TextField
                    label="Start Time"
                    type="time"
                    fullWidth
                    value={priceSlot.StartTime}
                    onChange={(e) => handlePriceChange(index, 'StartTime', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="End Time"
                    type="time"
                    fullWidth
                    value={priceSlot.EndTime}
                    onChange={(e) => handlePriceChange(index, 'EndTime', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Price"
                    type="number"
                    fullWidth
                    value={priceSlot.Price}
                    onChange={(e) => handlePriceChange(index, 'Price', e.target.value)}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={() => setOpenAddModal(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default AddModal;
