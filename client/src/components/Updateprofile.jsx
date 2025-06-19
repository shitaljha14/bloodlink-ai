import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Updatesprofile.css'; // ✅ Import the CSS

function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    location: '',
  });
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:8080/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: res.data.name,
          bloodGroup: res.data.bloodGroup,
          location: res.data.location,
        });
      } catch (err) {
        console.error('Error fetching user', err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append("name", formData.name);
    data.append("bloodGroup", formData.bloodGroup);
    data.append("location", formData.location);
    if (photo) {
      data.append("photo", photo);
    }
    try {
      await axios.put('http://localhost:8080/api/users/update', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Update failed', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="update-page">
      <div className="update-form-box">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>
          <label>
            Blood Group:
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              placeholder="e.g. A+, B-"
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
            />
          </label>
          <label>
          Profile Photo:
          <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />
        </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
