import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAllowed, redirect }) => {
  console.log({ isAllowed });
  return isAllowed ? <Outlet /> : <Navigate replace to={redirect} />;
};

export default ProtectedRoutes;
