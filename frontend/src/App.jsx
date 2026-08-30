import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function AdminDashboard({ onLogout }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/stats")
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error(error));
  }, []);

  if (!stats) {
    return <p>Loading admin statistics...</p>;
  }

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>CreatorIQ</h2>

        <nav>
          <p className="active">📊 Dashboard</p>
          <p>👥 Creators</p>
          <p>📈 Analytics</p>
          <p>⚙️ Settings</p>
        </nav>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </aside>

      <main className="main-content">

        <header className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
          </div>

          <div className="profile">
            👤 Admin
          </div>
        </header>

        <div className="analytics-grid">

          <div className="analytics-card">
            <p>Total Creators</p>
            <h2>{stats.total_creators}</h2>
          </div>

          <div className="analytics-card">
            <p>Total Followers</p>
            <h2>{stats.total_followers.toLocaleString()}</h2>
          </div>

          <div className="analytics-card">
            <p>Average Engagement</p>
            <h2>{stats.average_engagement}%</h2>
          </div>

          <div className="analytics-card">
            <p>Database Status</p>
            <h2>Connected</h2>
          </div>

        </div>

      </main>

    </div>
  );
}

function App() {

  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleLogin = (role, id) => {
    setUserRole(role);
    setUserId(id);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserId(null);
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  if (userRole === "creator") {
    return (
      <Dashboard
        userId={userId}
        onLogout={handleLogout}
      />
    );
  }

  if (userRole === "admin") {
    return (
      <AdminDashboard
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

export default App;