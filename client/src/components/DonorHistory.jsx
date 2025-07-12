import React, { useEffect, useState } from "react";
import axios from "axios";

function DonorHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
 
  

  useEffect(() => {
    const fetchDonationHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://bloodlink-ai.onrender.com/api/donors/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching donation history:", err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchDonationHistory();
  }, []);
  

  const containerStyle = {
    minHeight: "100vh",
    width: "100vw",
    padding: "30px 20px",
    backgroundColor: "rgba(247, 221, 221, 0.9)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    overflowY: "auto",
  };

  const headingStyle = {
    fontSize: "28px",
    marginBottom: "25px",
    color: "#d32f2f",
    fontWeight: "bold",
    textAlign: "center",
  };

  const cardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    paddingTop: "10px",
  };
  
  const cardStyle = {
    width: "20vw",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(6px)",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
  };

  const cardHoverStyle = {
    transform: "scale(1.02)",
  };

 

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🧾 Donation History</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : history.length === 0 ? (
        <p style={{ textAlign: "center" }}>No donations made yet.</p>
      ) : (
        <div style={cardContainerStyle}>
          {history.map((req) => (
            <div
              key={req._id}
              style={cardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
             <p>
  <span style={{ fontWeight: "bold", color: "#000" }}>Requested By:</span>{" "}
  <span style={{ fontWeight: "normal", color: "#000" }}>{req.user?.name || "Unknown"}</span>
</p>

<p>
  <span style={{ fontWeight: "bold", color: "#000" }}>Blood Group:</span>{" "}
  <span style={{ fontWeight: "normal", color: "#000" }}>{req.bloodGroup || "N/A"}</span>
</p>

<p>
  <span style={{ fontWeight: "bold", color: "#000" }}>Location:</span>{" "}
  <span style={{ fontWeight: "normal", color: "#000" }}>{req.location || "N/A"}</span>
</p>

<p>
  <span style={{ fontWeight: "bold", color: "#000" }}>Urgency:</span>{" "}
  <span style={{ fontWeight: "normal", color: "#000" }}>{req.urgency || "Normal"}</span>
</p>

<p>
  <span style={{ fontWeight: "bold", color: "#000" }}>Units:</span>{" "}
  <span style={{ fontWeight: "normal", color: "#000" }}>{req.units || "N/A"}</span>
</p>

<p>
  <span style={{ fontWeight: "bold", color: "#000" }}>Accepted On:</span>{" "}
  <span style={{ fontWeight: "normal", color: "#000" }}>
    {new Date(req.createdAt).toLocaleString()}
  </span>
</p>



            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DonorHistory;
