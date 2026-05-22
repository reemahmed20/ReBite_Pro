import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
    FiHome,
    FiPlusSquare,
    FiMenu,
    FiUser,
    FiBell,
    FiLogOut,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

import "./RestaurantLayout.css";
import mockUser from "../../data/mockUser";

function RestaurantLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    // Mock Notifications
    const notifications = [
        {
            id: 1,
            title: "New charity request",
            read: false,
        },
        {
            id: 2,
            title: "Donation confirmed",
            read: false,
        },
        {
            id: 3,
            title: "Food pickup completed",
            read: true,
        },
    ];

    // Dynamic unread count
    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    return (
        <div className="rest-layout">

            {/* Sidebar */}
            <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

                {/* Top */}
                <div className="sidebar-top">

                    {!collapsed ? (
                        <div className="sidebar-logo">

                            <div className="logo-circle">
                                🌿
                            </div>

                            <span className="sidebar-logo-txt">
                                ReBite
                            </span>

                        </div>
                    ) : (
                        <div className="logo-circle">
                            🌿
                        </div>
                    )}

                    <button
                        className="collapse-btn"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? (
                            <FiChevronRight />
                        ) : (
                            <FiChevronLeft />
                        )}
                    </button>

                </div>

                {/* Restaurant Info */}
                {!collapsed ? (
                    <div className="sidebar-restaurant">

                        <div className="sidebar-avatar">
                            {mockUser.name?.slice(0, 2).toUpperCase()}
                        </div>

                        <div>
                            <div className="sidebar-rest-name">
                                {mockUser.name}
                            </div>

                            <div className="sidebar-rest-loc">
                                📍 {mockUser.location}
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="sidebar-avatar-only">
                        {mockUser.name?.slice(0, 2).toUpperCase()}
                    </div>
                )}

                {/* Navigation */}
                <nav className="sidebar-nav">

                    <NavLink
                        to="/restaurant"
                        end
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        <FiHome className="nav-icon" />

                        {!collapsed && (
                            <span className="nav-txt">
                                Dashboard
                            </span>
                        )}
                    </NavLink>

                    <NavLink
                        to="/restaurant/add-listing"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        <FiPlusSquare className="nav-icon" />

                        {!collapsed && (
                            <span className="nav-txt">
                                Add Listing
                            </span>
                        )}
                    </NavLink>

                    <NavLink
                        to="/restaurant/manage-menu"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        <FiMenu className="nav-icon" />

                        {!collapsed && (
                            <span className="nav-txt">
                                Manage Menu
                            </span>
                        )}
                    </NavLink>

                </nav>

                {/* Bottom */}
                <div className="sidebar-bottom">

                    <NavLink
                        to="/restaurant/profile"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        <FiUser className="nav-icon" />

                        {!collapsed && (
                            <span className="nav-txt">
                                Profile
                            </span>
                        )}
                    </NavLink>

                    <NavLink
                        to="/restaurant/notifications"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        <div className="notification-wrapper">

                            <FiBell className="nav-icon" />

                            {unreadCount > 0 && (
                                <span className="nav-badge">
                                    {unreadCount}
                                </span>
                            )}

                        </div>

                        {!collapsed && (
                            <span className="nav-txt">
                                Notifications
                            </span>
                        )}
                    </NavLink>

                    <NavLink
                        to="/restaurant/logout"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        <FiLogOut className="nav-icon" />

                        {!collapsed && (
                            <span className="nav-txt">
                                Logout
                            </span>
                        )}
                    </NavLink>

                </div>

            </aside>

            {/* Main Content */}
            <main className={`rest-main ${collapsed ? "collapsed" : ""}`}>
                {children}
            </main>

        </div>
    );
}

export default RestaurantLayout;