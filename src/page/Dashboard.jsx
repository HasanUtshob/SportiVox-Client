import React from "react";
import StateCard from "../Dashboard/Page/Component/StateCard";
import MyBookingStats from "../Dashboard/Page/Component/MyBookingStats";
import useUserData from "../hooks/useUserData";
import Loading from "../Component/Loading";

const Dashboard = () => {
  const { userData, userDataLoading, isAdmin } = useUserData();

  if (userDataLoading) {
    return <Loading message="ড্যাশবোর্ড লোড হচ্ছে..." />;
  }

  if (!userData) {
    return (
      <div className="text-center py-8 text-red-500">
        ব্যবহারকারীর তথ্য পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div>
      {isAdmin() ? (
        <section>
          <StateCard />
        </section>
      ) : (
        <section>
          <MyBookingStats />
        </section>
      )}
    </div>
  );
};

export default Dashboard;
