import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler 
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Quy Hoạch Cán Bộ',
      font: {
        size: 24,
        family: 'Gilroy'
      }
    },
    legend: {
      labels: {
        font: {
          family: 'Gilroy'
        }
      }
    },
    tooltip: {
      titleFont: {
        family: 'Gilroy'
      },
      bodyFont: {
        family: 'Gilroy'
      },
      footerFont: {
        family: 'Gilroy'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: 'Gilroy'
        }
      }
    },
    y: {
      ticks: {
        font: {
          family: 'Gilroy'
        }
      }
    }
  },
  tension: 0.3 
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 200, 150, 300, 250, 400, 350],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 0, 0, 0.3)",
      fill: {
        target: "origin", 
        above: "rgba(255, 0, 0, 0.3)"
      }
    },
    {
      label: "Dataset 2",
      data: [50, 100, 200, 150, 300, 250, 400],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.3)",
      fill: "origin" 
    }
  ]
};

const ListQuyHoachCanBo = () => {
  return (
    <div className="w-full h-full border rounded-[3px] shadow-md px-2 py-2">
      <Line options={options} data={data} className="w-full h-full"/>
    </div>
  )
};

export default ListQuyHoachCanBo;
