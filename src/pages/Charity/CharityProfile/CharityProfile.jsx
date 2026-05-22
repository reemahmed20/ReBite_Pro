import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CharityProfile.css";
import mockCharity from "../../../data/mockCharity";

function CharityProfile() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCharityModal, setShowCharityModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [charityForm, setCharityForm] = useState({
    name: mockCharity.name,
    type: "Food Bank",
    location: mockCharity.location,
    phone: "+20 100 000 0000",
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  function handleCharityChange(e) {
    setCharityForm({ ...charityForm, [e.target.name]: e.target.value });
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

  return (
    <div className="charity-profile">

      <div className="cp-header">
        <h1 className="cp-title">Profile</h1>
        <p className="cp-sub">Manage your account and preferences</p>
      </div>

      <div className="cp-layout">

        {/* Left */}
        <div className="cp-left">
          <div className="cp-card">
            <div className="cp-avatar-wrap">
              <div className="cp-avatar">
                {charityForm.name?.slice(0, 2).toUpperCase()}
              </div>
              <div className="cp-verified">✓</div>
            </div>
            <div className="cp-name">{charityForm.name}</div>
            <div className="cp-type">{charityForm.type}</div>
            <div className="cp-loc">📍 {charityForm.location}</div>
            <div className="cp-joined">Member since January 2024</div>
            <button
              className="cp-edit-btn"
              onClick={() => setShowCharityModal(true)}
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="cp-right">

          {/* Account */}
          <div className="cp-section">
            <div className="cp-section-label">Account</div>
            <div className="cp-settings-card">
              <div className="cp-setting-row" onClick={() => setShowCharityModal(true)}>
                <div className="cp-setting-icon">🏢</div>
                <div className="cp-setting-lbl">Charity info</div>
                <div className="cp-setting-chev">›</div>
              </div>
              <div className="cp-setting-row no-hover">
                <div className="cp-setting-icon">📧</div>
                <div className="cp-setting-lbl">Email</div>
                <div className="cp-setting-val">contact@cairofoodbank.org</div>
              </div>
              <div className="cp-setting-row" onClick={() => setShowPasswordModal(true)}>
                <div className="cp-setting-icon">🔒</div>
                <div className="cp-setting-lbl">Change password</div>
                <div className="cp-setting-chev">›</div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="cp-section">
            <div className="cp-section-label">Preferences</div>
            <div className="cp-settings-card">
              <div className="cp-setting-row">
                <div className="cp-setting-icon">🔔</div>
                <div className="cp-setting-lbl">Push notifications</div>
                <div
                  className={`cp-toggle ${notifications ? "on" : "off"}`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <div className="cp-thumb" />
                </div>
              </div>
              <div className="cp-setting-row">
                <div className="cp-setting-icon">📩</div>
                <div className="cp-setting-lbl">Email alerts</div>
                <div
                  className={`cp-toggle ${emailAlerts ? "on" : "off"}`}
                  onClick={() => setEmailAlerts(!emailAlerts)}
                >
                  <div className="cp-thumb" />
                </div>
              </div>
              <div className="cp-setting-row" onClick={() => setShowLanguageModal(true)}>
                <div className="cp-setting-icon">🌍</div>
                <div className="cp-setting-lbl">Language</div>
                <div className="cp-setting-val">{language}</div>
                <div className="cp-setting-chev">›</div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="cp-section">
            <div className="cp-section-label">Support</div>
            <div className="cp-settings-card">
              <div className="cp-setting-row" onClick={() => setShowHelp(true)}>
                <div className="cp-setting-icon">❓</div>
                <div className="cp-setting-lbl">Help & FAQ</div>
                <div className="cp-setting-chev">›</div>
              </div>
              <div className="cp-setting-row" onClick={() => setShowTerms(true)}>
                <div className="cp-setting-icon">📋</div>
                <div className="cp-setting-lbl">Terms of service</div>
                <div className="cp-setting-chev">›</div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="cp-section">
            <div className="cp-section-label">Danger zone</div>
            <div className="cp-settings-card">
              <div className="cp-setting-row danger" onClick={() => navigate("/")}>
                <div className="cp-setting-icon danger">🚪</div>
                <div className="cp-setting-lbl danger">Sign out</div>
              </div>
              <div className="cp-setting-row danger" onClick={() => setShowDeleteConfirm(true)}>
                <div className="cp-setting-icon danger">🗑️</div>
                <div className="cp-setting-lbl danger">Delete account</div>
              </div>
            </div>
          </div>

          <div className="cp-version">ReBite v1.0.0</div>

        </div>
      </div>

      {/* Charity Info Modal */}
      {showCharityModal && (
        <div className="cp-overlay" onClick={() => setShowCharityModal(false)}>
          <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="cp-modal-title">Charity Info</h2>
            <div className="cp-modal-form">
              <div className="cp-modal-field">
                <label className="cp-modal-label">Charity Name</label>
                <input className="cp-modal-input" type="text" name="name" value={charityForm.name} onChange={handleCharityChange} />
              </div>
              <div className="cp-modal-field">
                <label className="cp-modal-label">Type</label>
                <input className="cp-modal-input" type="text" name="type" value={charityForm.type} onChange={handleCharityChange} />
              </div>
              <div className="cp-modal-field">
                <label className="cp-modal-label">Location</label>
                <input className="cp-modal-input" type="text" name="location" value={charityForm.location} onChange={handleCharityChange} />
              </div>
              <div className="cp-modal-field">
                <label className="cp-modal-label">Phone</label>
                <input className="cp-modal-input" type="text" name="phone" value={charityForm.phone} onChange={handleCharityChange} />
              </div>
            </div>
            <div className="cp-modal-actions">
              <button className="cp-btn-secondary" onClick={() => setShowCharityModal(false)}>Cancel</button>
              <button className="cp-btn-primary" onClick={() => setShowCharityModal(false)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="cp-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="cp-modal-title">Change Password</h2>
            <form onSubmit={handlePasswordSave} className="cp-modal-form">
              <div className="cp-modal-field">
                <label className="cp-modal-label">Current Password</label>
                <input className="cp-modal-input" type="password" name="current" placeholder="Enter current password" value={passwordForm.current} onChange={handlePasswordChange} />
              </div>
              <div className="cp-modal-field">
                <label className="cp-modal-label">New Password</label>
                <input className="cp-modal-input" type="password" name="newPass" placeholder="Min. 6 characters" value={passwordForm.newPass} onChange={handlePasswordChange} />
              </div>
              <div className="cp-modal-field">
                <label className="cp-modal-label">Confirm New Password</label>
                <input className="cp-modal-input" type="password" name="confirm" placeholder="Repeat new password" value={passwordForm.confirm} onChange={handlePasswordChange} />
              </div>
              {passwordError && <p className="cp-modal-error">{passwordError}</p>}
              {passwordSuccess && <p className="cp-modal-success">✅ Password changed successfully!</p>}
              <div className="cp-modal-actions">
                <button type="button" className="cp-btn-secondary" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button type="submit" className="cp-btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="cp-overlay" onClick={() => setShowLanguageModal(false)}>
          <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="cp-modal-title">Select Language</h2>
            <div className="cp-language-options">
              {["English", "العربية", "Français"].map((lang) => (
                <div
                  key={lang}
                  className={`cp-language-option ${language === lang ? "active" : ""}`}
                  onClick={() => { setLanguage(lang); setShowLanguageModal(false); }}
                >
                  {lang}
                  {language === lang && <span className="cp-lang-check">✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="cp-overlay" onClick={() => setShowHelp(false)}>
          <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="cp-modal-title">Help & FAQ ❓</h2>
            <div className="cp-faq-list">
              <div className="cp-faq-item">
                <div className="cp-faq-q">How do I claim a listing?</div>
                <div className="cp-faq-a">Go to Available Food, find a listing, and click Claim.</div>
              </div>
              <div className="cp-faq-item">
                <div className="cp-faq-q">How do I confirm collection?</div>
                <div className="cp-faq-a">Go to Claimed Listings and click Confirm Collection after picking up the food.</div>
              </div>
              <div className="cp-faq-item">
                <div className="cp-faq-q">What if a restaurant cancels?</div>
                <div className="cp-faq-a">You'll receive a notification if a listing is cancelled or expires.</div>
              </div>
            </div>
            <button className="cp-btn-primary" onClick={() => setShowHelp(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="cp-overlay" onClick={() => setShowTerms(false)}>
          <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="cp-modal-title">Terms of Service 📋</h2>
            <div className="cp-terms-content">
              <p>By using ReBite as a charity, you agree to:</p>
              <ul>
                <li>Only claim food you can genuinely distribute.</li>
                <li>Confirm collection after picking up food.</li>
                <li>Handle food safely and responsibly.</li>
                <li>Not claim listings for commercial purposes.</li>
              </ul>
              <p>Last updated: January 2024</p>
            </div>
            <button className="cp-btn-primary" onClick={() => setShowTerms(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="cp-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cp-modal-icon">🗑️</div>
            <h2 className="cp-modal-title">Delete Account?</h2>
            <p className="cp-modal-sub">Are you sure? All your data will be permanently removed.</p>
            <div className="cp-modal-actions">
              <button className="cp-btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="cp-btn-danger" onClick={() => navigate("/")}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default CharityProfile;