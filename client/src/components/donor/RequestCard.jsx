import React from "react";
import { motion } from "framer-motion";
const RequestCard = ({ req, onAccept }) => {
  const isAccepted = req.status === "accepted" && req.acceptedBy;
  const isPending = req.status === "pending"; // ✅ define this

  return (
    <motion.li
      className={`request-card urgency-${req.urgency.toLowerCase()}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p><strong>Requested By:</strong> {req.user?.name}</p>
      <p><strong>📍 Location:</strong> {req.location}</p>
      <p><strong>🩸 Blood Group:</strong> {req.bloodGroup}</p>
      <p><strong>🧪 Units Needed:</strong> {req.units}</p>
      <p className={`urgency-badge urgency-${req.urgency.toLowerCase()}`}>
        ⚡ {req.urgency} Urgency
      </p>
      <p><strong>Status:</strong> {req.status}</p>

      <div className="action-section">
        {isPending ? (
          <button className="accept-btn" onClick={() => onAccept(req._id)}>
            ✅ Accept to Donate
          </button>
        ) : isAccepted ? (
          <p className="status-info">✔️ Already Accepted</p>
        ) : (
          <p className="status-info">❌ Not Available</p>
        )}
      </div>
    </motion.li>
  );
};


export default RequestCard;
