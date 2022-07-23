import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAllowed, redirect }) => {
  return isAllowed ? <Outlet /> : <Navigate replace to={redirect} />;
};

export default ProtectedRoutes;
