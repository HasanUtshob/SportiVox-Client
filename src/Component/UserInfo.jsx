import React from "react";
import useUserData from "../hooks/useUserData";
import Loading from "./Loading";

const UserInfo = () => {
  const { 
    userData, 
    userDataLoading, 
    getDisplayName, 
    getAvatar, 
    isAdmin, 
    isMember, 
    isUser,
    refreshUserData,
    error 
  } = useUserData();

  if (userDataLoading) {
    return <Loading message="ব্যবহারকারীর তথ্য লোড হচ্ছে..." />;
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <p>{error}</p>
        <button 
          onClick={refreshUserData}
          className="btn btn-sm btn-outline"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="alert alert-warning">
        <p>ব্যবহারকারীর তথ্য পাওয়া যায়নি।</p>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={getAvatar()} alt="User Avatar" />
            </div>
          </div>
          <div>
            <h2 className="card-title">{getDisplayName()}</h2>
            <p className="text-sm opacity-70">{userData.email}</p>
            <div className="badge badge-primary">
              {isAdmin() ? 'অ্যাডমিন' : isMember() ? 'সদস্য' : 'ব্যবহারকারী'}
            </div>
          </div>
        </div>
        
        <div className="card-actions justify-end">
          <button 
            onClick={refreshUserData}
            className="btn btn-sm btn-outline"
          >
            তথ্য রিফ্রেশ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
