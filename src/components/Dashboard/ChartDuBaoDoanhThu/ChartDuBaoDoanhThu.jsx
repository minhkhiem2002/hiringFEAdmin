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
import { getDuBaoThuBoPhanRequest } from "../../../redux/actions/QLGM/DuBaoThuCuaBoPhanActions/DuBaoThuBoPhanActions";
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
      text: 'Dự Báo Doanh Thu',
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
          if (datasetLabel === 'Doanh Thu (Tỷ Đồng)'){
            return 'Doanh Thu: ' + value + ' tỷ';
          }
        }
      }
    },
  },
};
let convertToBillions = (number) => {
  return (number / 1_000_000_000).toFixed(1);
}



const ChartDuBaoDoanhThu = () => {
  const [dataRevenue, setDataRevenue] = useState([]);
  const [dataPlnghd, setDataPlnghd] = useState([]);
  const dispatch = useDispatch();
  const { data }= useSelector((state) => state.nhapDuBaoThuBoPhan_QLGM);
 
  useEffect(() => {
    if(!data){
      dispatch(getDuBaoThuBoPhanRequest());
    }
  },[]);
  useEffect(() => {
    if(data){
      const getDataRevenue = data?.data.map((item) => convertToBillions(item.DsPlnghdthu));
      const getDataPlnghd = data?.data.map((item) => item.Plnghd)
      setDataRevenue(getDataRevenue);
      setDataPlnghd(getDataPlnghd);
    }
  },[data]);

  
const dataChart = {
  labels : dataPlnghd,
  datasets: [
    {
      label: "Doanh Thu (Tỷ Đồng)",
      data: dataRevenue,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 0, 0, 0.3)",
      fill: {
        target: "origin", 
        above: "rgba(255, 0, 0, 0.3)"
      },
    },
  ]
};

  return (
    <div className="w-full h-[505px] border rounded-[3px] shadow-md px-2 py-2">
      <Bar options={options} data={dataChart} className="w-full h-full"/>
    </div>
  )
};

export default ChartDuBaoDoanhThu;
