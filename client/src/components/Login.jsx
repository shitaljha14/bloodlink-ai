import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; 
import loginImg from '../assets/bg.jpg';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://bloodlink-ai-x4qs.vercel.app/api/auth/login',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, user } = res.data;

      if (!user) throw new Error("User object not received");

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      alert('Login successful!');

      switch (user.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'donor':
          navigate('/donor-dashboard');
          break;
        case 'receiver':
          navigate('/receiver-dashboard');
          break;
        default:
          navigate('/');
      }

    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      
      <div className="bg-overlay"></div>
      <img src={loginImg} alt="login-img" />
     

      <div className="login-form-card">
        <h2>Login to BloodLink</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: '12px' }}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
