import { Grid } from "@mui/material"
import LayerIcon from '../../../assets/icons/WarningIcon.svg'
import { Tooltip } from "devextreme-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaceMarker from '../../../assets/icons/PlaceMarker.svg';
const CardSoLuongDiaDanh = () => {
  const [listData, setListData] = useState(null);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
 
    return (
        <div className="w-full h-28 border rounded-[3px] shadow-md px-3 py-1">
        <Grid container spacing={1} className="py-2">
          <Grid item xs={12} className="flex justify-between">
            <p className="text-base text-slate-500 font-semibold">
              Số Lượng Địa Danh
            </p>
            <div className="h-7 w-7 justify-center items-center bg-[#FFEEDA] px-1 py-1 rounded-md">
              <img
                src={PlaceMarker}
                alt="icon"
                id="icon-address"
                className="w-5 h-5"
              />
              <Tooltip
                target="#icon-address"
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
              <p className="text-2xl font-bold text-slate-500">100</p>
              <p className="text-green-700 bg-green-200 items-center justify-center h-5 mx-2 rounded-md px-1">
                ▲50%
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    )
}
export default CardSoLuongDiaDanh;