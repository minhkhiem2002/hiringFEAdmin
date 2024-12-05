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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Route được bảo vệ */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Sidebar><DashBoard /></Sidebar>} />
          <Route path="/managecustomer" element={<Sidebar><CustomerManage /></Sidebar>} />
          <Route path="/manageowner" element={<Sidebar><OwnerManage /></Sidebar>} />
          <Route path="/managefields" element={<Sidebar><Fields /></Sidebar>} />
          <Route path="/managevouchers" element={<Sidebar><CreateVoucher /></Sidebar>} />
          <Route path="/product" element={<Sidebar><ProductEquipment /></Sidebar>} />
          <Route path="/dashboard" element={<Sidebar><HomePage /></Sidebar>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
