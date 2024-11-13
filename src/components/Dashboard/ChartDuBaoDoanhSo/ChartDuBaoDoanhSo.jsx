import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getDuBaoKhachHangVaDoanhSoRequest } from "../../../redux/actions/QLGM/DuBaoThiTruongActions/DuBaoKhachHangVaDoanhSoActions";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dữ liệu và cấu hình cho biểu đồ
const options = {
  responsive: true,
  maintainAspectRatio: false,  // Cho phép tự do điều chỉnh kích thước
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Dự Báo Doanh Số',
      font : {
        size: 20,
        weight: 'bold'
      }
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          const datasetLabel = tooltipItem.dataset.label || '';
          let value = tooltipItem.raw; 
          if (datasetLabel === 'Doanh Số (Tỷ Đồng)'){
            return 'Doanh Số: ' + value + ' tỷ';

          }
          else if(datasetLabel === 'Khách Hàng (Số Lượng Khách Hàng)'){
            return 'Khách Hàng: ' + value + ' khách hàng';
          }
        }
      }
    },
  },
};
let convertToBillions = (number) => {
  return (number / 1_000_000_000).toFixed(1);
}



const ChartDuBaoDoanhSo = () => {
  const [dataRevenue, setDataRevenue] = useState([]);
  const [dataPlaceName, setDataPlaceName] = useState([]);
  const [dataDbKh, setDataDbKh] = useState([]);
  const dispatch = useDispatch();
  const { data }= useSelector((state) => state.nhapDuBaoKhachHangVaDoanhSo_QLGM);

  useEffect(() => {
    if(!data){
      dispatch(getDuBaoKhachHangVaDoanhSoRequest());
    }
  },[]);
  useEffect(() => {
    if(data){
      const getDataRevenue = data?.data.map((item) => convertToBillions(item.DbDs));
      const getPlaceName = data?.data.map((item) => item.Tgdd);
      const getDataDbKh = data?.data.map((item) => item.DbKh);
      setDataRevenue(getDataRevenue);
      setDataPlaceName(getPlaceName);
      setDataDbKh(getDataDbKh);
    }
  },[data]);

  
const dataChart = {
  labels : dataPlaceName,
  datasets: [
    {
      label: "Doanh Số (Tỷ Đồng)",
      data: dataRevenue,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 0, 0, 0.3)",
      fill: {
        target: "origin", 
        above: "rgba(255, 0, 0, 0.3)"
      },
      hidden: false
    },
    {
      label: "Khách Hàng (Số Lượng Khách Hàng)",
      data: dataDbKh,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.3)",
      fill: "origin" ,
      hidden: true
    },
  ]
};

  return (
    <div className="w-full h-[500px] border rounded-[3px] shadow-md px-2 py-2">
      <Bar options={options} data={dataChart} className="w-full h-full"/>
    </div>
  )
};

export default ChartDuBaoDoanhSo;
