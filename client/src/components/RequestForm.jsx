import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RequestForm.css'; 

function RequestForm() {
  const [form, setForm] = useState({
    bloodGroup: '',
    location: '',
    reason: '',
    units: 1,
    urgency: 'normal',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'https://bloodlink-ai-x4qs.vercel.app/api/blood-requests',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Blood request submitted successfully!');
      setForm({ bloodGroup: '', location: '', units: 1, urgency: 'normal' });
    } catch (err) {
      console.error('Request failed:', err);
      alert('Failed to submit request.');
    }
  };

  return (
    <div className="request-form-container">
      <div className="request-form-box">
        <h2>Request Blood</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <input
            name="location"
            placeholder="Enter Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            name="units"
            type="number"
            min="1"
            max="10"
            value={form.units}
            onChange={handleChange}
            required
          />

          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

export default RequestForm;
