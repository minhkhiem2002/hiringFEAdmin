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
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { putFieldsOwnerRequest, getFieldDetailOwnerRequest } from '../../../../redux/actions/Owner/fieldsActions';

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

const EditModal = ({ openEditModal, setOpenEditModal, fieldData }) => {
  const [formData, setFormData] = useState({
    sportFieldId: '',
    name: '',
    description: '',
    address: '',
    sport: '',
    prices: [],
    pictureUrls: [], // Mảng chứa URL của hình ảnh
  });
  const [imagePreviews, setImagePreviews] = useState([]); // Mảng chứa hình ảnh tạm thời
  const dispatch = useDispatch();

  const { dataDetail } = useSelector(state => state.fieldsOwner);

  useEffect(() => {
    if (dataDetail) {
      setFormData({
        sportFieldId: dataDetail.id || '',
        name: dataDetail.name || '',
        description: dataDetail.description || '',
        address: dataDetail.address || '',
        sport: dataDetail.sport || '',
        prices: dataDetail.timeFrames || [],
        pictureUrls: dataDetail.images?.map(img => img.pictureUrl) || [],
      });
      setImagePreviews(dataDetail.images?.map(img => img.pictureUrl) || []);
    }
  }, [dataDetail]);

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = imageUrl;

      setImagePreviews(updatedPreviews);

      const formData = new FormData();
      formData.append('file', file);
      fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const updatedUrls = [...formData.pictureUrls];
            updatedUrls[index] = data.url;
            setFormData(prevData => ({
              ...prevData,
              pictureUrls: updatedUrls,
            }));
          }
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }
  };

  const handleDeleteImage = index => {
    const updatedPreviews = [...imagePreviews];
    const updatedUrls = [...formData.pictureUrls];
    updatedPreviews.splice(index, 1);
    updatedUrls.splice(index, 1);

    setImagePreviews(updatedPreviews);
    setFormData(prevData => ({
      ...prevData,
      pictureUrls: updatedUrls,
    }));
  };

  const handlePriceChange = (index, field, value) => {
    const updatedPrices = [...formData.prices];
    updatedPrices[index] = { ...updatedPrices[index], [field]: value };
    setFormData(prevData => ({
      ...prevData,
      prices: updatedPrices,
    }));
  };

  const handleAddPriceSlot = () => {
    setFormData(prevData => ({
      ...prevData,
      prices: [...prevData.prices, { startTime: '', endTime: '', price: '' }], // Add new time slot
    }));
  };

  const handleDeletePriceSlot = index => {
    const updatedPrices = [...formData.prices];
    updatedPrices.splice(index, 1); // Remove time slot
    setFormData(prevData => ({
      ...prevData,
      prices: updatedPrices,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.address) {
      alert('Vui lòng nhập đủ các trường cần thêm');
      return;
    }

    const dataToSubmit = {
      sportFieldId: formData.sportFieldId,
      name: formData.name,
      description: formData.description,
      address: formData.address,
      sport: formData.sport,
      prices: JSON.stringify(formData.prices),
    };

    dispatch(putFieldsOwnerRequest(dataToSubmit));
    setOpenEditModal(false);
  };

  return (
    <BootstrapDialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <DialogTitle>
        Edit Field
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
          {[0, 1, 2, 3].map(index => (
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
                        onChange={e => handleImageUpload(e, index)}
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

          {/* Other form fields */}
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              value={formData.address}
              onChange={e => handleInputChange('address', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sport"
              fullWidth
              variant="outlined"
              value={formData.sport}
              onChange={e => handleInputChange('sport', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAddPriceSlot}>
              Add Time Slot
            </Button>
            {formData.prices.map((priceSlot, index) => (
              <Grid container spacing={2} key={index} sx={{ marginTop: '6px' }}>
                <Grid item xs={3.8}>
                  <TextField
                    label="Start Time"
                    type="time"
                    fullWidth
                    value={priceSlot.startTime}
                    onChange={(e) => handlePriceChange(index, 'startTime', e.target.value)}
                    className="mt-4"
                  />
                </Grid>
                <Grid item xs={3.8}>
                  <TextField
                    label="End Time"
                    type="time"
                    fullWidth
                    value={priceSlot.endTime}
                    onChange={(e) => handlePriceChange(index, 'endTime', e.target.value)}
                    className="mt-4"
                  />
                </Grid>
                <Grid item xs={3.8}>
                  <TextField
                    label="Price"
                    type="number"
                    fullWidth
                    value={priceSlot.price}
                    onChange={(e) => handlePriceChange(index, 'price', e.target.value)}
                    className="mt-4"
                  />
                </Grid>
                <Grid item xs={0.6}>
                  <IconButton
                    color="error"
                    onClick={() => handleDeletePriceSlot(index)}
                    className="mt-4"
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
        <Button onClick={() => setOpenEditModal(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditModal;
