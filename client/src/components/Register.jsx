import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; 
import axios from 'axios';
import bloodDonorImg from '../assets/blood.png';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'receiver',
    bloodGroup: '',
    location: ''
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (photo) data.append('photo', photo);
    try {
      await axios.post('https://bloodlink-ai.onrender.com/api/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-wrapper">
  <div className="register-left">
    <h2>Create Your Account</h2>
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      <label>Upload Photo:</label>
<input type="file" accept="image/*" onChange={handlePhotoChange} />

      <label>Role:</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="donor">Donor</option>
        <option value="receiver">Receiver</option>
        <option value="admin">Admin</option>

      </select>

      <label>Blood Group:</label>
{formData.role === 'donor' ? (
  <select
    name="bloodGroup"
    value={formData.bloodGroup}
    onChange={handleChange}
    required
    className="input-field"
  >
    <option value="">Select Blood Group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
  </select>
) : (
  <input
    name="bloodGroup"
    value={formData.bloodGroup}
    onChange={handleChange}
    required
    placeholder="Enter blood group"
    className="input-field"
  />
)}


      <label>Location:</label>
      <input name="location" value={formData.location} onChange={handleChange} required />

      <button type="submit">Register</button>
    </form>
  </div>
  <div className="register-right">
  <img src={bloodDonorImg} alt="Blood donation" />
  </div>
</div>


  );
}

export default Register;
