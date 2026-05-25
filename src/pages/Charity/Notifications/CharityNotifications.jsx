import { useState } from "react";
import "./CharityNotifications.css";

const initialNotifications = [
    {
        id: 1,
        icon: "✅",
        title: "Claim Approved",
        text: "Bella Italia approved your claim for Assorted Pizza Slices. Pickup details are now available.",
        time: "10 min ago",
        group: "Today",
        read: false,
    },
    {
        id: 2,
        icon: "📦",
        title: "Pickup Reminder",
        text: "Your pickup window starts at 3:00 PM for Bento Meal Boxes.",
        time: "30 min ago",
        group: "Today",
        read: false,
    },
    {
        id: 3,
        icon: "❌",
        title: "Claim Rejected",
        text: "Sakura Kitchen could not approve your claim. You can browse other listings.",
        time: "1 hr ago",
        group: "Today",
        read: false,
    },
    {
        id: 4,
        icon: "🎉",
        title: "Donation Collected",
        text: "You marked Mixed Salad Bowls as collected. Impact analytics updated.",
        time: "Yesterday 6:20 PM",
        group: "Yesterday",
        read: true,
    },
];

function CharityNotifications() {
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter((item) => !item.read).length;
    const groups = ["Today", "Yesterday", "Earlier"];

    function markAsRead(id) {
        setNotifications(
            notifications.map((item) =>
                item.id === id ? { ...item, read: true } : item
            )
        );
    }

    function markAllRead() {
        setNotifications(
            notifications.map((item) => ({ ...item, read: true }))
        );
    }

    function deleteNotification(id) {
        setNotifications(
            notifications.filter((item) => item.id !== id)
        );
    }

    return (
        <div className="charity-notifications">
            <div className="charity-notif-header">
                <div>
                    <h1>Notifications</h1>
                    <p>Track claim updates, pickup reminders, and collection status.</p>
                </div>

                {unreadCount > 0 && (
                    <button onClick={markAllRead}>Mark all as read</button>
                )}
            </div>

            {unreadCount > 0 && (
                <div className="charity-unread-banner">
                    🔔 You have {unreadCount} unread notification
                    {unreadCount > 1 ? "s" : ""}
                </div>
            )}

            {notifications.length === 0 && (
                <div className="charity-empty">
                    <div>📭</div>
                    <h3>No notifications yet</h3>
                    <p>You’ll be notified when your claims are updated.</p>
                </div>
            )}

            {groups.map((group) => {
                const groupItems = notifications.filter(
                    (item) => item.group === group
                );

                if (groupItems.length === 0) return null;

                return (
                    <div className="charity-notif-group" key={group}>
                        <span className="charity-group-label">{group}</span>

                        <div className="charity-notif-list">
                            {groupItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`charity-notif-card ${item.read ? "read" : "unread"
                                        }`}
                                    onClick={() => markAsRead(item.id)}
                                >
                                    <div className="charity-notif-icon">{item.icon}</div>

                                    <div className="charity-notif-content">
                                        <div className="charity-notif-top">
                                            <h3>{item.title}</h3>
                                            {!item.read && <span className="charity-dot" />}
                                        </div>

                                        <p>{item.text}</p>
                                        <span className="charity-time">{item.time}</span>
                                    </div>

                                    <button
                                        className="charity-delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNotification(item.id);
                                        }}
                                    >
                                        ×
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

export default CharityNotifications;