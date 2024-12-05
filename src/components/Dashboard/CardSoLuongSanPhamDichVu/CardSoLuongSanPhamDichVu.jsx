import { Grid, LinearProgress } from "@mui/material";
import LayerIcon from "../../../assets/icons/WarningIcon.svg";
import { Tooltip } from "devextreme-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardboardBox from '../../../assets/icons/CardboardBox.svg';
const CardSoLuongSanPhamDichVu = () => {
  const [listData, setListData] = useState(null);
  const [total, setTotal] = useState(0);
  const [dataChange, setDataChange] = useState(null);
  const dispatch = useDispatch();


  return (
    <div className="w-full h-28 border rounded-[3px] shadow-md px-3 py-1">
      <Grid container className="py-2" spacing={1}>
        <Grid item xs={12} className="flex justify-between">
          <p className="text-base text-slate-500 font-semibold">
            Số Lượng Sản Phẩm Dịch Vụ
          </p>
          <div className="h-7 w-7 justify-center items-center bg-[#E5F3FF] px-1 py-1 rounded-md">
            <img
              src={CardboardBox}
              alt="icon"
              id="icon-product"
              className="w-5 h-5"
            />
            <Tooltip
              target="#icon-product"
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
            <p className="text-2xl font-bold text-slate-500">200</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default CardSoLuongSanPhamDichVu;
