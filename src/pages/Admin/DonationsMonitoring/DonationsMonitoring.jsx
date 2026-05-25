import { useState } from "react";
import "./DonationsMonitoring.css";

const mockDonations = [
  { id: 1, foodItem: "Chicken Biryani", quantity: "20 kg", donor: "Spice Fusion", expiryTime: "May 18, 2025 06:00 PM", status: "pending", location: "Lahore" },
  { id: 2, foodItem: "Mixed Vegetables", quantity: "15 kg", donor: "Food Street", expiryTime: "May 18, 2025 07:30 PM", status: "collected", location: "Karachi" },
  { id: 3, foodItem: "Bread Packets", quantity: "50 pcs", donor: "Bake House", expiryTime: "May 18, 2025 08:00 AM", status: "pending", location: "Islamabad" },
  { id: 4, foodItem: "Fruit Salad", quantity: "10 kg", donor: "Juice Land", expiryTime: "May 18, 2025 05:00 PM", status: "expired", location: "Lahore" },
  { id: 5, foodItem: "Plain Rice", quantity: "25 kg", donor: "Royal Restaurant", expiryTime: "May 17, 2025 11:00 PM", status: "collected", location: "Karachi" },
  { id: 6, foodItem: "Grilled Chicken", quantity: "30 portions", donor: "Nile Garden", expiryTime: "May 19, 2025 07:00 PM", status: "pending", location: "Cairo" },
  { id: 7, foodItem: "Lentil Soup", quantity: "40 portions", donor: "Cairo Bakehouse", expiryTime: "May 19, 2025 08:00 PM", status: "collected", location: "Cairo" },
];

const statusConfig = {
  pending: { label: "Pending", color: "#f39c12", bg: "#fef9e7", border: "#fad7a0" },
  collected: { label: "Collected", color: "#27ae60", bg: "#eaf9ea", border: "#a9dfbf" },
  expired: { label: "Expired", color: "#e74c3c", bg: "#fdedec", border: "#f1948a" },
};

