import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DonorProfile.css";

function DonorProfile() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState("English");

    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [user, setUser] = useState({
        name: "Reem Ahmed",
        email: "reem@gmail.com",
        phone: "+20 100 000 0000",
    });

    const [editForm, setEditForm] = useState(user);

    const [passwordForm, setPasswordForm] = useState({
        current: "",
        newPass: "",
        confirm: "",
    });

    const [passwordError, setPasswordError] = useState("");

    function handleEditChange(e) {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    }

    function saveEditProfile(e) {
        e.preventDefault();

        setUser(editForm);
        setShowEditModal(false);
    }

    function handlePasswordChange(e) {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value,
        });
    }

    function savePassword(e) {
        e.preventDefault();

        if (!passwordForm.current) {
            setPasswordError("Current password is required");
            return;
        }

        if (passwordForm.newPass.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }

        if (passwordForm.newPass !== passwordForm.confirm) {
            setPasswordError("Passwords do not match");
            return;
        }

        setPasswordError("");
        setShowPasswordModal(false);

        setPasswordForm({
            current: "",
            newPass: "",
            confirm: "",
        });
    }

    return (
        <div className="donor-profile">
            <div className="donor-profile-topbar">
                <button onClick={() => navigate("/donor")}>
                    ← Back to Dashboard
                </button>
            </div>

            <div className="donor-header">
                <h1>Profile</h1>
                <p>Manage your account settings and preferences.</p>
            </div>

            <div className="donor-layout">
                <div className="donor-left">
                    <div className="profile-card">
                        <div className="profile-avatar">
                            {user.name.slice(0, 1).toUpperCase()}
                        </div>

                        <h2>{user.name}</h2>
                        <p>{user.email}</p>

                        <button
                            className="edit-btn"
                            onClick={() => {
                                setEditForm(user);
                                setShowEditModal(true);
                            }}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className="donor-right">
                    <div className="profile-section">
                        <div className="section-title">Account</div>

                        <div className="settings-card">
                            <div className="setting-row">
                                <div className="setting-left">
                                    <div className="setting-icon">👤</div>
                                    <div>
                                        <h4>Full Name</h4>
                                        <p>{user.name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="setting-row">
                                <div className="setting-left">
                                    <div className="setting-icon">📧</div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="setting-row">
                                <div className="setting-left">
                                    <div className="setting-icon">📱</div>
                                    <div>
                                        <h4>Phone Number</h4>
                                        <p>{user.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <div className="section-title">Preferences</div>

                        <div className="settings-card">
                            <div className="setting-row">
                                <div className="setting-left">
                                    <div className="setting-icon">🔔</div>
                                    <div>
                                        <h4>Notifications</h4>
                                        <p>Receive donation updates</p>
                                    </div>
                                </div>

                                <div
                                    className={`toggle ${notifications ? "on" : "off"}`}
                                    onClick={() => setNotifications(!notifications)}
                                >
                                    <div className="toggle-circle" />
                                </div>
                            </div>

                            <div
                                className="setting-row clickable"
                                onClick={() => setShowLanguageModal(true)}
                            >
                                <div className="setting-left">
                                    <div className="setting-icon">🌍</div>
                                    <div>
                                        <h4>Language</h4>
                                        <p>{language}</p>
                                    </div>
                                </div>

                                <span>›</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <div className="section-title">Payment Methods</div>

                        <div className="settings-card">
                            <div className="setting-row">
                                <div className="setting-left">
                                    <div className="setting-icon">💳</div>
                                    <div>
                                        <h4>Visa ending in 4242</h4>
                                        <p>Default payment method</p>
                                    </div>
                                </div>
                            </div>

                            <div className="setting-row">
                                <div className="setting-left">
                                    <div className="setting-icon">📱</div>
                                    <div>
                                        <h4>Vodafone Cash</h4>
                                        <p>01012345678</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-section">
                        <div className="section-title">Security</div>

                        <div className="settings-card">
                            <div
                                className="setting-row clickable"
                                onClick={() => setShowPasswordModal(true)}
                            >
                                <div className="setting-left">
                                    <div className="setting-icon">🔒</div>
                                    <div>
                                        <h4>Change Password</h4>
                                        <p>Update your password</p>
                                    </div>
                                </div>

                                <span>›</span>
                            </div>

                            <div
                                className="setting-row clickable danger"
                                onClick={() => navigate("/")}
                            >
                                <div className="setting-left">
                                    <div className="setting-icon danger">🚪</div>
                                    <div>
                                        <h4 className="danger-text">Logout</h4>
                                        <p>Sign out of your account</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="setting-row clickable danger"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                <div className="setting-left">
                                    <div className="setting-icon danger">🗑️</div>
                                    <div>
                                        <h4 className="danger-text">Delete Account</h4>
                                        <p>Permanently remove your account</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Profile</h2>

                        <form onSubmit={saveEditProfile}>
                            <input
                                className="modal-input"
                                name="name"
                                placeholder="Full name"
                                value={editForm.name}
                                onChange={handleEditChange}
                            />

                            <input
                                className="modal-input"
                                name="email"
                                placeholder="Email"
                                value={editForm.email}
                                onChange={handleEditChange}
                            />

                            <input
                                className="modal-input"
                                name="phone"
                                placeholder="Phone"
                                value={editForm.phone}
                                onChange={handleEditChange}
                            />

                            <button className="save-btn">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}

            {showPasswordModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowPasswordModal(false)}
                >
                    <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Change Password</h2>

                        <form onSubmit={savePassword}>
                            <input
                                type="password"
                                name="current"
                                placeholder="Current password"
                                className="modal-input"
                                value={passwordForm.current}
                                onChange={handlePasswordChange}
                            />

                            <input
                                type="password"
                                name="newPass"
                                placeholder="New password"
                                className="modal-input"
                                value={passwordForm.newPass}
                                onChange={handlePasswordChange}
                            />

                            <input
                                type="password"
                                name="confirm"
                                placeholder="Confirm password"
                                className="modal-input"
                                value={passwordForm.confirm}
                                onChange={handlePasswordChange}
                            />

                            {passwordError && (
                                <p className="error-text">{passwordError}</p>
                            )}

                            <button className="save-btn">Save Password</button>
                        </form>
                    </div>
                </div>
            )}

            {showLanguageModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowLanguageModal(false)}
                >
                    <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Select Language</h2>

                        <div className="language-list">
                            {["English", "العربية", "Français"].map((lang) => (
                                <div
                                    key={lang}
                                    className={
                                        language === lang
                                            ? "language-item active"
                                            : "language-item"
                                    }
                                    onClick={() => {
                                        setLanguage(lang);
                                        setShowLanguageModal(false);
                                    }}
                                >
                                    {lang}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowDeleteModal(false)}
                >
                    <div
                        className="profile-modal delete-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="delete-icon">🗑️</div>

                        <h2>Delete Account?</h2>

                        <p>This action cannot be undone.</p>

                        <div className="delete-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>

                            <button className="delete-btn" onClick={() => navigate("/")}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DonorProfile;