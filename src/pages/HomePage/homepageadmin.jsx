import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
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
import {
  getOrdersAdminRequest,
  getSportProductCountAdminRequest,
  getTotalRevenueAdminRequest,
  getRevenueByYearAdminRequest,
  getRevenueCurrentMonthAdminRequest,
  getRevenueTodayAdminRequest,
} from "../../redux/actions/Admin/dashboardActions"; 

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

const AdminHomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Spotta";
  }, []);
  // Admin-specific state
  const { orders, sportProductCount, totalRevenue, revenueByYear, revenueCurrentMonth, revenueToday } = useSelector((state) => state.dashboardAdmin); // Assuming Redux state is structured for Admin
  const { data, isLoading, isSuccess } = useSelector((state) => state.userInfo); // Admin user info state

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const barData = {
    labels: months,
    datasets: [
      {
        label: "2024 Revenue",
        data: revenueByYear?.data?.map(item => item.totalRevenue),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["2024"],
    datasets: [
      {
        label: "Growth",
        data: [78, 22], // Example data for growth
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
    cutout: "70%", // Smaller cutout for the doughnut
  };

  useEffect(() => {
    dispatch(getOrdersAdminRequest());
    dispatch(getSportProductCountAdminRequest());
    dispatch(getTotalRevenueAdminRequest());
    dispatch(getRevenueByYearAdminRequest());
    dispatch(getRevenueCurrentMonthAdminRequest());
    dispatch(getRevenueTodayAdminRequest());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Chào mừng {data?.firstName} {data?.lastName}! 🎉
          </h1>
          <p className="text-gray-600">
            Bạn có <span className="text-indigo-600 font-bold">{orders?.data?.length}</span> đơn hàng mới. Kiểm tra các đơn hàng trong bảng điều khiển.
          </p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
            Xem hồ sơ
          </button>
        </div>
        <img
          src={data?.avatar}
          alt="Admin"
          className="rounded-full shadow-md w-20 h-20"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-gray-800 font-semibold mb-4">Tổng Doanh Thu</h2>
            <Bar data={barData} />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Growth Doughnut Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center flex-col">
            <h2 className="text-gray-800 font-semibold mb-4">Tăng Trưởng</h2>
            <div className="w-32">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {[{ label: "Đơn Hàng", value: orders?.data?.length, growth: "+12.5%" },
              { label: "Sản Phẩm", value: sportProductCount?.data, growth: "+8.4%" },
              { label: "Tổng Doanh Thu", value: totalRevenue?.data, growth: "+5.1%" },
              { label: "Doanh Thu Tháng", value: revenueCurrentMonth?.data, growth: "+2.3%" },
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

export default AdminHomePage;
