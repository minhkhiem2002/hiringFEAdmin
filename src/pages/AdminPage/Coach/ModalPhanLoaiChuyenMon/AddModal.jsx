import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
// 
import { useSelector, useDispatch } from "react-redux";
import TextBox1 from "./TextBox1";
import TextBox2 from "./TextBox2";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '500px', 
  },
}));
const AddModal = ({ openAddModal, setOpenAddModal }) => {
  const idNguoiDung = sessionStorage.getItem("idnguoidung") || -1;
  const idDkDn = sessionStorage.getItem("iddkdn") || -1;
  const [selectedValues, setSelectedValues] = useState({});
  const PlnghdRef = useRef(null);
  const { addSuccess } = useSelector((state) => state.nhapdanhmucPLCM_QLGM);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addSuccess) {
      setSelectedValues({
        Idnguoidung: idNguoiDung,
        IddkDn: idDkDn,
        Plnghd: null,
        Plcmbp: null,
      });
      setOpenAddModal(false);
    }
  }, [addSuccess]);

  useEffect(() => {
    if (openAddModal) {
      setSelectedValues((prevValues) => ({
        ...prevValues,
        Idnguoidung: idNguoiDung,
        IddkDn: idDkDn,
      }))
    }
  },[openAddModal])

  const handleSelectChange = (selectId, value) => {
    setSelectedValues((prevValues) => ({
        ...prevValues,
        [selectId]: value
    }));
};

  const handleSave = async () => {
    const validations = [
      PlnghdRef.current?.validate(),
    ];
    const results = await Promise.all(validations);
  
    const allValid = results.every(result => result?.isValid);
    if (allValid) {
    const formData = new FormData();
    formData.append("values", JSON.stringify(selectedValues));
    
    }
  };

  return (
    <BootstrapDialog
    onClose={() => setOpenAddModal(false)}
    aria-labelledby="customized-dialog-title"
    open={openAddModal}
  >
    <DialogTitle id="customized-dialog-title">
      Nhập phân loại chuyên môn của bộ phận
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={() => setOpenAddModal(false)}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent dividers>
      <Grid container className='py-5' rowSpacing={2}>
           <Grid item xs={12}>
            <TextBox1 ref={PlnghdRef} onChange={(value) => { handleSelectChange("Plnghd", value) }}/>
          </Grid>
          <Grid item xs={12}>
            <TextBox2 onChange={(value) => { handleSelectChange("Plcmbp", value) }}/>
          </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
    <Button
        autoFocus
        onClick={handleSave}
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
        Lưu
      </Button>
      <Button
          onClick={() => setOpenAddModal(false)}
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

export default AddModal;



