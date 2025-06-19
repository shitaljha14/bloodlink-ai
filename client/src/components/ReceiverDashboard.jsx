import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/receiverDashboard.css";

function ReceiverDashboard() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchReceiverProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get("https://bloodlink-ai.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch receiver data:', err);
      }
    };

    fetchReceiverProfile();
  }, []);

  useEffect(() => {
    const fetchMyRequests = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get("https://bloodlink-ai.onrender.com/api/blood-requests/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch blood requests:", err);
      }
    };

    fetchMyRequests();
  }, []);

  if (!user) return <div>Loading receiver dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="receiver-info">
        <h2>Hello, {user.name} 👤</h2>
        <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p><strong>Location:</strong> {user.location}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div className="button-group">
        <button className="submit-btn" onClick={() => window.location.href = '/request-blood'}>
          📝 Make a Blood Request
        </button>
        <button className="submit-btn secondary" onClick={() => window.location.href = '/update-profile'}>
          ⚙️ Update Profile
        </button>
      </div>

      <div className="request-history">
        <h3>🩸 My Blood Requests</h3>
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req._id} className="request-card">
              <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Units:</strong> {req.units}</p>
              <p><strong>Urgency:</strong> {req.urgency}</p>
              <p><strong>Submitted On:</strong> {new Date(req.createdAt).toLocaleString()}</p>
              <p>
                <strong>Status:</strong>{" "}
                {req.acceptedBy ? (
                  <span className="status-accepted">✅ Accepted by {req.acceptedBy.name}</span>
                ) : (
                  <span className="status-pending">⏳ Pending</span>
                )}
              </p>
            </div>
          ))
        ) : (
          <p>No blood requests submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default ReceiverDashboard;
