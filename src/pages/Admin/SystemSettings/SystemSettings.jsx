import { useState } from "react";
import "./SystemSettings.css";

function SystemSettings() {
  const [activeTab, setActiveTab] = useState("donation");

  const [donationRules, setDonationRules] = useState({
    expiryTime: "24",
    maxRequests: "5",
    acceptanceConditions: "Food must be safe for consumption and properly packed. Expired and damaged items are not accepted.",
  });

  const [locations, setLocations] = useState([
    { id: 1, name: "Lahore" },
    { id: 2, name: "Karachi" },
    { id: 3, name: "Islamabad" },
    { id: 4, name: "Rawalpindi" },
  ]);

  const [newLocation, setNewLocation] = useState("");
  const [editLocationId, setEditLocationId] = useState(null);
  const [editLocationName, setEditLocationName] = useState("");

  const [notifications, setNotifications] = useState({
    enableNotifications: true,
    urgentFoodAlerts: true,
    approvalUpdates: true,
    pickupReminders: true,
    generalAnnouncements: false,
  });

  const [savedMsg, setSavedMsg] = useState("");

  function handleSave(msg) {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(""), 2000);
  }

  function addLocation() {
    if (!newLocation.trim()) return;
    setLocations([...locations, { id: Date.now(), name: newLocation.trim() }]);
    setNewLocation("");
  }

  function deleteLocation(id) {
    setLocations(locations.filter((l) => l.id !== id));
  }

  function saveEditLocation(id) {
    setLocations(locations.map((l) => l.id === id ? { ...l, name: editLocationName } : l));
    setEditLocationId(null);
  }

  const tabs = [
    { key: "donation", label: "Donation Rules" },
    { key: "locations", label: "Locations Management" },
    { key: "notifications", label: "Notification Settings" },
  ];

  return (
    <div className="system-settings">

      <div className="ss-header">
        <div>
          <h1 className="ss-title">System Settings</h1>
          <p className="ss-sub">Dashboard / System Settings</p>
        </div>
      </div>

      {savedMsg && (
        <div className="ss-saved-msg">✅ {savedMsg}</div>
      )}

      {/* Tabs */}
      <div className="ss-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`ss-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Donation Rules */}
      {activeTab === "donation" && (
        <div className="ss-card">
          <h2 className="ss-card-title">Donation Rules</h2>
          <div className="ss-form">
            <div className="ss-field">
              <label className="ss-label">Expiry Time Limit (hours)</label>
              <input
                className="ss-input"
                type="number"
                value={donationRules.expiryTime}
                onChange={(e) => setDonationRules({ ...donationRules, expiryTime: e.target.value })}
              />
            </div>
            <div className="ss-field">
              <label className="ss-label">Maximum Requests per User</label>
              <input
                className="ss-input"
                type="number"
                value={donationRules.maxRequests}
                onChange={(e) => setDonationRules({ ...donationRules, maxRequests: e.target.value })}
              />
            </div>
            <div className="ss-field ss-field-full">
              <label className="ss-label">Acceptance Conditions</label>
              <textarea
                className="ss-input ss-textarea"
                value={donationRules.acceptanceConditions}
                onChange={(e) => setDonationRules({ ...donationRules, acceptanceConditions: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <button className="ss-save-btn" onClick={() => handleSave("Donation rules saved successfully!")}>
            Save Rules
          </button>
        </div>
      )}

      {/* Locations Management */}
      {activeTab === "locations" && (
        <div className="ss-card">
          <h2 className="ss-card-title">Locations Management</h2>
          <div className="ss-locations-list">
            {locations.map((loc) => (
              <div key={loc.id} className="ss-location-row">
                {editLocationId === loc.id ? (
                  <input
                    className="ss-input ss-location-input"
                    value={editLocationName}
                    onChange={(e) => setEditLocationName(e.target.value)}
                  />
                ) : (
                  <span className="ss-location-name">{loc.name}</span>
                )}
                <div className="ss-location-actions">
                  {editLocationId === loc.id ? (
                    <button className="ss-loc-save-btn" onClick={() => saveEditLocation(loc.id)}>✓ Save</button>
                  ) : (
                    <button className="ss-loc-edit-btn" onClick={() => { setEditLocationId(loc.id); setEditLocationName(loc.name); }}>✏️</button>
                  )}
                  <button className="ss-loc-delete-btn" onClick={() => deleteLocation(loc.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
          <div className="ss-add-location">
            <input
              className="ss-input"
              placeholder="Enter new location..."
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addLocation()}
            />
            <button className="ss-add-loc-btn" onClick={addLocation}>+ Add Location</button>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <div className="ss-card">
          <h2 className="ss-card-title">Notification Settings</h2>
          <div className="ss-notif-list">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="ss-notif-row">
                <span className="ss-notif-label">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                </span>
                <div
                  className={`ss-toggle ${value ? "on" : "off"}`}
                  onClick={() => setNotifications({ ...notifications, [key]: !value })}
                >
                  <div className="ss-thumb" />
                </div>
              </div>
            ))}
          </div>
          <button className="ss-save-btn" onClick={() => handleSave("Notification settings saved!")}>
            Save Settings
          </button>
        </div>
      )}

    </div>
  );
}

export default SystemSettings;