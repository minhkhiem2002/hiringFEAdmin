import React, { useEffect } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getBookingByOwnerRequest, getCustomersRequest, getRevenueByYearRequest, getRevenueCurrentMonthRequest, getRevenueTodayRequest, getSportFieldsRequest, getTotalRevenueRequest } from "../../redux/actions/Owner/dashboardActions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const HomePage = () => {
  // Bar Chart Data
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "2021",
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "2022",
        data: [15, 25, 35, 45, 55, 65, 75],
        backgroundColor: "rgba(147, 51, 234, 0.6)",
        borderColor: "rgba(147, 51, 234, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: ["2022"],
    datasets: [
      {
        label: "Growth",
        data: [78, 22],
        backgroundColor: ["#10B981", "#E5E7EB"],
        hoverBackgroundColor: ["#10B981", "#F3F4F6"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: { display: false },
    },
    cutout: "70%", // Tạo hiệu ứng vòng nhỏ hơn
  };

  // Line Chart Data
  const lineData = {
    labels: ["2021", "2022"],
    datasets: [
      {
        label: "Company Growth",
        data: [62, 78],
        borderColor: "rgba(245, 158, 11, 1)",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#F59E0B",
        pointBorderColor: "#fff",
        pointHoverRadius: 5,
      },
    ],
  };

  const dispatch = useDispatch()

  const { customers, sportFields, totalRevenue, bookings, revenueByYear, revenueCurrentMonth, revenueToday } = useSelector((state) => state.dashboardOwner);

  useEffect(() => {
    dispatch(getCustomersRequest())
    dispatch(getSportFieldsRequest())
    dispatch(getTotalRevenueRequest())
    dispatch(getRevenueByYearRequest())
    dispatch(getBookingByOwnerRequest())
    dispatch(getRevenueCurrentMonthRequest())
    dispatch(getRevenueTodayRequest())
},[])

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Congratulations John! 🎉
          </h1>
          <p className="text-gray-600">
            You have done <span className="text-indigo-600 font-bold">72%</span>{" "}
            more sales today. Check your new badge in your profile.
          </p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
            View Badges
          </button>
        </div>
        <img
          src="https://via.placeholder.com/80"
          alt="User"
          className="rounded-full shadow-md"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-800 font-semibold mb-4">Total Revenue</h2>
            <Bar data={barData} />
          </div>

          {/* Profile Report */}
          
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Doughnut Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center flex-col">
            <h2 className="text-gray-800 font-semibold mb-4">Growth</h2>
            <div className="w-32">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Profit", value: "$12,628", growth: "+72.89%" },
              { label: "Sales", value: "$4,679", growth: "+48.45%" },
              { label: "Payments", value: "$2,456", growth: "-14.88%" },
              { label: "Transactions", value: "14,857", growth: "+28.45%" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <h2 className="text-sm text-gray-600">{item.label}</h2>
                <p className="text-2xl font-semibold text-gray-800">
                  {item.value}
                </p>
                <p
                  className={`text-sm ${
                    item.growth.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.growth}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
