import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FiHome,
  FiPackage,
  FiUser,
  FiBell,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import "./CharityLayout.css";
import mockCharity from "../../data/mockCharity";

function CharityLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const notifications = [
    { id: 1, title: "New listing available", read: false },
    { id: 2, title: "Claim confirmed", read: false },
    { id: 3, title: "Pickup completed", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="charity-layout">

      {/* Sidebar */}
      <aside className={`charity-sidebar ${collapsed ? "collapsed" : ""}`}>

        {/* Top */}
        <div className="charity-sidebar-top">
          {!collapsed ? (
            <div className="charity-sidebar-logo">
              <div className="charity-logo-circle">🌿</div>
              <span className="charity-sidebar-logo-txt">ReBite</span>
            </div>
          ) : (
            <div className="charity-logo-circle">🌿</div>
          )}
          <button
            className="charity-collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* Charity Info */}
        {!collapsed ? (
          <div className="charity-sidebar-info">
            <div className="charity-sidebar-avatar">
              {mockCharity.name?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="charity-sidebar-name">{mockCharity.name}</div>
              <div className="charity-sidebar-loc">📍 {mockCharity.location}</div>
            </div>
          </div>
        ) : (
          <div className="charity-avatar-only">
            {mockCharity.name?.slice(0, 2).toUpperCase()}
          </div>
        )}

        {/* Navigation */}
        <nav className="charity-sidebar-nav">
          <NavLink
            to="/charity"
            end
            className={({ isActive }) =>
              isActive ? "charity-nav-item active" : "charity-nav-item"
            }
          >
            <FiHome className="charity-nav-icon" />
            {!collapsed && <span className="charity-nav-txt">Available Food</span>}
          </NavLink>

          <NavLink
            to="/charity/claimed"
            className={({ isActive }) =>
              isActive ? "charity-nav-item active" : "charity-nav-item"
            }
          >
            <FiPackage className="charity-nav-icon" />
            {!collapsed && <span className="charity-nav-txt">Claimed Listings</span>}
          </NavLink>
        </nav>

        {/* Bottom */}
        <div className="charity-sidebar-bottom">
          <NavLink
            to="/charity/profile"
            className={({ isActive }) =>
              isActive ? "charity-nav-item active" : "charity-nav-item"
            }
          >
            <FiUser className="charity-nav-icon" />
            {!collapsed && <span className="charity-nav-txt">Profile</span>}
          </NavLink>

          <NavLink
            to="/charity/notifications"
            className={({ isActive }) =>
              isActive ? "charity-nav-item active" : "charity-nav-item"
            }
          >
            <div className="charity-notif-wrapper">
              <FiBell className="charity-nav-icon" />
              {unreadCount > 0 && (
                <span className="charity-nav-badge">{unreadCount}</span>
              )}
            </div>
            {!collapsed && <span className="charity-nav-txt">Notifications</span>}
          </NavLink>

          <div className="charity-nav-item logout">
            <FiLogOut className="charity-nav-icon" />
            {!collapsed && <span className="charity-nav-txt">Logout</span>}
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className={`charity-main ${collapsed ? "collapsed" : ""}`}>
        {children}
      </main>

    </div>
  );
}

export default CharityLayout;