import React, { useEffect, useState } from "react";
import axios from "axios";

function DonorHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonationHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:8080/api/donors/history", {
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 Donation History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No donations made yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((req) => (
            <li
              key={req._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <p><strong>Requested By:</strong> {req.user?.name}</p>
              <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Urgency:</strong> {req.urgency}</p>
              <p><strong>Units:</strong> {req.units}</p>
              <p><strong>Accepted On:</strong> {new Date(req.updatedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DonorHistory;
