"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import styles from "./EventModal.module.css";
import { FormInput } from "@/components/ui";

const EventModal = memo(function EventModal({ event, onClose }) {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = useCallback(() => setShowForm(true), []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div
        className={`text-white max-w-2xl w-full p-6 relative ${styles.glassCard}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl hover:text-red-400 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {!showForm ? (
          <>
            <div className="relative w-full max-h-[45vh] mb-4">
              <Image
                src={event.img_src}
                alt={event.name}
                width={800}
                height={450}
                className="rounded-lg w-full max-h-[45vh] object-contain bg-black/20"
              />
            </div>

            <h2 className="text-3xl font-bold mb-2">{event.name}</h2>

            <p className="text-neutral-300 mb-4">{event.description}</p>

            <p className="mb-4">
              <strong>Registration Fee:</strong> ₹{event.fee}
            </p>

            <div className="flex gap-4">
              <a
                href={event.rulebook}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 px-4 py-2 rounded hover:bg-white/10 transition-colors"
              >
                Rulebook
              </a>

              <button onClick={handleShowForm} className={styles.btn}>
                Register
              </button>
            </div>
          </>
        ) : (
          <RegisterForm event={event} />
        )}
      </div>
    </div>
  );
});

EventModal.displayName = "EventModal";

const RegisterForm = memo(function RegisterForm({ event }) {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    collegeId: "",
    aadhar: "",
    teamName: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // Handle form submission
      console.log("Form submitted:", formData);
    },
    [formData]
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Register for {event.name}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormInput
          name="college"
          placeholder="College / Organisation"
          value={formData.college}
          onChange={handleChange}
          required
        />
        <FormInput
          name="collegeId"
          placeholder="College ID (if any)"
          value={formData.collegeId}
          onChange={handleChange}
        />
        <FormInput
          name="aadhar"
          placeholder="Aadhar Card Number"
          value={formData.aadhar}
          onChange={handleChange}
          required
        />
        <FormInput
          name="teamName"
          placeholder="Team Name"
          value={formData.teamName}
          onChange={handleChange}
        />

        <button type="submit" className={`${styles.btn} mt-4`}>
          Submit
        </button>
      </form>
    </>
  );
});

RegisterForm.displayName = "RegisterForm";

export default EventModal;
