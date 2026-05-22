import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RestaurantHome.css";
import mockUser from "../../../data/mockUser";
import useListings from "../../../hooks/useListings";

const statusConfig = {
  active: {
    label: "Active",
    color: "#27ae60",
    bg: "#eaf9ea",
    border: "#a9dfbf",
    stripe: "#27ae60",
  },
  reserved: {
    label: "Reserved",
    color: "#2e86c1",
    bg: "#ebf5fb",
    border: "#aed6f1",
    stripe: "#f39c12",
  },
  collected: {
    label: "Collected",
    color: "#8e44ad",
    bg: "#f4ecf7",
    border: "#d7bde2",
    stripe: "#8e44ad",
  },
  expired: {
    label: "Expired",
    color: "#e74c3c",
    bg: "#fdedec",
    border: "#f1948a",
    stripe: "#e74c3c",
  },
};

const tabs = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "reserved", label: "Reserved" },
  { key: "collected", label: "Collected" },
  { key: "expired", label: "Expired" },
];

function RestaurantHome() {
  const [activeTab, setActiveTab] = useState("all");
  const { listings } = useListings();
  const navigate = useNavigate();

  const filteredListings =
    activeTab === "all"
      ? listings
      : listings.filter((l) => l.status === activeTab);

  // حساب الـ stats من الـ listings الحقيقية
  const stats = {
    active: listings.filter((l) => l.status === "active").length,
    reserved: listings.filter((l) => l.status === "reserved").length,
    thisWeek: listings.length,
    expiring: listings.filter((l) => l.status === "expired").length,
  };

  return (
    <div className="rest-home">
      <div className="rest-home-header">
        <div>
          <h1 className="rest-home-title">My Listings</h1>
          <p className="rest-home-sub">Manage your food donations</p>
        </div>
        <button
          className="add-listing-btn"
          onClick={() => navigate("/restaurant/add-listing")}
        >
          + Add Listing
        </button>
      </div>

      <HeroStats listings={listings} />
      <QuickStats stats={stats} />
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        listings={listings}
      />
      <ListingsSection listings={filteredListings} />
    </div>
  );
}

function HeroStats({ listings }) {
  const totalPortions = listings.reduce((acc, l) => {
    const num = parseInt(l.portions);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const collected = listings.filter((l) => l.status === "collected").length;
  const co2 = (totalPortions * 0.8 * 2.5).toFixed(0);

  return (
    <div className="hero-stats">
      <div className="hstat-card">
        <div className="hstat-num">{collected}</div>
        <div className="hstat-lbl">Total Donations</div>
      </div>
      <div className="hstat-card">
        <div className="hstat-num">{totalPortions}</div>
        <div className="hstat-lbl">Meals Saved</div>
      </div>
      <div className="hstat-card">
        <div className="hstat-num">{co2} kg</div>
        <div className="hstat-lbl">CO₂ Reduced</div>
      </div>
    </div>
  );
}

function QuickStats({ stats }) {
  return (
    <div className="quick-stats">
      <div className="qstat-card" style={{ borderTopColor: "#27ae60" }}>
        <span className="qstat-icon">🟢</span>
        <div className="qstat-val" style={{ color: "#27ae60" }}>
          {stats.active}
        </div>
        <div className="qstat-lbl">Active</div>
      </div>
      <div className="qstat-card" style={{ borderTopColor: "#2e86c1" }}>
        <span className="qstat-icon">🔵</span>
        <div className="qstat-val" style={{ color: "#2e86c1" }}>
          {stats.reserved}
        </div>
        <div className="qstat-lbl">Reserved</div>
      </div>
      <div className="qstat-card" style={{ borderTopColor: "#8e44ad" }}>
        <span className="qstat-icon">📋</span>
        <div className="qstat-val" style={{ color: "#8e44ad" }}>
          {stats.thisWeek}
        </div>
        <div className="qstat-lbl">This week</div>
      </div>
      <div className="qstat-card" style={{ borderTopColor: "#e74c3c" }}>
        <span className="qstat-icon">⚠️</span>
        <div className="qstat-val" style={{ color: "#e74c3c" }}>
          {stats.expiring}
        </div>
        <div className="qstat-lbl">Expired</div>
      </div>
    </div>
  );
}

function TabBar({ tabs, activeTab, onTabChange, listings }) {
  function getCount(key) {
    return listings.filter((l) => l.status === key).length;
  }

  return (
    <div className="tab-bar-wrap">
      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => onTabChange(tab.key)}
          >
            <span className="tab-txt">{tab.label}</span>
            {tab.key !== "all" && (
              <span className="tab-cnt">{getCount(tab.key)}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function ListingsSection({ listings }) {
  if (listings.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <div className="empty-title">No listings here</div>
        <div className="empty-sub">
          Switch to a different tab or add a new listing.
        </div>
      </div>
    );
  }

  return (
    <div className="listings">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

function ListingCard({ listing }) {
  const config = statusConfig[listing.status];

  return (
    <div className="listing-card">
      <div className="stripe" style={{ background: config.stripe }} />
      <div className="lcard-body">
        <div className="lcard-top">
          <div className="lcard-title">{listing.title}</div>
          <div
            className="status-badge"
            style={{ background: config.bg, borderColor: config.border }}
          >
            <div className="sbadge-dot" style={{ background: config.color }} />
            <div className="sbadge-txt" style={{ color: config.color }}>
              {config.label}
            </div>
          </div>
        </div>
        <div className="lcard-meta">
          <span>📦 {listing.portions}</span>
          <div className="meta-sep" />
          <span>🕐 {listing.time}</span>
        </div>
        <div className="lcard-bottom">
          <span className="posted-ago">{listing.postedAgo}</span>
          {listing.claimedBy && (
            <span className="claimed-by">🏢 {listing.claimedBy}</span>
          )}
          {!listing.claimedBy && listing.status === "active" && (
            <span className="awaiting">Awaiting claim…</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantHome;