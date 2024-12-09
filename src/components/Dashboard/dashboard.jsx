import React, { useEffect } from "react"
import { Grid } from "@mui/material"
import CardSoLuongSanPhamDichVu from "./CardSoLuongSanPhamDichVu/CardSoLuongSanPhamDichVu";
import CardDuBaoDoanhSo from "./CardDuBaoDoanhSo/CardDuBaoDoanhSo";
import CardSoLuongDiaDanh from "./CardSoLuongDiaDanh/CardSoLuongDiaDanh";
import CardDuBaoKhachHang from "./CardDuBaoKhachHang/CardDuBaoKhachHang";

const DashBoard = () => {
    useEffect(() => {
        document.title = "Spotta";
      }, []);
    return (
        <div className="bg-white h-fit w-full rounded-[3px] shadow-2xl ml-2 px-4 py-4">
            <Grid container spacing={2}>
                <Grid item container xs = {12} spacing={2}>
                    <Grid item xs = {3}>
                        <CardSoLuongSanPhamDichVu/>
                    </Grid>
                    <Grid item xs = {3}>
                    <CardSoLuongDiaDanh/>
                    </Grid>
                    <Grid item xs = {3}>
                    <CardDuBaoDoanhSo/>
                    </Grid>
                    <Grid item xs = {3}>
                        <CardDuBaoKhachHang/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} item xs = {12}>
                  {/* <Grid item xs={6}>
                     <PhanCapBoPhan/>
                    </Grid>
                    <Grid item xs={6}>
                       <ChartDuBaoDoanhThu/>
                    </Grid> */}
                </Grid>
                <Grid item xs = {12}>
                    {/* <ChartDuBaoDoanhSo/> */}
                </Grid>
            </Grid>
        </div>
    )
}
export default DashBoard