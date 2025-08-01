import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading";
import { Navigate, useLocation } from "react-router";
import useAxios from "../hooks/useAxios";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxios();

  const [userData, setuserData] = useState(null);

  // 🔁 Data fetch function আগে ডিফাইন করো
  const fetchUserData = async () => {
    const email = user?.email;
    if (email) {
      try {
        const res = await axiosSecure.get(`/Users?email=${email}`);
        setuserData(res.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  // ✅ useEffect ফাংশনের পরে নয়, উপরে রাখো
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading || !userData) return <Loading />;

  if (!user || userData.role !== "member") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default MemberRoute;
