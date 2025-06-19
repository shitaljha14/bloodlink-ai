import React from "react";
import { motion } from "framer-motion";

const AcceptedCard = ({ req }) => {
  return (
    <motion.li
      className={`request-card urgency-${req.urgency?.toLowerCase()}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p><strong>Requested By:</strong> {req.user?.name || "Unknown"}</p>
      <p><strong>📍 Location:</strong> {req.location || "N/A"}</p>
      <p><strong>🩸 Blood Group:</strong> {req.bloodGroup || "N/A"}</p>
      <p><strong>🧪 Units Needed:</strong> {req.units || "N/A"}</p>
      <p className={`urgency-badge urgency-${req.urgency?.toLowerCase()}`}>
        ⚡ {req.urgency || "Normal"} Urgency
      </p>
      <p><strong>Status:</strong> {req.status || "Accepted"}</p>
      <div className="action-section">
        <p className="status-info">✅ You have accepted this request.</p>
      </div>
    </motion.li>
  );
};

export default AcceptedCard;
