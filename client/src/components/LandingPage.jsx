// src/components/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landingPage.css'; 

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to BloodLink-AI ❤️</h1>
        <p>A Smart Blood Donation Platform for Donors, Receivers, and Admins</p>
      </header>

      <div className="landing-buttons">
        <button className="btn btn-login" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="btn btn-register" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>

      <footer className="landing-footer">
        <p>Save lives with a click — Donate Blood. Request Help. Manage Efficiently.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
