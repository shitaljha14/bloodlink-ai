import { useEffect, useState } from "react";
import axios from "axios";
import DonorList from "./DonorList";
import ViewBloodRequests from "./ViewBloodRequests";
import ManageUsers from "./ManageUsers"; 
import "./../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error.response?.data || error.message);
      }
    };

    fetchStats();
  }, []);

  
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>👥 Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h3>🩸 Donors</h3>
              <p>{stats.totalDonors}</p>
            </div>
            <div className="stat-card">
              <h3>📥 Requests</h3>
              <p>{stats.totalRequests}</p>
            </div>
          </div>
        );
      case "donors":
        return <DonorList />;
      case "requests":
        return <ViewBloodRequests />;
      case "users":
        return <ManageUsers />;
      default:
        return <p>Select a tab</p>;
    }
  };


  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>🩸 Admin Panel</h2>
        <ul>
          <li
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            📊 Dashboard
          </li>
          <li
            className={activeTab === "donors" ? "active" : ""}
            onClick={() => setActiveTab("donors")}
          >
            🙋‍♂️ Manage Donors
          </li>
          <li
            className={activeTab === "requests" ? "active" : ""}
            onClick={() => setActiveTab("requests")}
          >
            📥 View Requests
          </li>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            👥 Manage Users
          </li>
        </ul>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Welcome, Admin</h1>
        </header>
        <section className="admin-content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default AdminDashboard;
