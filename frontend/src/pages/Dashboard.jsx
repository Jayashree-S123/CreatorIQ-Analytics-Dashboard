import { useEffect, useState } from "react";

function Dashboard({ userId, onLogout }) {
  const [creator, setCreator] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("Creator ID is missing.");
      return;
    }

    fetch(`http://127.0.0.1:8000/creators/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch creator data");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Creator data:", data);

        if (data.success) {
          setCreator(data);
        } else {
          setError(data.message || "Creator not found");
        }
      })
      .catch((error) => {
        console.error("Creator API error:", error);
        setError("Unable to load creator data.");
      });
  }, [userId]);

  // Error
  if (error) {
    return (
      <div className="main-content">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Loading
  if (!creator) {
    return (
      <div className="main-content">
        <h2>Loading creator dashboard...</h2>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2>CreatorIQ</h2>

        <nav>
          <p className="active">📊 Dashboard</p>
          <p>👤 Profile</p>
          <p>📈 Analytics</p>
          <p>📝 Content</p>
          <p>⚙️ Settings</p>
        </nav>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="dashboard-header">

          <div>
            <h1>Creator Dashboard</h1>

            <p>
              Welcome back, {creator.name}!
            </p>
          </div>

          <div className="profile">
            👤 {creator.name}
          </div>

        </header>

        {/* Analytics Cards */}
        <section className="analytics-grid">

          <div className="analytics-card">
            <p>Total Followers</p>

            <h2>
              {creator.followers.toLocaleString()}
            </h2>

            <span>
              Live database data
            </span>
          </div>


          <div className="analytics-card">
            <p>Engagement Rate</p>

            <h2>
              {creator.engagement_rate}%
            </h2>

            <span>
              Current engagement
            </span>
          </div>


          <div className="analytics-card">
            <p>Platform</p>

            <h2>
              {creator.platform}
            </h2>

            <span>
              Primary platform
            </span>
          </div>


          <div className="analytics-card">
            <p>Creator ID</p>

            <h2>
              {creator.id}
            </h2>

            <span>
              Database ID
            </span>
          </div>

        </section>

        {/* Creator Information */}
        <section className="chart-section">

          <h2>Creator Information</h2>

          <div className="creator-profile-card">

            <h3>
              {creator.name}
            </h3>

            <p>
              <strong>Platform:</strong>{" "}
              {creator.platform}
            </p>

            <p>
              <strong>Followers:</strong>{" "}
              {creator.followers.toLocaleString()}
            </p>

            <p>
              <strong>Engagement Rate:</strong>{" "}
              {creator.engagement_rate}%
            </p>

            <p>
              <strong>Creator ID:</strong>{" "}
              {creator.id}
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;