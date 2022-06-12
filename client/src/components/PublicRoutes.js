import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useGlobalContext } from "../context/appContext";

const PublicRoutes = () => {
  const { user } = useGlobalContext();

  return user ? <Navigate replace to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
