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
    <nav style={styles.navbar}>
<h2 className="logo">🩸 BloodLink</h2>

      <div style={styles.links}>
        {user && (
          <>
            <Link to="/" style={styles.link}>Dashboard</Link>

            <Link to="/update-profile" style={styles.link}>Update Profile</Link>

            {user.role === 'admin' && (
              <Link to="/admin-dashboard" style={styles.link}>Admin</Link>

            )}

           {user.role === 'donor' && (
  <>
    <Link to="/donor-dashboard" style={styles.link}>Donor</Link>
    <Link to="/donation-history" style={styles.link}>Donation History</Link>
  </>
)}

            {user.role === 'receiver' && (
              <>
                <Link to="/receiver-dashboard" style={styles.link}>Receiver</Link>
              </>
            )}

            <button onClick={handleLogout} style={styles.logout}>Logout</button>
          </>
        )}
   




        {!user && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    margin: 0
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500'
  },
  logout: {
    background: '#fff',
    color: '#d32f2f',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Navbar;
