import { useState } from "react";
import "./FoodWasteMonitoring.css";

const mockWasteRecords = [
  { id: 1, restaurant: "Spice Fusion", foodType: "Cooked Rice", quantityWasted: "5 kg", date: "May 18, 2025", reason: "Overcooked", location: "Lahore" },
  { id: 2, restaurant: "Bake House", foodType: "Bread", quantityWasted: "8 kg", date: "May 18, 2025", reason: "Leftover", location: "Karachi" },
  { id: 3, restaurant: "Royal Garden", foodType: "Vegetables", quantityWasted: "6 kg", date: "May 17, 2025", reason: "Spoiled", location: "Islamabad" },
  { id: 4, restaurant: "Food Street", foodType: "Cooked Pasta", quantityWasted: "4 kg", date: "May 17, 2025", reason: "Low Demand", location: "Lahore" },
  { id: 5, restaurant: "Juice Land", foodType: "Fruits", quantityWasted: "3 kg", date: "May 16, 2025", reason: "Overripe", location: "Karachi" },
  { id: 6, restaurant: "Nile Garden", foodType: "Grilled Chicken", quantityWasted: "7 kg", date: "May 16, 2025", reason: "Leftover", location: "Cairo" },
];

function FoodWasteMonitoring() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [records] = useState(mockWasteRecords);

  const totalWasted = records.reduce((acc, r) => {
    const num = parseFloat(r.quantityWasted);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const filtered = records.filter((r) => {
    const matchSearch =
      r.restaurant.toLowerCase().includes(search.toLowerCase()) ||
      r.foodType.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "All Categories" ||
      r.foodType.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchSearch && matchCategory;
  });

  return (
    <div className="food-waste-monitoring">

      <div className="fw-header">
        <div>
          <h1 className="fw-title">Food Waste Monitoring</h1>
          <p className="fw-sub">Dashboard / Food Waste Monitoring</p>
        </div>
      </div>

      {/* Stats */}
      <div className="fw-stats">
        <div className="fw-stat">
          <div className="fw-stat-num">{records.length}</div>
          <div className="fw-stat-lbl">Total Records</div>
        </div>
        <div className="fw-stat">
          <div className="fw-stat-num" style={{ color: "#e74c3c" }}>{totalWasted} kg</div>
          <div className="fw-stat-lbl">Total Wasted</div>
        </div>
        <div className="fw-stat">
          <div className="fw-stat-num" style={{ color: "#f39c12" }}>
            {[...new Set(records.map((r) => r.restaurant))].length}
          </div>
          <div className="fw-stat-lbl">Restaurants</div>
        </div>
      </div>

      {/* Filters */}
      <div className="fw-filters">
        <div className="fw-search">
          <span>🔍</span>
          <input
            placeholder="Search waste records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="fw-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option>All Categories</option>
          <option>Cooked</option>
          <option>Bread</option>
          <option>Vegetables</option>
          <option>Fruits</option>
        </select>
      </div>

      {/* Table */}
      <div className="fw-table-wrapper">
        <div className="fw-table">
          <div className="fw-table-head">
            <span>Restaurant</span>
            <span>Food Type</span>
            <span>Quantity Wasted</span>
            <span>Date</span>
            <span>Reason</span>
            <span>Actions</span>
          </div>
          {filtered.length === 0 ? (
            <div className="fw-empty">No records found</div>
          ) : (
            filtered.map((r) => (
              <div key={r.id} className="fw-table-row">
                <span className="fw-restaurant">{r.restaurant}</span>
                <span className="fw-food-type">{r.foodType}</span>
                <span className="fw-quantity" style={{ color: "#e74c3c", fontWeight: 700 }}>
                  {r.quantityWasted}
                </span>
                <span className="fw-date">{r.date}</span>
                <span className="fw-reason">
                  <div className="fw-reason-badge">{r.reason}</div>
                </span>
                <span className="fw-actions">
                  <button className="fw-view-btn">👁 View</button>
                </span>
              </div>
            ))
          )}
        </div>
        <div className="fw-table-footer">
          Showing 1 to {filtered.length} of {filtered.length} records
        </div>
      </div>

    </div>
  );
}

export default FoodWasteMonitoring;