"use client";

import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import styles from "./Contact.module.css";

// Form field component
const FormField = memo(function FormField({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  rows,
  required = false,
}) {
  const inputClasses =
    "p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-teal-500 focus:outline-none placeholder-white/70";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-white font-medium">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${inputClasses} resize-none`}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClasses}
          required={required}
        />
      )}
    </div>
  );
});

const SendMessage = memo(function SendMessage() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("message", data.message);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          toast.success("Thank you! Your message has been sent.");
          setData({ name: "", email: "", message: "" });
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("Server error. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [data]
  );

  return (
    <div className="w-full max-w-lg lg:h-[73vh] lg:w-[25vw]">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 w-full p-6 md:p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden"
      >
        <FormField
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={data.name}
          onChange={handleChange}
          required
        />

        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <FormField
          label="Message"
          name="message"
          placeholder="Enter your message"
          value={data.message}
          onChange={handleChange}
          rows={5}
          required
        />

        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 ${styles.btn} hover:opacity-90 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </motion.form>
    </div>
  );
});

export default SendMessage;
