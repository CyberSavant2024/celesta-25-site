"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { useAuth } from "@/context/AuthUserContext";
import { useCountdown } from "@/hooks";
import { FormInput, PasswordInput, LoadingPage, AlertBanner } from "@/components/ui";
import { OTP_CONFIG } from "@/lib/constants";
import styles from "./Register.module.css";

// Generate random OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export default function Register() {
  const { authUser, loading, signUpWithEmail } = useAuth();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: { day: "", month: "", year: "" },
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP state
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Use countdown hook for resend timer
  const { timeLeft: resendTimer, isComplete: canResend, restart: restartTimer } = useCountdown(
    otpSent ? OTP_CONFIG.RESEND_TIMEOUT : 0
  );

  // Check if user is already logged in
  useEffect(() => {
    async function checkAuth() {
      if (!authUser) return;

      try {
        const token = await authUser.getIdToken(true);
        const response = await axios.post(
          "/api/register",
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

  // Form handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDobChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      dob: { ...prev.dob, [field]: value },
    }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  // Send OTP handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const { name, email, password, confirmPassword } = formData;

      if (!name || !email || !password || !confirmPassword) {
        toast.error("All fields are required!");
        setIsSubmitting(false);
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        setIsSubmitting(false);
        return;
      }

      try {
        const newOtp = generateOtp();
        setGeneratedOtp(newOtp);

        await axios.post("/api/send-otp", { email, otp: newOtp });

        toast.success("OTP sent to email");
        setOtpSent(true);
        restartTimer(OTP_CONFIG.RESEND_TIMEOUT);
      } catch (error) {
        console.error("OTP send error:", error);
        toast.error("Failed to send OTP");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, restartTimer]
  );

  // Verify OTP and register
  const verifyOtpAndRegister = useCallback(async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    if (otp !== generatedOtp) {
      toast.error("Invalid OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      const userCredential = await signUpWithEmail(formData.email, formData.password);
      const token = await userCredential.user.getIdToken();
      const dobString = `${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`;

      const response = await axios.post(
        "/api/register",
        { name: formData.name, dob: dobString },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        await userCredential.user.delete();
        toast.error("Registration failed");
        return;
      }

      toast.success("Registered successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  }, [otp, generatedOtp, formData, signUpWithEmail, router]);

  // Resend OTP handler
  const resendOtp = useCallback(async () => {
    try {
      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);

      await axios.post("/api/send-otp", { email: formData.email, otp: newOtp });

      toast.success("OTP resent");
      restartTimer(OTP_CONFIG.RESEND_TIMEOUT);
    } catch (error) {
      console.error("OTP resend error:", error);
      toast.error("Failed to resend OTP");
    }
  }, [formData.email, restartTimer]);

  if (loading) {
    return <LoadingPage message="Checking authentication..." />;
  }

  return (
    <div
      className={`p-4 md:p-10 bg-muted ${styles.background} text-white min-h-svh flex flex-col items-center justify-center overflow-x-hidden`}
    >
      <motion.div
        initial={{ opacity: 0, x: -140 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-full"
      >
        <h1 className="font-bold text-5xl md:text-6xl text-grad race mt-16 p-2 text-center md:text-left">
          Register
        </h1>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-full md:max-w-4xl flex flex-col gap-8 p-4 md:p-10 ${styles.glassCard}`}
      >
        {/* Warning banners */}
        {!otpSent && (
          <AlertBanner type="warning">
            ⚠️ <b>IIT Patna students</b> register using their official{" "}
            <b>@iitp.ac.in</b> email address.
          </AlertBanner>
        )}

        {otpSent && (
          <AlertBanner type="info">
            📩 If you haven&apos;t received the OTP, please check your{" "}
            <b>Spam / Junk</b> folder.
          </AlertBanner>
        )}

        {/* Registration form fields */}
        {!otpSent && (
          <>
            <div className="flex gap-10 justify-between flex-wrap">
              {/* Left column */}
              <div className="flex flex-col gap-6 flex-1 min-w-[250px]">
                <FormInput
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

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

              {/* Right column */}
              <div className="flex flex-col gap-6 flex-1 min-w-[250px]">
                {/* Date of Birth */}
                <div className="flex flex-col gap-2 text-xl">
                  <label>Date of Birth</label>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { field: "day", placeholder: "DD", maxLength: 2 },
                      { field: "month", placeholder: "MM", maxLength: 2 },
                      { field: "year", placeholder: "YYYY", maxLength: 4 },
                    ].map(({ field, placeholder, maxLength }) => (
                      <input
                        key={field}
                        type="text"
                        maxLength={maxLength}
                        placeholder={placeholder}
                        value={formData.dob[field]}
                        onChange={(e) => handleDobChange(field, e.target.value)}
                        className="w-20 p-2 border-2 rounded-lg text-white bg-transparent outline-none focus:border-teal-600"
                        required
                      />
                    ))}
                  </div>
                </div>

                <PasswordInput
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  showPassword={showConfirmPassword}
                  onToggleVisibility={toggleConfirmPasswordVisibility}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mx-auto ${styles.btn} ${isSubmitting ? "opacity-50" : ""}`}
            >
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* OTP verification */}
        {otpSent && (
          <div className="flex flex-col gap-4 mt-6 items-center">
            <FormInput
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full max-w-xs"
            />

            <button
              type="button"
              onClick={verifyOtpAndRegister}
              disabled={isSubmitting}
              className={`${styles.btn} ${isSubmitting ? "opacity-50" : ""}`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            {!canResend ? (
              <p className="text-sm opacity-70">Resend OTP in {resendTimer}s</p>
            ) : (
              <button
                type="button"
                onClick={resendOtp}
                className="underline text-sm hover:text-teal-400 transition-colors"
              >
                Resend OTP
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
