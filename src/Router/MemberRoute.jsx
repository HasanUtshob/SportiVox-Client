import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading";
import { Navigate, useLocation } from "react-router";

const MemberRoute = ({ children }) => {
  const { user, userData, loading } = useAuth();
  const location = useLocation();

  if (loading || !userData) return <Loading />;

  if (!user || userData.role !== "member") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};


export default MemberRoute;
