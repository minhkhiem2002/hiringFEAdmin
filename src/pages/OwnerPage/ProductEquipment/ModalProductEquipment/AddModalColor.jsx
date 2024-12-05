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
import DeleteIcon from '@mui/icons-material/Delete';
import SelectBox from 'devextreme-react/select-box';
import TagBox from 'devextreme-react/tag-box';
import {
  fetchColorsRequest,
  fetchSizesRequest,
} from '../../../../redux/actions/Owner/FilterProductActions';
import { postAddColorProductRequest } from '../../../../redux/actions/Owner/productActions';

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

const AddModalColor = ({ openAddModal, setOpenAddModal, id }) => {
  console.log('Id receive', id)
  const [formData, setFormData] = useState({
    ColorId: null,
    Price: '',
    Images: null,
    SizeIds: [],
    SportProductId: id 
  });
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const { colors: colorData } = useSelector((state) => state.filterProduct);
  const { sizes: sizeData } = useSelector((state) => state.filterProduct);

  useEffect(() => {
    if (openAddModal) {
      dispatch(fetchColorsRequest());
      dispatch(fetchSizesRequest());
      setFormData((prev) => ({
        ...prev,
        SportProductId: id ,
      }));
    }
  }, [openAddModal]);  

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        Images: file,
      }));
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setFormData((prevData) => ({
      ...prevData,
      Images: null,
    }));
  };

  const handleSubmit = () => {
    if (!formData.Images) {
      alert('You must upload an image.');
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'Images') {
        formDataToSubmit.append(key, formData[key]);
      } else if (key === 'SizeIds') {
        formData[key].forEach((sizeId) => {
          formDataToSubmit.append('SizeIds', sizeId);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    dispatch(postAddColorProductRequest(formDataToSubmit));
    setOpenAddModal(false);
  };

  return (
    <BootstrapDialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
      <DialogTitle>
        Add New Color Product
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
          {/* Image Upload */}
          <Grid item xs={12}>
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
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" hidden onChange={handleImageUpload} />
                </Button>
              )}
              {imagePreview && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'rgba(255, 255, 255, 0.8)',
                  }}
                  onClick={handleDeleteImage}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          </Grid>

          {/* Form Fields */}
          <Grid item xs={12}>
            <SelectBox
              height={55}
              items={colorData || []}
              value={formData.ColorId}
              onValueChanged={(e) => handleInputChange('ColorId', e.value)}
              displayExpr="name"
              valueExpr="id"
              placeholder="Select Color"
              label="Select Color"
              showClearButton
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={formData.Price}
              onChange={(e) => handleInputChange('Price', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TagBox
              height={55}
              items={sizeData || []}
              value={formData.SizeIds}
              onValueChanged={(e) => handleInputChange('SizeIds', e.value)}
              displayExpr="value"
              valueExpr="id"
              placeholder="Select Sizes"
              label="Select Sizes"
              showClearButton
            />
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

export default AddModalColor;
