import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
    FiGrid,
    FiUsers,
    FiClipboard,
    FiPackage,
    FiTrash2,
    FiSettings,
    FiFileText,
    FiLogOut,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";


import "./AdminLayout.css";

function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-layout">

            {/* Sidebar */}
            <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>

                {/* Top */}
                <div className="admin-sidebar-top">
                    {!collapsed ? (
                        <div className="admin-sidebar-logo">
                            <div className="admin-logo-circle">🌿</div>
                            <span className="admin-sidebar-logo-txt">ReBite</span>
                        </div>
                    ) : (
                        <div className="admin-logo-circle">🌿</div>
                    )}
                    <button
                        className="admin-collapse-btn"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
                    </button>
                </div>

                {/* Admin Info */}
                {!collapsed ? (
                    <div className="admin-sidebar-info">
                        <div className="admin-sidebar-avatar">AD</div>
                        <div>
                            <div className="admin-sidebar-name">Admin</div>
                            <div className="admin-sidebar-role">Super Admin</div>
                        </div>
                    </div>
                ) : (
                    <div className="admin-avatar-only">AD</div>
                )}

                {/* Navigation */}
                <nav className="admin-sidebar-nav">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            isActive ? "admin-nav-item active" : "admin-nav-item"
                        }
                    >
                        <FiGrid className="admin-nav-icon" />
                        {!collapsed && <span className="admin-nav-txt">Dashboard</span>}
                    </NavLink>

                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            isActive ? "admin-nav-item active" : "admin-nav-item"
                        }
                    >
                        <FiUsers className="admin-nav-icon" />
                        {!collapsed && <span className="admin-nav-txt">Users Management</span>}
                    </NavLink>

                    <NavLink
                        to="/admin/requests"
                        className={({ isActive }) =>
                            isActive ? "admin-nav-item active" : "admin-nav-item"
                        }
                    >
                        <FiClipboard className="admin-nav-icon" />
                        {!collapsed && <span className="admin-nav-txt">Registration Requests</span>}
                    </NavLink>
                    <NavLink to="/admin/donations" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
                        <FiPackage className="admin-nav-icon" />
                        {!collapsed && <span className="admin-nav-txt">Donations Monitoring</span>}
                    </NavLink>

                    <NavLink to="/admin/food-waste" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
                        <FiTrash2 className="admin-nav-icon" />
                        {!collapsed && <span className="admin-nav-txt">Food Waste</span>}
                    </NavLink>

                    <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
                        <FiSettings className="admin-nav-icon" />
                        {!collapsed && <span className="admin-nav-txt">System Settings</span>}
                    </NavLink>

                    <NavLink to="/admin/reports" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
                        <FiFileText className="admin-nav-icon" />
                        {!collapsed && <span className="admin-nav-txt">Reports</span>}
                    </NavLink>
                </nav>


                {/* Bottom */}
                <div className="admin-sidebar-bottom">
                    <NavLink
                        to="/"
                        className="admin-nav-item logout"
                    >
                        <FiLogOut className="admin-nav-icon" />
                        {!collapsed && <span className="admin-nav-txt">Logout</span>}
                    </NavLink>
                </div>

            </aside>

            {/* Main Content */}
            <main className={`admin-main ${collapsed ? "collapsed" : ""}`}>
                {children}
            </main>

        </div>
    );
}

export default AdminLayout;