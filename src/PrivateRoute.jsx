import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { checkUserRequest } from './redux/actions/authActions';

const PrivateRoute = () => {
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');
  const { isUserSuccess, isChecked } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  if (!token || !id) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
