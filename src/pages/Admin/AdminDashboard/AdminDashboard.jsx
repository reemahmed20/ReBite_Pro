import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./AdminDashboard.css";
import mockAdmin from "../../../data/mockAdmin";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="ad-header">
        <div>
          <h1 className="ad-title">Dashboard</h1>
          <p className="ad-sub">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="ad-date">May 12, 2025 – May 18, 2025</div>
      </div>

      {/* Stats Cards */}
      <div className="ad-stats">
        <div className="ad-stat-card">
          <div className="ad-stat-icon" style={{ background: "#d4e8c2" }}>📦</div>
          <div>
            <div className="ad-stat-num">{mockAdmin.totalDonations}</div>
            <div className="ad-stat-lbl">Total Donations</div>
            <div className="ad-stat-trend positive">+12.5% this week</div>
          </div>
        </div>
        <div className="ad-stat-card">
          <div className="ad-stat-icon" style={{ background: "#d4e8c2" }}>👥</div>
          <div>
            <div className="ad-stat-num">{mockAdmin.activeUsers.toLocaleString()}</div>
            <div className="ad-stat-lbl">Active Users</div>
            <div className="ad-stat-trend positive">+8.3% this week</div>
          </div>
        </div>
        <div className="ad-stat-card">
          <div className="ad-stat-icon" style={{ background: "#fef9e7" }}>📋</div>
          <div>
            <div className="ad-stat-num">{mockAdmin.pendingRequests}</div>
            <div className="ad-stat-lbl">Pending Requests</div>
            <div className="ad-stat-trend neutral">Needs review</div>
          </div>
        </div>
        <div className="ad-stat-card">
          <div className="ad-stat-icon" style={{ background: "#d4e8c2" }}>🌍</div>
          <div>
            <div className="ad-stat-num">{mockAdmin.foodWasteSaved.toLocaleString()} kg</div>
            <div className="ad-stat-lbl">Food Waste Saved</div>
            <div className="ad-stat-trend positive">+15.2% this week</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="ad-charts">

        {/* Line Chart */}
        <div className="ad-chart-card">
          <div className="ad-chart-header">
            <h2 className="ad-chart-title">Donations Over Time</h2>
            <span className="ad-chart-period">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockAdmin.donationsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe0" />
              <XAxis dataKey="date" fontSize={12} tick={{ fill: "#5a6b4a" }} />
              <YAxis fontSize={12} tick={{ fill: "#5a6b4a" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#2d5016"
                strokeWidth={2.5}
                dot={{ fill: "#2d5016", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="ad-chart-card">
          <div className="ad-chart-header">
            <h2 className="ad-chart-title">Food Waste Saved (kg)</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={mockAdmin.foodWasteData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {mockAdmin.foodWasteData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="ad-quick-actions">
        <h2 className="ad-section-title">Quick Actions</h2>
        <div className="ad-actions-grid">
          <button
            className="ad-action-btn"
            onClick={() => navigate("/admin/requests")}
          >
            <span>📋</span> Review Requests
          </button>
          <button
            className="ad-action-btn"
            onClick={() => navigate("/admin/users")}
          >
            <span>👥</span> Manage Users
          </button>
          <button className="ad-action-btn">
            <span>📊</span> Monitor Donations
          </button>
          <button className="ad-action-btn">
            <span>📄</span> Generate Report
          </button>
        </div>
      </div>

      {/* Recent Users */}
      <div className="ad-table-section">
        <div className="ad-table-header">
          <h2 className="ad-section-title">Recent Users</h2>
          <button
            className="ad-view-all"
            onClick={() => navigate("/admin/users")}
          >
            View all →
          </button>
        </div>
        <div className="ad-table">
          <div className="ad-table-head">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Joined On</span>
          </div>
          {mockAdmin.recentUsers.map((user) => (
            <div key={user.id} className="ad-table-row">
              <span className="ad-user-name">{user.name}</span>
              <span className="ad-user-email">{user.email}</span>
              <span className="ad-user-role">{user.role}</span>
              <span>
                <div className={`ad-status ${user.status}`}>
                  {user.status}
                </div>
              </span>
              <span className="ad-user-joined">{user.joined}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Requests */}
      <div className="ad-table-section">
        <div className="ad-table-header">
          <h2 className="ad-section-title">Pending Registration Requests</h2>
          <button
            className="ad-view-all"
            onClick={() => navigate("/admin/requests")}
          >
            View all →
          </button>
        </div>
        <div className="ad-table">
          <div className="ad-table-head">
            <span>Name</span>
            <span>Type</span>
            <span>Email</span>
            <span>Submitted On</span>
            <span>Actions</span>
          </div>
          {mockAdmin.pendingRequestsList.map((req) => (
            <div key={req.id} className="ad-table-row">
              <span className="ad-user-name">{req.name}</span>
              <span className="ad-user-role">{req.type}</span>
              <span className="ad-user-email">{req.email}</span>
              <span className="ad-user-joined">{req.submitted}</span>
              <span className="ad-row-actions">
                <button className="ad-approve-btn">✓ Approve</button>
                <button className="ad-reject-btn">✕ Reject</button>
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;