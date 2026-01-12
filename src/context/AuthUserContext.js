"use client";
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const AuthUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOutUser: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
});

export function AuthUserProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  }, []);

  // Sign out
  const signOutUser = useCallback(async () => {
    return await signOut(auth);
  }, []);

  // Sign up with email and password
  const signUpWithEmail = useCallback(async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setAuthUser(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  }, []);

  // Sign in with email and password
  const signInWithEmail = useCallback(async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAuthUser(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      authUser,
      loading,
      signInWithGoogle,
      signOutUser,
      signInWithEmail,
      signUpWithEmail,
    }),
    [authUser, loading, signInWithGoogle, signOutUser, signInWithEmail, signUpWithEmail]
  );

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthUserProvider");
  }
  return context;
};
