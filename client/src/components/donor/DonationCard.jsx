import React from "react";
import { motion } from "framer-motion";

const DonationCard = ({ req }) => {
  const { user, location, bloodGroup, units, status, createdAt } = req;

  return (
    <motion.li
      className="request-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p><strong>Recipient:</strong> {user?.name || "Unknown"}</p>
      <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
      <p><strong>📍 Location:</strong> {location}</p>
      <p><strong>🩸 Blood Group:</strong> {bloodGroup}</p>
      <p><strong>Units:</strong> {units}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Date:</strong> {new Date(createdAt).toLocaleDateString()}</p>
    </motion.li>
  );
};

export default DonationCard;
