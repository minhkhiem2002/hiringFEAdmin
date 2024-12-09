import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/loginpage';
import Sidebar from './components/Sidebar/Sidebar';
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import CustomerManage from './pages/AdminPage/Customer/Customer';
import OwnerManage from './pages/AdminPage/Owner/Owner';
import Fields from './pages/OwnerPage/Fields/Fields';
import HomePage from './pages/HomePage/homepage';
import CreateVoucher from './pages/OwnerPage/Voucher/createVoucher';
import ProductEquipment from './pages/OwnerPage/ProductEquipment/ProductEquipment';
import DashBoard from './components/Dashboard/dashboard';
import AdminHomePage from './pages/HomePage/homepageadmin';
import BookingList from './pages/OwnerPage/Booking/booking';
import OrderList from './pages/AdminPage/Order/order';
import BanManage from './pages/AdminPage/Ban/Ban';

function App() {
  // Get the role from sessionStorage
  const role = sessionStorage.getItem("role");

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={
            role === "Owner" 
            ? <Sidebar><HomePage /></Sidebar> 
            : role === "Admin" 
            ? <Sidebar><AdminHomePage /></Sidebar> 
            : null
          } />
          <Route path="/managecustomer" element={<Sidebar><CustomerManage /></Sidebar>} />
          <Route path="/bancustomer" element={<Sidebar><BanManage /></Sidebar>} />
          <Route path="/manageowner" element={<Sidebar><OwnerManage /></Sidebar>} />
          <Route path="/managefields" element={<Sidebar><Fields /></Sidebar>} />
          <Route path="/managevouchers" element={<Sidebar><CreateVoucher /></Sidebar>} />
          <Route path="/product" element={<Sidebar><ProductEquipment /></Sidebar>} />
          <Route path="/dashboard" element={<Sidebar><DashBoard /></Sidebar>} />
          <Route path ="/booking" element={<Sidebar><BookingList /></Sidebar>} />
          <Route path ="/order" element={<Sidebar><OrderList /></Sidebar>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
