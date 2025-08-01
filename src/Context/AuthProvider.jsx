import React, { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase_init";
import axios from "axios";
import Loading from "../Component/Loading";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Server URL configuration
  const SERVER_URL = "https://sportivo-x-server.vercel.app";

  // Create an Account
  const CreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SignIn Account
  const SignInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign With Google
  const provider = new GoogleAuthProvider();
  const SignWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Fetch user data with retry logic
  const fetchUserData = useCallback(
    async (currentUser, retryCount = 0) => {
      if (!currentUser?.email) {
        setUserData(null);
        return;
      }

      setUserDataLoading(true);
      setError(null);

      try {
        const token = await currentUser.getIdToken();
        const res = await axios.get(
          `${SERVER_URL}/Users?email=${currentUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            timeout: 10000, // 10 second timeout
          }
        );

        const fetchedUserData = res.data[0] || null;
        setUserData(fetchedUserData);

        if (!fetchedUserData) {
          console.warn("No user data found for:", currentUser.email);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);

        // Retry logic for network errors
        if (
          retryCount < 2 &&
          (err.code === "NETWORK_ERROR" || err.response?.status >= 500)
        ) {
          console.log(`Retrying user data fetch... Attempt ${retryCount + 1}`);
          setTimeout(() => {
            fetchUserData(currentUser, retryCount + 1);
          }, 1000 * (retryCount + 1)); // Exponential backoff
          return;
        }

        setError(`ব্যবহারকারীর তথ্য লোড করতে সমস্যা হয়েছে: ${err.message}`);
        setUserData(null);
      } finally {
        setUserDataLoading(false);
      }
    },
    [SERVER_URL]
  );

  // Refresh user data manually
  const refreshUserData = useCallback(() => {
    if (user) {
      fetchUserData(user);
    }
  }, [user, fetchUserData]);

  // Update user data locally (for optimistic updates)
  const updateUserData = useCallback((newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  }, []);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (currentUser?.email) {
        // Small delay to ensure token is ready
        setTimeout(() => {
          fetchUserData(currentUser);
        }, 100);
      } else {
        setUserData(null);
        setUserDataLoading(false);
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, [fetchUserData]);

  // SignOut Section
  const SignOut = () => {
    setLoading(true);
    setUserData(null);
    setError(null);
    return signOut(auth);
  };

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg animate-pulse">
        <Loading message="অ্যাপ্লিকেশন লোড হচ্ছে..." />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        <p>{error}</p>
        <button onClick={clearError} className="btn btn-sm btn-outline mt-4">
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  const info = {
    CreateUser,
    SignInUser,
    SignOut,
    setLoading,
    loading,
    userDataLoading,
    user,
    userData,
    SignWithGoogle,
    refreshUserData,
    updateUserData,
    error,
    clearError,
  };

  return <AuthContext value={info}>{children}</AuthContext>;
};

export default AuthProvider;
