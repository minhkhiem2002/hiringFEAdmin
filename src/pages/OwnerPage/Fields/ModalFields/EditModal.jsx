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
import { putFieldsOwnerRequest } from '../../../../redux/actions/Owner/fieldsActions';

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

const EditModal = ({ openEditModal, setOpenEditModal, infoDetail }) => {
  const [formData, setFormData] = useState({
    sportFieldId: '',
    name: '',
    description: '',
    address: '',
    sport: '',
  });

  const dispatch = useDispatch();
  const { data: dataType } = useSelector((state) => state.filterSportType);

  useEffect(() => {
    if (openEditModal) {
      dispatch(getSportTypeRequest());
    }

    if (infoDetail) {
      setFormData({
        sportFieldId: infoDetail.sportFieldId || '',
        name: infoDetail.name || '',
        description: infoDetail.description || '',
        address: infoDetail.address || '',
        sport: infoDetail.sport || '',
      });
    }
  }, [openEditModal, infoDetail]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      sportFieldId: formData.sportFieldId,
      name: formData.name,
      description: formData.description,
      address: formData.address,
      sport: formData.sport,
    };

    dispatch(putFieldsOwnerRequest(payload));
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
          {['name', 'address', 'sport', 'description'].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                variant="outlined"
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={() => setOpenEditModal(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditModal;
