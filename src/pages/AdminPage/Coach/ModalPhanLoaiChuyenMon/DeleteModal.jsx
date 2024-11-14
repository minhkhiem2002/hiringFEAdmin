import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

import { styled } from "@mui/material/styles";
import { useDispatch,useSelector } from "react-redux";
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
function DeleteModal(props) {
  let { openDeleteModal, setOpenDeleteModal, infoDetail } = props;
  const dispatch = useDispatch();
  const { deleteSuccess } = useSelector((state) => state.nhapdanhmucPLCM_QLGM);

  useEffect(() => {
    if (deleteSuccess) {
      setOpenDeleteModal(false);
    }
  }, [deleteSuccess]);

  let hidePopup = () => {
    setOpenDeleteModal(false);
  };
  const handleDelete = () => {
    const formData = new FormData();
    formData.append("key", JSON.stringify(infoDetail.Idplcm));
    
  };

  return (
    <BootstrapDialog
    onClose={hidePopup}
    aria-labelledby="customized-dialog-title"
    open={openDeleteModal}
  >
    <DialogTitle id="customized-dialog-title">Xóa phân loại chuyên môn</DialogTitle>
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
    <Grid container rowSpacing={2}>
        <Grid item xs={12} className="flex justify-start items-center">
          <Typography className="py-6 text-black truncate">
            Bạn có muốn xóa bản ghi này?
          </Typography>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button
        autoFocus
        onClick={handleDelete}
        variant="contained"
        color="primary"
        size="medium"
        sx={{
          minWidth: "100px",
          borderRadius: "4px",
          textTransform: "none",
          backgroundColor: "#4590FF",
          "&:hover": {
            backgroundColor: "#357AE8",
          },
          color: "white",
        }}
      >
        Xoá
      </Button>
      <Button
        onClick={hidePopup}
        variant="contained"
        autoFocus
        color="primary"
        size="medium"
        sx={{
          minWidth: "100px",
          borderRadius: "4px",
          textTransform: "none",
          backgroundColor: "#c7c7c7",
          "&:hover": {
            backgroundColor: "#a8a8a8"
          },
          color: "white"
        }}
      >
        Hủy bỏ
      </Button>
    </DialogActions>
  </BootstrapDialog>
  );
};

export default DeleteModal;
