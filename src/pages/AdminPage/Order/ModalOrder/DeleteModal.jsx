import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { rejectOrderRequest } from "../../../../redux/actions/Admin/orderActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '400px',
    maxWidth: 'none',
  },
}));

function DeleteModal({ openDeleteModal, setOpenDeleteModal, id }) {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const [idKey , setIdKey] = useState("");
  console.log('Key receive',idKey)
  useEffect(() => {
    if (openDeleteModal){
        setIdKey(id)
    }
  },[openDeleteModal])
  const hidePopup = () => {
    setOpenDeleteModal(false);
  };

  console.log('Key',idKey)

  const handleDelete = () => {
    const data = { orderId: id, reason };
    dispatch(rejectOrderRequest(data));
    setOpenDeleteModal(false);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  return (
    <BootstrapDialog
      onClose={hidePopup}
      open={openDeleteModal}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle id="customized-dialog-title">Hủy đơn hàng</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={hidePopup}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} className="flex justify-start items-center">
            <Typography className="py-2 text-black truncate">
              Bạn có muốn hủy đơn hàng này?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lý do hủy"
              variant="outlined"
              value={reason}
              onChange={handleReasonChange}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="primary" size="medium" sx={{ minWidth: "100px" }}>
          Hủy đơn
        </Button>
        <Button onClick={hidePopup} variant="contained" autoFocus color="primary" size="medium" sx={{ minWidth: "100px" }}>
          Hủy bỏ
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default DeleteModal;
