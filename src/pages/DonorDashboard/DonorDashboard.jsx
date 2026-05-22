import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./DonorDashboard.css";

function DonorDashboard() {
    const navigate = useNavigate();
    const userName = "Reem";

    const impactData = {
        meals: 250,
        people: 12,
        co2: 62,
        donations: 1250,
    };

    return (
        <div className="dashboard">

            <div className="dashboard-navbar">

                <div className="dashboard-logo">
                    <span className="logo">🌿</span>
                    <span className="brand">
                        ReBite <br /> Community
                    </span>
                </div>

                <div className="dashboard-user">
                    👤 Reem
                </div>




            </div>

            <div className="dashboard-container">

                {/* Hero */}
                <div className="hero-section">

                    <div>
                        <p className="hero-subtitle">
                            Welcome Back 👋
                        </p>

                        <h1>
                            Hello, {userName}
                        </h1>

                        <p className="hero-text">
                            Your donations are helping reduce food waste
                            and support families in need.
                        </p>
                    </div>

                    <button
                        className="donate-btn"
                        onClick={() => navigate("/donation")}
                    >
                        Donate Now
                    </button>

                </div>

                {/* Stats */}
                <div className="stats-grid">

                    <div className="stat-card">
                        <span>🍽️</span>
                        <h2>{impactData.meals}</h2>
                        <p>Meals Shared</p>
                    </div>

                    <div className="stat-card">
                        <span>👤</span>
                        <h2>{impactData.people}</h2>
                        <p>People Helped</p>
                    </div>

                    <div className="stat-card">
                        <span>🌱</span>
                        <h2>{impactData.co2}kg</h2>
                        <p>CO₂ Saved</p>
                    </div>

                    <div className="stat-card">
                        <span>💰</span>
                        <h2>{impactData.donations}</h2>
                        <p>EGP Donated</p>
                    </div>

                </div>

                {/* Recent Donations */}
                <div className="recent-section">

                    <div className="recent-header">
                        <h2>Recent Donations</h2>

                        <button className="view-btn">
                            View All
                        </button>
                    </div>

                    <div className="recent-card">

                        <div className="donation-row">
                            <div>
                                <h4>100 EGP Donation</h4>
                                <p>Provided 20 meals</p>
                            </div>

                            <span>2 days ago</span>
                        </div>

                        <div className="donation-row">
                            <div>
                                <h4>200 EGP Donation</h4>
                                <p>Helped 40 people</p>
                            </div>

                            <span>1 week ago</span>
                        </div>

                        <div className="donation-row">
                            <div>
                                <h4>150 EGP Donation</h4>
                                <p>Saved 15kg CO₂</p>
                            </div>

                            <span>2 weeks ago</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DonorDashboard;