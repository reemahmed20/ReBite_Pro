import { useState } from "react";
import "./CharityHome.css";
import mockListings from "../../../data/mockListings";
import mockCharity from "../../../data/mockCharity";

const urgencyConfig = {
  high: { label: "Urgent", color: "#c0392b", bg: "#fee9e7", border: "#f5b7b1" },
  medium: { label: "Medium", color: "#9a7d0a", bg: "#fef9e7", border: "#fad7a0" },
  low: { label: "Low", color: "#1e8449", bg: "#eaf9ea", border: "#a9dfbf" },
};

const filters = [
  { key: "all", label: "All" },
  { key: "high", label: "High Urgency" },
  { key: "near", label: "Nearby" },
  { key: "cooked", label: "Cooked Meals" },
  { key: "bakery", label: "Bakery" },
  { key: "produce", label: "Produce" },
];

function CharityHome() {
  const [listings, setListings] = useState(mockListings);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const urgentCount = listings.filter(
    (l) => l.urgency === "high" && !l.claimed
  ).length;

  function handleClaim(id) {
    setListings(
      listings.map((l) => (l.id === id ? { ...l, claimed: true } : l))
    );
  }

  const filtered = listings.filter((l) => {
    const matchSearch =
      l.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
      l.items.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      activeFilter === "all" ||
      (activeFilter === "high" && l.urgency === "high") ||
      (activeFilter === "near" && parseFloat(l.distance) < 1.5) ||
      (activeFilter === "cooked" && l.foodType.toLowerCase().includes("cooked")) ||
      (activeFilter === "bakery" && l.foodType.toLowerCase().includes("baked")) ||
      (activeFilter === "produce" && l.foodType.toLowerCase().includes("produce"));

    return matchSearch && matchFilter;
  });

  return (
    <div className="charity-home">

      {/* Header */}
      <div className="ch-header">
        <div>
          <p className="ch-greet">Good evening 👋</p>
          <h1 className="ch-title">Available Listings</h1>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="ch-impact">
        <div className="ch-impact-item">
          <div className="ch-impact-num">{mockCharity.stats.claimed}</div>
          <div className="ch-impact-lbl">Claimed</div>
        </div>
        <div className="ch-impact-sep" />
        <div className="ch-impact-item">
          <div className="ch-impact-num">{mockCharity.stats.mealsSaved}</div>
          <div className="ch-impact-lbl">Meals Saved</div>
        </div>
        <div className="ch-impact-sep" />
        <div className="ch-impact-item">
          <div className="ch-impact-num">{urgentCount}</div>
          <div className="ch-impact-lbl">Urgent Now</div>
        </div>
      </div>

      {/* Search */}
      <div className="ch-search">
        <span className="ch-search-icon">🔍</span>
        <input
          className="ch-search-input"
          placeholder="Search food, restaurant…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="ch-search-clear" onClick={() => setSearch("")}>
            ✕
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="ch-filters">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`ch-pill ${activeFilter === f.key ? "active" : ""}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results Row */}
      <div className="ch-results-row">
        <span className="ch-results-txt">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""} available
        </span>
        <span className="ch-sort-txt">Sort by urgency ↓</span>
      </div>

      {/* Listings Grid */}
      {filtered.length === 0 ? (
        <div className="ch-empty">
          <div className="ch-empty-icon">📭</div>
          <div className="ch-empty-title">No listings found</div>
          <div className="ch-empty-sub">Try a different filter or search term.</div>
        </div>
      ) : (
        <div className="ch-grid">
          {filtered.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onClaim={handleClaim}
            />
          ))}
        </div>
      )}

    </div>
  );
}

function ListingCard({ listing, onClaim }) {
  const urgency = urgencyConfig[listing.urgency];

  return (
    <div className={`ch-card ${listing.urgency === "high" ? "urgent" : ""}`}>

      {/* Card Header */}
      <div className="ch-card-hdr">
        <div className="ch-rest-info">
          <div className="ch-avatar">{listing.restaurantInitials}</div>
          <div>
            <div className="ch-rest-name">{listing.restaurantName}</div>
            <div className="ch-food-type">{listing.foodType}</div>
          </div>
        </div>
        <div
          className="ch-badge"
          style={{ background: urgency.bg, borderColor: urgency.border }}
        >
          <div className="ch-badge-dot" style={{ background: urgency.color }} />
          <div className="ch-badge-txt" style={{ color: urgency.color }}>
            {urgency.label}
          </div>
        </div>
      </div>

      <div className="ch-divider" />

      {/* Items */}
      <div className="ch-items">{listing.items}</div>

      {/* Meta */}
      <div className="ch-meta">
        <span>📦 {listing.portions}</span>
        <div className="ch-meta-sep" />
        <span>📍 {listing.distance}</span>
        <div className="ch-meta-sep" />
        <span
          className={listing.urgency === "high" ? "ch-time-urgent" : ""}
        >
          ⏱ {listing.timeLeft}
        </span>
      </div>

      {/* Pickup */}
      <div className="ch-pickup">
        Pickup: <span>{listing.pickup}</span>
      </div>

      {/* Tags */}
      <div className="ch-tags">
        {listing.tags.map((tag) => (
          <span key={tag} className="ch-tag">{tag}</span>
        ))}
      </div>

      {/* Claim Button */}
      <button
        className={`ch-claim-btn ${listing.claimed ? "claimed" : ""}`}
        onClick={() => !listing.claimed && onClaim(listing.id)}
        disabled={listing.claimed}
      >
        {listing.claimed ? "✓ Claimed" : "Claim this listing"}
      </button>

    </div>
  );
}

export default CharityHome;