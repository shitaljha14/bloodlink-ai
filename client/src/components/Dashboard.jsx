import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      console.error("Failed to parse user:", e);
    }

    if (!user) {
      navigate('/login');
    } else {
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
          navigate('/login');
      }
    }
  }, [navigate]);

  return <div>Redirecting to your dashboard...</div>;
}

export default Dashboard;
