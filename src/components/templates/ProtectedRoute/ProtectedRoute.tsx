import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { getLocalStorage } from "@app/config/storage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@app/constant/auth";
import { logout } from "@app/redux/features/auth/authSlice";
import { RootState } from "@app/redux/store";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  const accessToken = getLocalStorage(ACCESS_TOKEN);
  const refreshToken = getLocalStorage(REFRESH_TOKEN);
  if (!accessToken && !refreshToken) {
    dispatch(logout());
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
