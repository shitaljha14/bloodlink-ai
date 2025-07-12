import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2 className="logo">🩸 BloodLink</h2>

      <div className="nav-links">
        {user && (
          <>
            <Link to="/update-profile" className="nav-link">Update Profile</Link>

            {user.role === 'admin' && (
              <Link to="/admin-dashboard" className="nav-link">Dashboard</Link>
            )}

            {user.role === 'donor' && (
              <>
                <Link to="/donor-dashboard" className="nav-link">Dashboard</Link>
                <Link to="/donation-history" className="nav-link">Donation History</Link>
              </>
            )}

            {user.role === 'receiver' && (
              <Link to="/receiver-dashboard" className="nav-link">Dashboard</Link>
            )}

            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
