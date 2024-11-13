import {
    Grid,
    Dialog,
    DialogContent,
    IconButton,
    Stack,
    Divider,
    Button
  } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ImageForget from '../../assets/images/ForgetPassword.png'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
      width: '400px', 
      maxWidth: 'none', 
    },
}));

const ModalDoiMatKhau = (props) => {
    const { openForgetModal, setOpenForgetModal } = props;
    return (
        <BootstrapDialog
            onClose={() => setOpenForgetModal(false)}
            aria-labelledby="customized-dialog-title"
            open={openForgetModal}
        >
          <IconButton
            aria-label="close"
            onClick={() => setOpenForgetModal(false)}
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
              <Grid container>
                <Grid item xs = {12} className = "flex items-center justify-center">
                  <img
                    src = {ImageForget}
                    width = {300}
                    height = {300}
                    alt = "forgetimages"
                  />
                </Grid>
                <Grid item xs={12} className="flex items-center justify-center h-full">
                  <div className="text-center pt-3 pb-1">
                    <p className="text-2xl font-semibold py-1">Quên mật khẩu?</p>
                    <p className="text-base font-medium text-slate-600">Vui lòng liên hệ số hotline <span className="text-xl font-semibold text-slate-600">18001800</span></p>
                    <p className="text-base font-medium text-slate-600">để được cấp lại mật khẩu mới</p>
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
        </BootstrapDialog>      
    )
}
export default ModalDoiMatKhau