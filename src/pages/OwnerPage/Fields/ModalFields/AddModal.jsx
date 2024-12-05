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
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectBox } from 'devextreme-react';

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

  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const dispatch = useDispatch();
  const { data: dataType } = useSelector((state) => state.filterSportType);

  useEffect(() => {
    if (openAddModal) {
      dispatch(getSportTypeRequest());
    }
  }, [openAddModal]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setImagePreviews(updatedPreviews);

      const updatedImages = [...formData.Images];
      updatedImages[index] = file;
      setFormData({ ...formData, Images: updatedImages });
    }
  };

  const handleDeleteImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = null;
    setImagePreviews(updatedPreviews);

    const updatedImages = [...formData.Images];
    updatedImages[index] = null;
    setFormData({ ...formData, Images: updatedImages });
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

  const handleDeletePriceSlot = (index) => {
    const updatedPrices = formData.Prices.filter((_, idx) => idx !== index);
    setFormData({ ...formData, Prices: updatedPrices });
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
          {/* Image Upload and Preview */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {[0, 1, 2, 3].map((index) => (
                <Grid item xs={3} key={index} sx={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '150px',
                      border: '2px dashed #ccc',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: '#f9f9f9',
                    }}
                  >
                    {imagePreviews[index] ? (
                      <img
                        src={imagePreviews[index]}
                        alt={`Field Preview ${index}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="bg-slate-400 w-full h-[150px] border border-gray-400 flex items-center justify-center">
                        <Button
                          variant="contained"
                          component="label"
                          sx={{
                            position: 'absolute',
                            background: 'rgba(0, 0, 0, 0.6)',
                            color: '#fff',
                          }}
                        >
                          Upload
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleImageUpload(e, index)}
                          />
                        </Button>
                      </div>
                    )}
                    {imagePreviews[index] && (
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          background: 'rgba(255, 255, 255, 0.8)',
                        }}
                        onClick={() => handleDeleteImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Form Fields */}
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

          {/* Price Slots */}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAddPriceSlot}>
              Add Time Slot
            </Button>
            {formData.Prices.map((priceSlot, index) => (
              <Grid container spacing={2} key={index} sx={{ marginTop: '6px' }}>
                <Grid item xs={3.8}>
                  <TextField
                    label="Start Time"
                    type="time"
                    fullWidth
                    value={priceSlot.StartTime}
                    onChange={(e) => handlePriceChange(index, 'StartTime', e.target.value)}
                    className="mt-4"
                  />
                </Grid>
                <Grid item xs={3.8}>
                  <TextField
                    label="End Time"
                    type="time"
                    fullWidth
                    value={priceSlot.EndTime}
                    onChange={(e) => handlePriceChange(index, 'EndTime', e.target.value)}
                    className="mt-4"
                  />
                </Grid>
                <Grid item xs={3.8}>
                  <TextField
                    label="Price"
                    type="number"
                    fullWidth
                    value={priceSlot.Price}
                    onChange={(e) => handlePriceChange(index, 'Price', e.target.value)}
                    className="mt-4"
                  />
                </Grid>
                <Grid item xs={0.6}>
                  <IconButton
                    onClick={() => handleDeletePriceSlot(index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
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
