import { useState } from "react";
import "./UsersManagement.css";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Donor", status: "active", joined: "May 18, 2025", phone: "+92 300 1234567", address: "123 Main St, Cairo" },
  { id: 2, name: "Mary Smith", email: "mary@example.com", role: "Charity", status: "active", joined: "May 17, 2025", phone: "+92 300 2345678", address: "45 Park Ave, Cairo" },
  { id: 3, name: "Ahmed Khan", email: "ahmed@example.com", role: "Donor", status: "inactive", joined: "May 16, 2025", phone: "+92 300 3456789", address: "78 Green Rd, Cairo" },
  { id: 4, name: "Sara Ali", email: "sara@example.com", role: "Charity", status: "active", joined: "May 15, 2025", phone: "+92 300 4567890", address: "12 Blue St, Cairo" },
  { id: 5, name: "Usman Raza", email: "usman@example.com", role: "Donor", status: "active", joined: "May 14, 2025", phone: "+92 300 5678901", address: "34 Red Ave, Cairo" },
  { id: 6, name: "Fatima Noor", email: "fatima@example.com", role: "Charity", status: "inactive", joined: "May 13, 2025", phone: "+92 300 6789012", address: "56 White Rd, Cairo" },
  { id: 7, name: "Nile Garden", email: "nile@example.com", role: "Restaurant", status: "active", joined: "May 12, 2025", phone: "+92 300 7890123", address: "Zamalek, Cairo" },
  { id: 8, name: "Cairo Bakehouse", email: "cairo@example.com", role: "Restaurant", status: "active", joined: "May 11, 2025", phone: "+92 300 8901234", address: "Nasr City, Cairo" },
];

function UsersManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [editUser, setEditUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All Roles" || u.role === roleFilter;
    const matchStatus = statusFilter === "All Status" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  function openEdit(user) {
    setEditUser(user);
    setForm({ ...user });
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave(e) {
    e.preventDefault();
    setUsers(users.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)));
    setEditUser(null);
  }

  function handleDelete(id) {
    setUsers(users.filter((u) => u.id !== id));
    setDeleteId(null);
  }

  function toggleStatus(id) {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  }

  return (
    <div className="users-management">

      {/* Header */}
      <div className="um-header">
        <div>
          <h1 className="um-title">Users Management</h1>
          <p className="um-sub">Dashboard / Users Management</p>
        </div>
        <button className="um-add-btn">+ Add User</button>
      </div>

      {/* Filters */}
      <div className="um-filters">
        <div className="um-search">
          <span>🔍</span>
          <input
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="um-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option>All Roles</option>
          <option>Donor</option>
          <option>Charity</option>
          <option>Restaurant</option>
        </select>
        <select
          className="um-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="um-table-wrapper">
        <div className="um-table">
          <div className="um-table-head">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Joined On</span>
            <span>Actions</span>
          </div>
          {filtered.length === 0 ? (
            <div className="um-empty">No users found</div>
          ) : (
            filtered.map((user) => (
              <div key={user.id} className="um-table-row">
                <span className="um-user-name">{user.name}</span>
                <span className="um-user-email">{user.email}</span>
                <span className="um-user-role">{user.role}</span>
                <span>
                  <div className={`um-status ${user.status}`}>
                    {user.status}
                  </div>
                </span>
                <span className="um-user-joined">{user.joined}</span>
                <span className="um-actions">
                  <button
                    className="um-edit-btn"
                    onClick={() => openEdit(user)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className={`um-toggle-btn ${user.status === "active" ? "deactivate" : "activate"}`}
                    onClick={() => toggleStatus(user.id)}
                    title={user.status === "active" ? "Deactivate" : "Activate"}
                  >
                    {user.status === "active" ? "⏸" : "▶"}
                  </button>
                  <button
                    className="um-delete-btn"
                    onClick={() => setDeleteId(user.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
        <div className="um-table-footer">
          Showing 1 to {filtered.length} of {filtered.length} users
        </div>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="um-overlay" onClick={() => setEditUser(null)}>
          <div className="um-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="um-modal-title">Edit User</h2>
            <p className="um-modal-sub">Dashboard / Users Management / Edit User</p>
            <form onSubmit={handleSave} className="um-form">
              <div className="um-form-grid">
                <div className="um-field">
                  <label className="um-label">Full Name</label>
                  <input className="um-input" type="text" name="name" value={form.name || ""} onChange={handleFormChange} />
                </div>
                <div className="um-field">
                  <label className="um-label">Email Address</label>
                  <input className="um-input" type="email" name="email" value={form.email || ""} onChange={handleFormChange} />
                </div>
                <div className="um-field">
                  <label className="um-label">Phone Number</label>
                  <input className="um-input" type="text" name="phone" value={form.phone || ""} onChange={handleFormChange} />
                </div>
                <div className="um-field">
                  <label className="um-label">Role</label>
                  <select className="um-input" name="role" value={form.role || ""} onChange={handleFormChange}>
                    <option>Donor</option>
                    <option>Charity</option>
                    <option>Restaurant</option>
                  </select>
                </div>
                <div className="um-field">
                  <label className="um-label">Status</label>
                  <select className="um-input" name="status" value={form.status || ""} onChange={handleFormChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="um-field">
                  <label className="um-label">Address</label>
                  <input className="um-input" type="text" name="address" value={form.address || ""} onChange={handleFormChange} />
                </div>
              </div>
              <div className="um-modal-actions">
                <button type="button" className="um-btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
                <button type="submit" className="um-btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="um-overlay" onClick={() => setDeleteId(null)}>
          <div className="um-modal um-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="um-confirm-icon">🗑️</div>
            <h2 className="um-modal-title">Delete User?</h2>
            <p className="um-confirm-sub">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="um-modal-actions">
              <button className="um-btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="um-btn-danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UsersManagement;