import { useState } from "react";
import "./Notifications.css";

const initialNotifications = [
    {
        id: 1,
        type: "claimed",
        icon: "🎉",
        iconBg: "#eaf9ea",
        iconBorder: "#a9dfbf",
        title: "Food Claimed!",
        text: "Cairo Food Bank claimed your Grilled Chicken & Rice listing.",
        time: "10 min ago",
        group: "Today",
        read: false,
    },
    {
        id: 2,
        type: "expiring",
        icon: "⚠️",
        iconBg: "#fef9ec",
        iconBorder: "#f9e4a0",
        title: "Listing Expiring Soon",
        text: "Your Bread & Pastries listing expires in 1 hour. No charity has claimed it yet.",
        time: "30 min ago",
        group: "Today",
        read: false,
    },
    {
        id: 3,
        type: "collected",
        icon: "✅",
        iconBg: "#eaf9ea",
        iconBorder: "#a9dfbf",
        title: "Food Collected",
        text: "Hope Charity successfully collected your Lentil Soup donation.",
        time: "2 hrs ago",
        group: "Today",
        read: false,
    },
    {
        id: 4,
        type: "expired",
        icon: "❌",
        iconBg: "#fdedec",
        iconBorder: "#f1948a",
        title: "Listing Expired",
        text: "Your Grilled Fish & Vegetables listing expired without being claimed.",
        time: "Yesterday 7:00 PM",
        group: "Yesterday",
        read: true,
    },
    {
        id: 5,
        type: "claimed",
        icon: "🎉",
        iconBg: "#eaf9ea",
        iconBorder: "#a9dfbf",
        title: "Food Claimed!",
        text: "Cairo Food Bank claimed your Mixed Salad Bowls listing.",
        time: "Yesterday 3:00 PM",
        group: "Yesterday",
        read: true,
    },
    {
        id: 6,
        type: "collected",
        icon: "✅",
        iconBg: "#eaf9ea",
        iconBorder: "#a9dfbf",
        title: "Food Collected",
        text: "Resala Charity collected your Bread & Pastries donation.",
        time: "2 days ago",
        group: "Earlier",
        read: true,
    },
];

function Notifications() {
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter((n) => !n.read).length;

    function markAsRead(id) {
        setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    }

    function markAllRead() {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }

    function deleteNotification(id) {
        setNotifications(notifications.filter((n) => n.id !== id));
    }

    const groups = ["Today", "Yesterday", "Earlier"];

    return (
        <div className="notifications">

            {/* Header */}
            <div className="notif-header">
                <div>
                    <h1 className="notif-title">Notifications</h1>
                    <p className="notif-sub">Stay updated on your listings</p>
                </div>
                {unreadCount > 0 && (
                    <button className="mark-all-btn" onClick={markAllRead}>
                        Mark all as read
                    </button>
                )}
            </div>

            {/* Unread Banner */}
            {unreadCount > 0 && (
                <div className="unread-banner">
                    🔔 You have {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
                </div>
            )}

            {/* Empty State */}
            {notifications.length === 0 && (
                <div className="notif-empty">
                    <div className="notif-empty-icon">📭</div>
                    <div className="notif-empty-title">No notifications yet</div>
                    <div className="notif-empty-sub">
                        You'll be notified when charities claim or collect your listings.
                    </div>
                </div>
            )}

            {/* Groups */}
            {groups.map((group) => {
                const groupNotifs = notifications.filter((n) => n.group === group);
                if (groupNotifs.length === 0) return null;

                return (
                    <div key={group} className="notif-group">
                        <div className="group-label">{group}</div>
                        <div className="notif-list glass-list">
                            {groupNotifs.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`notif-item ${notif.read ? "read" : "unread"}`}
                                    onClick={() => markAsRead(notif.id)}
                                >
                                    <div
                                        className="notif-icon"
                                        style={{
                                            background: notif.iconBg,
                                            borderColor: notif.iconBorder,
                                        }}
                                    >
                                        {notif.icon}
                                    </div>
                                    <div className="notif-body">
                                        <div className="notif-top">
                                            <div className="notif-name">{notif.title}</div>
                                            {!notif.read && <div className="notif-dot" />}
                                        </div>
                                        <div className="notif-text">{notif.text}</div>
                                        <div className="notif-time">{notif.time}</div>
                                    </div>
                                    <button
                                        className="notif-delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNotification(notif.id);
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

        </div>
    );
}

export default Notifications;