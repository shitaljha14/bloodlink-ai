import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewBloodRequests.css';

function ViewBloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('https://bloodlink-ai.onrender.com/api/blood-requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching blood requests:', err);
      alert('Failed to load blood requests');
    } finally {
      setLoading(false);
    }
  };

  const handleFulfill = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://bloodlink-ai.onrender.com/admin/requests/${id}/fulfill`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Marked as fulfilled');
      fetchRequests();
    } catch (err) {
      alert('Error marking request as fulfilled');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://bloodlink-ai.onrender.com/admin/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Deleted successfully');
      fetchRequests();
    } catch (err) {
      alert('Error deleting request');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="view-requests-container">
      <h2>Blood Requests</h2>
      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No blood requests found.</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Location</th>
              <th>Units</th>
              <th>Urgency</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.user?.name || 'N/A'}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.location}</td>
                <td>{req.units}</td>
                <td>{req.urgency}</td>
                <td>{new Date(req.createdAt).toLocaleString()}</td>
                <td>{req.status || 'pending'}</td>
                <td>
                  {req.status !== 'fulfilled' && (
                    <button className="btn btn-fulfill" onClick={() => handleFulfill(req._id)}>Fulfill</button>
                  )}
                  <button className="btn btn-delete" onClick={() => handleDelete(req._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewBloodRequests;
