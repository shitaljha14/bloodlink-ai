import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/DonorList.css";

function DonorList() {
  const [donors, setDonors] = useState([]);
  const [filter, setFilter] = useState({
    bloodGroup: '',
    location: ''
  });

  useEffect(() => {
    const fetchDonors = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://bloodlink-ai.onrender.com/api/donors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonors(res.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        alert('Error fetching donors');
      }
    };
    fetchDonors();
  }, []);

  const filteredDonors = donors.filter(donor => {
    const matchBlood = filter.bloodGroup ? donor.bloodGroup === filter.bloodGroup : true;
    const matchLocation = filter.location ? donor.location.toLowerCase().includes(filter.location.toLowerCase()) : true;
    return matchBlood && matchLocation;
  });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="donor-list">
      <h2>Available Donors</h2>
      <div className="filter-box">
        <input
          name="bloodGroup"
          placeholder="Blood Group (e.g., A+)"
          value={filter.bloodGroup}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={filter.location}
          onChange={handleChange}
        />
      </div>

      {filteredDonors.length > 0 ? (
        filteredDonors.map(donor => (
          <div key={donor._id} className="donor-card">
            <p><strong>Name:</strong> {donor.name}</p>
            <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
            <p><strong>Location:</strong> {donor.location}</p>
          </div>
        ))
      ) : (
        <p>No donors found.</p>
      )}
    </div>
  );
}

export default DonorList;
