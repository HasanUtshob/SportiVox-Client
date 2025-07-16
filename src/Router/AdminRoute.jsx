import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, userData, loading } = useAuth();
  const location = useLocation();

  // Still loading
  if (loading || !userData) return <Loading />;

  // Not admin or not logged in
  if (!user || userData.role !== "admin") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
