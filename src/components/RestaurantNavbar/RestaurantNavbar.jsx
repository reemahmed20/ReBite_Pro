import "./RestaurantNavbar.css";

function RestaurantNavbar({ name, location, notifCount }) {
    return (
        <div className="rest-navbar">
            <div className="rest-navbar-left">
                <div className="rest-avatar">
                    {name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                    <div className="rest-name">{name}</div>
                    <div className="rest-location">📍 {location}</div>
                </div>
            </div>
            <div className="notif-btn">
                🔔
                {notifCount > 0 && (
                    <span className="notif-dot">{notifCount}</span>
                )}
            </div>
        </div>
    );
}

export default RestaurantNavbar;