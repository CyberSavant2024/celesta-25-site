"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { useAuth } from "@/context/AuthUserContext";
import { FormInput, PasswordInput, LoadingPage } from "@/components/ui";
import styles from "../register/Register.module.css";

export default function LogIn() {
  const { authUser, loading, signInWithEmail } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    async function checkAuth() {
      if (!authUser) return;

      try {
        const token = await authUser.getIdToken(true);
        const response = await axios.post(
          "/api/login",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          const route = response.data.role === "admin" ? "/admin" : "/profile";
          router.replace(route);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    }

    checkAuth();
  }, [authUser, router]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const { email, password } = formData;

      if (!email || !password) {
        toast.error("All fields are required!");
        setIsSubmitting(false);
        return;
      }

      try {
        const userCredential = await signInWithEmail(email, password);
        const token = await userCredential.user.getIdToken();

        const response = await axios.post(
          "/api/login",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          toast.success("Login successful!");
          router.push("/profile");
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, signInWithEmail, router]
  );

  if (loading) {
    return <LoadingPage message="Checking authentication..." />;
  }

  return (
    <div
      className={`bg-muted flex min-h-svh gap-8 items-center justify-center p-6 md:p-10 ${styles.background} text-white overflow-x-hidden`}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-full px-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full p-2"
        >
          <h1 className="font-bold text-7xl text-grad p-2 race text-center">
            LOGIN
          </h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className={`h-full w-full max-w-md sm:w-[90%] lg:w-[25vw] flex flex-col items-center gap-8 justify-center px-4 py-6 ${styles.glassCard}`}
        >
          <div className="flex flex-col gap-8 w-full">
            <FormInput
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
              required
            />
          </div>

          <button
            className={`${styles.btn} ${isSubmitting ? "opacity-50" : ""} w-full`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
