import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);
  if (!user) return <div>Loading...</div>;
  return (
    <div className="profile-container">
      <h2>{user.name}'s Profile</h2>
      {user.photo && (
        <img
          className="profile-photo"
          src={`http://localhost:8080/uploads/${user.photo}`}
          alt="Profile"
        />
      )}
      <div className="profile-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p><strong>Location:</strong> {user.location}</p>
      </div>
    </div>
  );
}

export default Profile;
