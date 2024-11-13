import { Grid } from "@mui/material";
import LayerIcon from "../../../assets/icons/WarningIcon.svg";
import { Tooltip } from "devextreme-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDuBaoKhachHangVaDoanhSoRequest } from "../../../redux/actions/QLGM/DuBaoThiTruongActions/DuBaoKhachHangVaDoanhSoActions";
import FundAccounting from '../../../assets/icons/FundAccounting.svg';
const CardDuBaoDoanhSo = () => {
  const [listData, setListData] = useState(null);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { data }= useSelector((state) => state.nhapDuBaoKhachHangVaDoanhSo_QLGM);
  useEffect(() => {
    if(!data){
      dispatch(getDuBaoKhachHangVaDoanhSoRequest());
    }
  },[]);
  useEffect(() => {
     if(data){
       setListData(data?.data);
       const totalSum = data?.data.reduce((sum, item) => sum + item.DbDs, 0);
       setTotal(totalSum)
     }
  },[data]);
  const formatNumber = (value) => {
    if (value == null) return '';
    return parseFloat(value).toLocaleString('en-US');
  };

  return (
    <div className="w-full h-28 border rounded-[3px] shadow-md px-3 py-1">
      <Grid container spacing={1} className="py-2">
        <Grid item xs={12} className="flex justify-between">
          <p className="text-base text-slate-500 font-semibold">
          Dự Báo Doanh Số
          </p>
          <div className="h-7 w-7 justify-center items-center bg-[#D6FFD8] px-1 py-1 rounded-md">
            <img
              src={FundAccounting}
              alt="icon"
              id="icon-sale"
              className="w-5 h-5"
            />
            <Tooltip
              target="#icon-sale"
              position="top"
              showEvent="mouseenter"
              hideEvent="mouseleave"
              contentRender={() => (
                <div>
                  Số lượng thống kê của tháng hiện tại so với tháng trước đó
                </div>
              )}
            />
          </div>
        </Grid>
        <Grid item xs={12} className="justify-start">
          <div className="w-full flex">
            <p className="text-2xl font-bold text-slate-500">{formatNumber(total)} đồng</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default CardDuBaoDoanhSo;
