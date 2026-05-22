import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import mockUser from "../../../data/mockUser";

function Profile() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [restaurantForm, setRestaurantForm] = useState({
    name: mockUser.name,
    cuisine: "Egyptian Cuisine",
    location: mockUser.location,
    phone: "+20 100 000 0000",
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  function handleRestaurantChange(e) {
    setRestaurantForm({ ...restaurantForm, [e.target.name]: e.target.value });
  }

  function handlePasswordChange(e) {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  }

  function handlePasswordSave(e) {
    e.preventDefault();
    if (!passwordForm.current) {
      setPasswordError("Current password is required");
      return;
    }
    if (passwordForm.newPass.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setShowPasswordModal(false);
      setPasswordForm({ current: "", newPass: "", confirm: "" });
    }, 1500);
  }

  function handleSignOut() {
    navigate("/");
  }

  return (
    <div className="profile">

      <div className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <p className="profile-sub">Manage your account and preferences</p>
      </div>

      <div className="profile-layout">

        {/* Left */}
        <div className="profile-left">
          <div className="profile-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                {restaurantForm.name?.slice(0, 2).toUpperCase()}
              </div>
              <div className="profile-verified">✓</div>
            </div>
            <div className="profile-name">{restaurantForm.name}</div>
            <div className="profile-type">{restaurantForm.cuisine}</div>
            <div className="profile-loc">📍 {restaurantForm.location}</div>
            <div className="profile-joined">Member since March 2024</div>
            <button
              className="profile-edit-btn"
              onClick={() => setShowRestaurantModal(true)}
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="profile-right">

          {/* Account */}
          <div className="profile-section">
            <div className="section-label">Account</div>
            <div className="settings-card">
              <div className="setting-row" onClick={() => setShowRestaurantModal(true)}>
                <div className="setting-icon">🏪</div>
                <div className="setting-lbl">Restaurant info</div>
                <div className="setting-chev">›</div>
              </div>
              <div className="setting-row no-hover">
                <div className="setting-icon">📧</div>
                <div className="setting-lbl">Email</div>
                <div className="setting-val">contact@nilegarden.com</div>
              </div>
              <div className="setting-row" onClick={() => setShowPasswordModal(true)}>
                <div className="setting-icon">🔒</div>
                <div className="setting-lbl">Change password</div>
                <div className="setting-chev">›</div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="profile-section">
            <div className="section-label">Preferences</div>
            <div className="settings-card">
              <div className="setting-row">
                <div className="setting-icon">🔔</div>
                <div className="setting-lbl">Push notifications</div>
                <div
                  className={`pref-toggle ${notifications ? "on" : "off"}`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <div className="pref-thumb" />
                </div>
              </div>
              <div className="setting-row">
                <div className="setting-icon">📩</div>
                <div className="setting-lbl">Email alerts</div>
                <div
                  className={`pref-toggle ${emailAlerts ? "on" : "off"}`}
                  onClick={() => setEmailAlerts(!emailAlerts)}
                >
                  <div className="pref-thumb" />
                </div>
              </div>
              <div className="setting-row" onClick={() => setShowLanguageModal(true)}>
                <div className="setting-icon">🌍</div>
                <div className="setting-lbl">Language</div>
                <div className="setting-val">{language}</div>
                <div className="setting-chev">›</div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="profile-section">
            <div className="section-label">Support</div>
            <div className="settings-card">
              <div className="setting-row" onClick={() => setShowHelp(true)}>
                <div className="setting-icon">❓</div>
                <div className="setting-lbl">Help & FAQ</div>
                <div className="setting-chev">›</div>
              </div>
              <div className="setting-row" onClick={() => setShowTerms(true)}>
                <div className="setting-icon">📋</div>
                <div className="setting-lbl">Terms of service</div>
                <div className="setting-chev">›</div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="profile-section">
            <div className="section-label">Danger zone</div>
            <div className="settings-card">
              <div className="setting-row danger" onClick={handleSignOut}>
                <div className="setting-icon danger">🚪</div>
                <div className="setting-lbl danger">Sign out</div>
              </div>
              <div className="setting-row danger" onClick={() => setShowDeleteConfirm(true)}>
                <div className="setting-icon danger">🗑️</div>
                <div className="setting-lbl danger">Delete account</div>
              </div>
            </div>
          </div>

          <div className="profile-version">ReBite v1.0.0</div>

        </div>
      </div>

      {/* Restaurant Info Modal */}
      {showRestaurantModal && (
        <div className="profile-overlay" onClick={() => setShowRestaurantModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Restaurant Info</h2>
            <div className="modal-form">
              <div className="modal-field">
                <label className="modal-label">Restaurant Name</label>
                <input
                  className="modal-input"
                  type="text"
                  name="name"
                  value={restaurantForm.name}
                  onChange={handleRestaurantChange}
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Cuisine Type</label>
                <input
                  className="modal-input"
                  type="text"
                  name="cuisine"
                  value={restaurantForm.cuisine}
                  onChange={handleRestaurantChange}
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Location</label>
                <input
                  className="modal-input"
                  type="text"
                  name="location"
                  value={restaurantForm.location}
                  onChange={handleRestaurantChange}
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Phone</label>
                <input
                  className="modal-input"
                  type="text"
                  name="phone"
                  value={restaurantForm.phone}
                  onChange={handleRestaurantChange}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-btn-secondary" onClick={() => setShowRestaurantModal(false)}>
                Cancel
              </button>
              <button className="modal-btn-primary" onClick={() => setShowRestaurantModal(false)}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="profile-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Change Password</h2>
            <form onSubmit={handlePasswordSave} className="modal-form">
              <div className="modal-field">
                <label className="modal-label">Current Password</label>
                <input
                  className="modal-input"
                  type="password"
                  name="current"
                  placeholder="Enter current password"
                  value={passwordForm.current}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">New Password</label>
                <input
                  className="modal-input"
                  type="password"
                  name="newPass"
                  placeholder="Min. 6 characters"
                  value={passwordForm.newPass}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Confirm New Password</label>
                <input
                  className="modal-input"
                  type="password"
                  name="confirm"
                  placeholder="Repeat new password"
                  value={passwordForm.confirm}
                  onChange={handlePasswordChange}
                />
              </div>
              {passwordError && <p className="modal-error">{passwordError}</p>}
              {passwordSuccess && <p className="modal-success">✅ Password changed successfully!</p>}
              <div className="modal-actions">
                <button type="button" className="modal-btn-secondary" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="modal-btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="profile-overlay" onClick={() => setShowLanguageModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Select Language</h2>
            <div className="language-options">
              {["English", "العربية", "Français"].map((lang) => (
                <div
                  key={lang}
                  className={`language-option ${language === lang ? "active" : ""}`}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageModal(false);
                  }}
                >
                  {lang}
                  {language === lang && <span className="lang-check">✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="profile-overlay" onClick={() => setShowHelp(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Help & FAQ ❓</h2>
            <div className="faq-list">
              <div className="faq-item">
                <div className="faq-q">How do I add a listing?</div>
                <div className="faq-a">Go to Add Listing from the sidebar and fill in the food details.</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">How do charities get notified?</div>
                <div className="faq-a">Nearby charities receive instant alerts when you post a new listing.</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">What happens when food expires?</div>
                <div className="faq-a">The listing status automatically changes to Expired if no charity claims it.</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">Can I edit a listing after posting?</div>
                <div className="faq-a">Yes! Go to Manage Menu to edit or delete active listings.</div>
              </div>
            </div>
            <button className="modal-btn-primary" onClick={() => setShowHelp(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="profile-overlay" onClick={() => setShowTerms(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Terms of Service 📋</h2>
            <div className="terms-content">
              <p>By using ReBite, you agree to the following terms:</p>
              <ul>
                <li>All food listed must be safe for consumption.</li>
                <li>Listings must be accurate and up to date.</li>
                <li>You are responsible for food quality and safety.</li>
                <li>ReBite reserves the right to remove any listing that violates our policies.</li>
                <li>Your data is handled according to our Privacy Policy.</li>
              </ul>
              <p>Last updated: March 2024</p>
            </div>
            <button className="modal-btn-primary" onClick={() => setShowTerms(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="profile-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🗑️</div>
            <h2 className="modal-title">Delete Account?</h2>
            <p className="modal-sub">
              Are you sure? All your data and listings will be permanently removed.
            </p>
            <div className="modal-actions">
              <button className="modal-btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="modal-btn-danger" onClick={() => navigate("/")}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;