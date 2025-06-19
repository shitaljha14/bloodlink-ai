import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import RequestCard from "./donor/RequestCard";
import AcceptedCard from "./donor/AcceptedCard";
import DonationCard from "./donor/DonationCard";
import "../styles/donorDashboard.css";

function DonorDashboard() {
  const [matchingRequests, setMatchingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const [loadingMatch, setLoadingMatch] = useState(true);
  const [loadingAccepted, setLoadingAccepted] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("requests");

  const token = localStorage.getItem("token");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleAvailability = async () => {
    try {
      const response = await axios.put(
        "https://bloodlink-ai-x4qs.vercel.app/api/donors/toggle-availability",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsAvailable((prev) => !prev);
      alert(response.data.message);
    } catch (err) {
      console.error("Error toggling availability:", err.message);
      alert("Failed to toggle availability.");
    }
  };

  const fetchMatchingRequests = async () => {
    try {
      const res = await axios.get(
        "https://bloodlink-ai.onrender.com/api/donors/matching-requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMatchingRequests(res.data);
    } catch (error) {
      console.error("Error fetching matching requests:", error);
    } finally {
      setLoadingMatch(false);
    }
  };

  const fetchAcceptedRequests = async () => {
    try {
      const res = await axios.get(
        "https://bloodlink-ai.onrender.com/api/donors/accepted-requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAcceptedRequests(res.data);
    } catch (error) {
      console.error("Error fetching accepted requests:", error);
    } finally {
      setLoadingAccepted(false);
    }
  };

  const fetchDonationHistory = async () => {
    try {
      const res = await axios.get("https://bloodlink-ai.onrender.com/donors/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonationHistory(res.data);
    } catch (error) {
      console.error("Error fetching donation history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const res = await axios.post(
        `https://bloodlink-ai.onrender.com/api/donors/accept-request/${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        }
      );
      alert(res.data.message);
      fetchMatchingRequests();
      fetchAcceptedRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept the request");
    }
  };
  

  useEffect(() => {
    fetchMatchingRequests();
    fetchAcceptedRequests();
    fetchDonationHistory();
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "requests":
        return loadingMatch ? (
          <p>Loading matching requests...</p>
        ) : matchingRequests.length === 0 ? (
          <p>No matching requests found in your area.</p>
        ) : (
          <ul className="request-list">
            {matchingRequests.map((req) => (
              <RequestCard key={req._id} req={req} onAccept={handleAccept} />

            ))}
          </ul>
        );
      case "accepted":
        return loadingAccepted ? (
          <p>Loading accepted requests...</p>
        ) : acceptedRequests.length === 0 ? (
          <p>You haven’t accepted any requests yet.</p>
        ) : (
          <ul className="request-list">
            {acceptedRequests.map((req) => (
              <AcceptedCard key={req._id} req={req} />
            ))}
          </ul>
        );
      case "history":
        return loadingHistory ? (
          <p>Loading donation history...</p>
        ) : donationHistory.length === 0 ? (
          <p>No previous donations recorded yet.</p>
        ) : (
          <ul className="request-list">
            {donationHistory.map((req) => (
              <DonationCard key={req._id} req={req} />
            ))}
          </ul>
        );
      default:
        return <p>Select a tab</p>;
    }
  };

  return (
    <div className="donor-dashboard-wrapper">
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="donor-sidebar"
      >
        <h3>🩸 Donor Panel</h3>
        <ul>
          <li onClick={() => setActiveTab("requests")}>📥 Matching Requests</li>
          <li onClick={() => setActiveTab("accepted")}>✅ Accepted</li>
          <li onClick={() => setActiveTab("history")}>📜 History</li>
        </ul>
        <div className="toggles">
          <button onClick={toggleDarkMode} className="dark-toggle">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button onClick={toggleAvailability} className="availability-toggle">
            {isAvailable ? "Set as Unavailable" : "Set as Available"}
          </button>
        </div>
      </motion.aside>

      <motion.main
        className={`donor-main ${darkMode ? "dark" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {renderTab()}
      </motion.main>
    </div>
  );
}

export default DonorDashboard;
