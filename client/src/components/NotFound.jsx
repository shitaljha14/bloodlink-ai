import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go back to Dashboard</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  heading: {
    fontSize: '2rem',
    color: '#ff4d4d',
  },
  text: {
    margin: '20px 0',
    fontSize: '1.2rem',
  },
  link: {
    textDecoration: 'none',
    backgroundColor: '#222',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px'
  }
};

export default NotFound;
