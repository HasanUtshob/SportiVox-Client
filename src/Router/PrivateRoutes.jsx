import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading, setLoading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) {
    setLoading(false);
    return (
      <Navigate to="/SignIn" state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default PrivateRoutes;
