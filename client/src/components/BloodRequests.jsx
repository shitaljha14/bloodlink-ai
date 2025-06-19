import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
 // Add this CSS file

const RequestBlood = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://bloodlink-ai-x4qs.vercel.app/api/blood-requests",
        { bloodGroup, location, urgency },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✅ Blood request submitted successfully!");
      setBloodGroup("");
      setLocation("");
      setUrgency("");
    } catch (error) {
      console.error("Error submitting blood request:", error);
      setMessage("❌ Failed to submit blood request.");
    }
  };

  return (
    <motion.div
      className="request-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="request-title">🩸 Request Blood</h2>
      <form className="request-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blood Group (e.g. A+)"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location (e.g. Jamshedpur)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Urgency (e.g. High, Medium, Low)"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="submit-btn"
        >
          🚑 Submit Request
        </motion.button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </motion.div>
  );
};

export default RequestBlood;
