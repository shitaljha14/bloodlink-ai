import React, { useEffect, useState } from 'react';
import axios from 'axios';


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
        const res = await axios.get('https://bloodlink-ai-x4qs.vercel.app/api/donors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Donor response:", res.data); 
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
    <>
      
      <div style={{ padding: '20px' }}>
        <h2>Available Donors</h2>

        {/* Filter */}
        <div style={{ marginBottom: '20px' }}>
          <input
            name="bloodGroup"
            placeholder="Blood Group (e.g., A+)"
            value={filter.bloodGroup}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          <input
            name="location"
            placeholder="Location"
            value={filter.location}
            onChange={handleChange}
          />
        </div>

        {/* Donor List */}
        {filteredDonors.length > 0 ? (
          filteredDonors.map(donor => (
            <div key={donor._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p><strong>Name:</strong> {donor.name}</p>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>Location:</strong> {donor.location}</p>
            </div>
          ))
        ) : (
          <p>No donors found.</p>
        )}
      </div>
    </>
  );
}

export default DonorList;
