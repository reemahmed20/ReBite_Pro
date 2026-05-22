import { useState } from "react";
import "./ClaimedListings.css";

const mockClaimedListings = [
  {
    id: 1,
    restaurantName: "Nile Garden Restaurant",
    restaurantInitials: "NG",
    foodType: "Cooked Meals",
    items: "Rice, Grilled Chicken, Salad",
    portions: "25 portions",
    pickup: "6:00 PM – 7:30 PM",
    status: "reserved",
    claimedAt: "Today, 5:30 PM",
    tags: ["Halal", "Hot food"],
  },
  {
    id: 2,
    restaurantName: "Cairo Bakehouse",
    restaurantInitials: "CB",
    foodType: "Baked Goods",
    items: "Bread loaves, Croissants, Muffins",
    portions: "60 items",
    pickup: "7:00 PM – 8:00 PM",
    status: "collected",
    claimedAt: "Yesterday, 6:45 PM",
    tags: ["Vegetarian", "Bakery"],
  },
  {
    id: 3,
    restaurantName: "Pyramids Grill",
    restaurantInitials: "PG",
    foodType: "Cooked Meals",
    items: "Kofta, Fattah, Bread",
    portions: "40 portions",
    pickup: "5:30 PM – 6:30 PM",
    status: "collected",
    claimedAt: "Dec 17, 5:00 PM",
    tags: ["Halal", "Hot food"],
  },
  {
    id: 4,
    restaurantName: "The Green Fork",
    restaurantInitials: "GF",
    foodType: "Produce & Vegetables",
    items: "Tomatoes, Lettuce, Peppers",
    portions: "15 kg",
    pickup: "8:00 – 10:00 AM",
    status: "reserved",
    claimedAt: "Today, 7:00 AM",
    tags: ["Vegan", "Raw produce"],
  },
];

const statusConfig = {
  reserved: {
    label: "Reserved",
    color: "#1a5276",
    bg: "#ebf5fb",
    border: "#aed6f1",
  },
  collected: {
    label: "Collected",
    color: "#1e8449",
    bg: "#eaf9ea",
    border: "#a9dfbf",
  },
};

const tabs = [
  { key: "all", label: "All" },
  { key: "reserved", label: "Reserved" },
  { key: "collected", label: "Collected" },
];

function ClaimedListings() {
  const [activeTab, setActiveTab] = useState("all");
  const [confirmId, setConfirmId] = useState(null);
  const [listings, setListings] = useState(mockClaimedListings);

  const filtered =
    activeTab === "all"
      ? listings
      : listings.filter((l) => l.status === activeTab);

  function handleConfirmCollection(id) {
    setListings(
      listings.map((l) =>
        l.id === id ? { ...l, status: "collected" } : l
      )
    );
    setConfirmId(null);
  }

  return (
    <div className="claimed-listings">

      {/* Header */}
      <div className="cl-header">
        <div>
          <h1 className="cl-title">Claimed Listings</h1>
          <p className="cl-sub">Track your reserved and collected food</p>
        </div>
      </div>

      {/* Stats */}
      <div className="cl-stats">
        <div className="cl-stat">
          <span className="cl-stat-num">{listings.length}</span>
          <span className="cl-stat-lbl">Total Claimed</span>
        </div>
        <div className="cl-stat">
          <span className="cl-stat-num" style={{ color: "#2e86c1" }}>
            {listings.filter((l) => l.status === "reserved").length}
          </span>
          <span className="cl-stat-lbl">Reserved</span>
        </div>
        <div className="cl-stat">
          <span className="cl-stat-num" style={{ color: "#27ae60" }}>
            {listings.filter((l) => l.status === "collected").length}
          </span>
          <span className="cl-stat-lbl">Collected</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="cl-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`cl-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tab.key !== "all" && (
              <span className="cl-tab-cnt">
                {listings.filter((l) => l.status === tab.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="cl-empty">
          <div className="cl-empty-icon">📭</div>
          <div className="cl-empty-title">No listings here</div>
          <div className="cl-empty-sub">Switch to a different tab.</div>
        </div>
      ) : (
        <div className="cl-grid">
          {filtered.map((listing) => (
            <ClaimedCard
              key={listing.id}
              listing={listing}
              onConfirm={() => setConfirmId(listing.id)}
            />
          ))}
        </div>
      )}

      {/* Confirm Collection Modal */}
      {confirmId && (
        <div className="cl-overlay" onClick={() => setConfirmId(null)}>
          <div className="cl-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cl-modal-icon">✅</div>
            <h2 className="cl-modal-title">Confirm Collection</h2>
            <p className="cl-modal-sub">
              Are you sure you want to confirm that you collected this food?
              This action cannot be undone.
            </p>
            <div className="cl-modal-actions">
              <button
                className="cl-btn-secondary"
                onClick={() => setConfirmId(null)}
              >
                Cancel
              </button>
              <button
                className="cl-btn-primary"
                onClick={() => handleConfirmCollection(confirmId)}
              >
                Yes, Collected!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function ClaimedCard({ listing, onConfirm }) {
  const status = statusConfig[listing.status];

  return (
    <div className="cl-card">

      {/* Card Header */}
      <div className="cl-card-hdr">
        <div className="cl-rest-info">
          <div className="cl-avatar">{listing.restaurantInitials}</div>
          <div>
            <div className="cl-rest-name">{listing.restaurantName}</div>
            <div className="cl-food-type">{listing.foodType}</div>
          </div>
        </div>
        <div
          className="cl-badge"
          style={{ background: status.bg, borderColor: status.border }}
        >
          <div className="cl-badge-dot" style={{ background: status.color }} />
          <div className="cl-badge-txt" style={{ color: status.color }}>
            {status.label}
          </div>
        </div>
      </div>

      <div className="cl-divider" />

      {/* Items */}
      <div className="cl-items">{listing.items}</div>

      {/* Meta */}
      <div className="cl-meta">
        <span>📦 {listing.portions}</span>
        <div className="cl-meta-sep" />
        <span>🕐 {listing.pickup}</span>
      </div>

      {/* Claimed At */}
      <div className="cl-claimed-at">
        🕓 Claimed: {listing.claimedAt}
      </div>

      {/* Tags */}
      <div className="cl-tags">
        {listing.tags.map((tag) => (
          <span key={tag} className="cl-tag">{tag}</span>
        ))}
      </div>

      {/* Action Button */}
      {listing.status === "reserved" && (
        <button className="cl-confirm-btn" onClick={onConfirm}>
          ✅ Confirm Collection
        </button>
      )}

      {listing.status === "collected" && (
        <div className="cl-collected-badge">
          ✓ Food Collected
        </div>
      )}

    </div>
  );
}

export default ClaimedListings;