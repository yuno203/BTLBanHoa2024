import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate, Outlet } from 'react-router-dom';
import { userState } from '../constant/recoil';

const PrivateRoute = () => {
  const user = useRecoilValue(userState);
  return user ? <Outlet /> : <Navigate to="/user" />;
};

export default PrivateRoute;
