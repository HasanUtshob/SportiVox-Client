import React, { useEffect, useState } from "react";
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
import Loading from "../Component/loading";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

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

  // Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/Users?email=${currentUser.email}`
          );
          setUserData(res.data[0] || {});
        } catch (err) {
          console.error("Error fetching userData", err);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      // ✅ Make sure loading is false AFTER both user & userData are checked
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  // SignOut Section
  const SignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg animate-pulse">
        <Loading></Loading>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  const info = {
    CreateUser,
    SignInUser,
    SignOut,
    setLoading,
    loading,
    user,
    userData,
    SignWithGoogle,
  };
  return <AuthContext value={info}>{children}</AuthContext>;
};

export default AuthProvider;
