import { useCallback } from "react";
import useAuth from "./useAuth";

const useUserData = () => {
  const { 
    userData, 
    userDataLoading, 
    refreshUserData, 
    updateUserData, 
    error,
    clearError 
  } = useAuth();

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    return userData?.role === role;
  }, [userData?.role]);

  // Check if user is admin
  const isAdmin = useCallback(() => {
    return hasRole('admin');
  }, [hasRole]);

  // Check if user is member
  const isMember = useCallback(() => {
    return hasRole('member');
  }, [hasRole]);

  // Check if user is regular user
  const isUser = useCallback(() => {
    return hasRole('user') || !userData?.role;
  }, [hasRole, userData?.role]);

  // Get user display name
  const getDisplayName = useCallback(() => {
    return userData?.name || userData?.email || 'ব্যবহারকারী';
  }, [userData?.name, userData?.email]);

  // Get user avatar
  const getAvatar = useCallback(() => {
    return userData?.photo || '/user.png';
  }, [userData?.photo]);

  // Check if user data is available
  const isUserDataAvailable = useCallback(() => {
    return !userDataLoading && userData !== null;
  }, [userDataLoading, userData]);

  return {
    userData,
    userDataLoading,
    refreshUserData,
    updateUserData,
    error,
    clearError,
    hasRole,
    isAdmin,
    isMember,
    isUser,
    getDisplayName,
    getAvatar,
    isUserDataAvailable,
  };
};

export default useUserData;