function DonationsMonitoring() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donations, setDonations] = useState(mockDonations);

  const filtered = donations.filter((d) => {
    const matchSearch = d.foodItem.toLowerCase().includes(search.toLowerCase()) ||
      d.donor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || d.status === statusFilter.toLowerCase();
    const matchLocation = locationFilter === "All Locations" || d.location === locationFilter;
    return matchSearch && matchStatus && matchLocation;
  });

  function handleMarkCollected(id) {
    setDonations(donations.map((d) => d.id === id ? { ...d, status: "collected" } : d));
    setSelectedDonation(null);
  }

  function handleMarkExpired(id) {
    setDonations(donations.map((d) => d.id === id ? { ...d, status: "expired" } : d));
    setSelectedDonation(null);
  }

  return (
    <div className="donations-monitoring">

      <div className="dm-header">
        <div>
          <h1 className="dm-title">Donations Monitoring</h1>
          <p className="dm-sub">Dashboard / Donations Monitoring</p>
        </div>
      </div>

      {/* Stats */}
      <div className="dm-stats">
        <div className="dm-stat">
          <div className="dm-stat-num">{donations.length}</div>
          <div className="dm-stat-lbl">Total Donations</div>
        </div>
        <div className="dm-stat">
          <div className="dm-stat-num" style={{ color: "#f39c12" }}>
            {donations.filter((d) => d.status === "pending").length}
          </div>
          <div className="dm-stat-lbl">Pending</div>
        </div>
        <div className="dm-stat">
          <div className="dm-stat-num" style={{ color: "#27ae60" }}>
            {donations.filter((d) => d.status === "collected").length}
          </div>
          <div className="dm-stat-lbl">Collected</div>
        </div>
        <div className="dm-stat">
          <div className="dm-stat-num" style={{ color: "#e74c3c" }}>
            {donations.filter((d) => d.status === "expired").length}
          </div>
          <div className="dm-stat-lbl">Expired</div>
        </div>
      </div>

      {/* Filters */}
      <div className="dm-filters">
        <div className="dm-search">
          <span>🔍</span>
          <input
            placeholder="Search donations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="dm-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option value="pending">Pending</option>
          <option value="collected">Collected</option>
          <option value="expired">Expired</option>
        </select>
        <select className="dm-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option>All Locations</option>
          <option>Lahore</option>
          <option>Karachi</option>
          <option>Islamabad</option>
          <option>Cairo</option>
        </select>
      </div>

      {/* Table */}
      <div className="dm-table-wrapper">
        <div className="dm-table">
          <div className="dm-table-head">
            <span>Food Item</span>
            <span>Quantity</span>
            <span>Donor</span>
            <span>Expiry Time</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {filtered.length === 0 ? (
            <div className="dm-empty">No donations found</div>
          ) : (
            filtered.map((d) => (
              <div key={d.id} className="dm-table-row">
                <span className="dm-food-name">{d.foodItem}</span>
                <span className="dm-quantity">{d.quantity}</span>
                <span className="dm-donor">{d.donor}</span>
                <span className="dm-expiry">{d.expiryTime}</span>
                <span>
                  <div
                    className="dm-status"
                    style={{
                      background: statusConfig[d.status].bg,
                      color: statusConfig[d.status].color,
                      border: `1px solid ${statusConfig[d.status].border}`,
                    }}
                  >
                    {statusConfig[d.status].label}
                  </div>
                </span>
                <span className="dm-actions">
                  <button className="dm-view-btn" onClick={() => setSelectedDonation(d)}>
                    👁 View
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
        <div className="dm-table-footer">
          Showing 1 to {filtered.length} of {filtered.length} donations
        </div>
      </div>

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="dm-overlay" onClick={() => setSelectedDonation(null)}>
          <div className="dm-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="dm-modal-title">Donation Details</h2>
            <p className="dm-modal-sub">Dashboard / Donations Monitoring / Donation Details</p>

            <div className="dm-detail-grid">
              <div className="dm-detail-item">
                <span className="dm-detail-label">Food Item</span>
                <span className="dm-detail-val">{selectedDonation.foodItem}</span>
              </div>
              <div className="dm-detail-item">
                <span className="dm-detail-label">Quantity</span>
                <span className="dm-detail-val">{selectedDonation.quantity}</span>
              </div>
              <div className="dm-detail-item">
                <span className="dm-detail-label">Donor</span>
                <span className="dm-detail-val">{selectedDonation.donor}</span>
              </div>
              <div className="dm-detail-item">
                <span className="dm-detail-label">Location</span>
                <span className="dm-detail-val">📍 {selectedDonation.location}</span>
              </div>
              <div className="dm-detail-item">
                <span className="dm-detail-label">Expiry Time</span>
                <span className="dm-detail-val">{selectedDonation.expiryTime}</span>
              </div>
              <div className="dm-detail-item">
                <span className="dm-detail-label">Status</span>
                <div
                  className="dm-status"
                  style={{
                    background: statusConfig[selectedDonation.status].bg,
                    color: statusConfig[selectedDonation.status].color,
                    border: `1px solid ${statusConfig[selectedDonation.status].border}`,
                  }}
                >
                  {statusConfig[selectedDonation.status].label}
                </div>
              </div>
            </div>

            {selectedDonation.status === "pending" && (
              <div className="dm-modal-actions">
                <button className="dm-btn-secondary" onClick={() => setSelectedDonation(null)}>Close</button>
                <button className="dm-btn-danger" onClick={() => handleMarkExpired(selectedDonation.id)}>Mark as Expired</button>
                <button className="dm-btn-primary" onClick={() => handleMarkCollected(selectedDonation.id)}>Mark as Collected</button>
              </div>
            )}

            {selectedDonation.status !== "pending" && (
              <div className="dm-modal-actions">
                <button className="dm-btn-secondary" onClick={() => setSelectedDonation(null)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default DonationsMonitoring;