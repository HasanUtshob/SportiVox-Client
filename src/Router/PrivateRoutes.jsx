import React from "react";
import { Navigate, useLocation } from "react-router";

import useAuth from "../hooks/useAuth";
import Loading from "../Component/loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) {
    return (
      <Navigate to="/SignIn" state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default PrivateRoutes;
