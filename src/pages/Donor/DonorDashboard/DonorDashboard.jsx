import { useNavigate } from "react-router-dom";
import "./DonorDashboard.css";

function DonorDashboard() {
  const navigate = useNavigate();

  const donorName = "Reem";

  const impactStats = {
    totalDonations: "1,250 EGP",
    mealsProvided: 250,
    co2Saved: "62.5 kg",
    peopleHelped: 12,
  };

  return (
    <div className="donor-dashboard">
      <div className="donor-topbar">
        <h2>🌿 ReBite Donor</h2>

        <button onClick={() => navigate("/donor/profile")}>
          Profile
        </button>
      </div>

      <div className="donor-hero">
        <div>
          <p className="donor-welcome">Welcome back, {donorName} 👋</p>
          <h1>Make an impact with every donation</h1>
          <p>
            Support food redistribution and help ReBite deliver meals to people
            who need them most.
          </p>
        </div>

        <button
          className="donor-primary-btn"
          onClick={() => navigate("/donor/donation")}
        >
          Donate Now →
        </button>
      </div>

      <div className="donor-stats-grid">
        <div className="donor-stat-card">
          <span>💰</span>
          <h3>{impactStats.totalDonations}</h3>
          <p>Total Donations</p>
        </div>

        <div className="donor-stat-card">
          <span>🍽️</span>
          <h3>{impactStats.mealsProvided}</h3>
          <p>Meals Provided</p>
        </div>

        <div className="donor-stat-card">
          <span>🌱</span>
          <h3>{impactStats.co2Saved}</h3>
          <p>CO₂ Saved</p>
        </div>

        <div className="donor-stat-card">
          <span>👥</span>
          <h3>{impactStats.peopleHelped}</h3>
          <p>People Helped</p>
        </div>
      </div>

      <div className="donor-content-grid">
        <div className="donor-panel">
          <div className="donor-panel-header">
            <h2>Recent Donations</h2>
            <button>View all</button>
          </div>

          <div className="donor-donation-row">
            <div>
              <h4>100 EGP</h4>
              <p>12 May 2026</p>
            </div>
            <span>20 meals</span>
          </div>

          <div className="donor-donation-row">
            <div>
              <h4>200 EGP</h4>
              <p>05 May 2026</p>
            </div>
            <span>40 meals</span>
          </div>

          <div className="donor-donation-row">
            <div>
              <h4>150 EGP</h4>
              <p>28 Apr 2026</p>
            </div>
            <span>30 meals</span>
          </div>
        </div>

        <div className="donor-panel donor-impact-panel">
          <h2>Your Impact</h2>
          <p>
            Together, we’re reducing food waste and helping communities one meal
            at a time.
          </p>

          <div className="donor-impact-progress">
            <div className="donor-impact-fill"></div>
          </div>

          <span className="donor-impact-note">
            250 meals provided this month
          </span>
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;