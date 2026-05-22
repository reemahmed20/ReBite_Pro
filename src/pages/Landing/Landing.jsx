import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
    return (
        <div className="landing">
            <div className="landing-navbar-wrapper">
                <Navbar />
            </div>
            <div className="landing-content">
                <HeroSection />
                <HowItWorksSection />
                <WhoJoinsSection />
                <CardSection/>
                <Footer/>

            </div>
        </div>
    );
}

function HeroSection() {
    const navigate = useNavigate();
    return (
        <div className="hero">
            <h1 className="hero-title">Share the Surplus <br /> Feed the Community</h1>
            <p className="hero-sub">
                ReBite connects local food surplus with those in need.<br /> Join us in sharing food and supporting communities..
            </p>
            <button className="btn-primary" onClick={() => navigate("/signup")}>
                Get Started
            </button>
        </div>
    );
}

function HowItWorksSection() {
    return (
        <div className="hiw-section">
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub">Three simple steps to make a difference.</p>
            <div className="hiw-timeline">
                <div className="hiw-step">
                    <div className="hiw-circle">1</div>
                    <span className="hiw-icon">🍽️</span>
                    <h3 className="hiw-step-title">Restaurant Lists Surplus</h3>
                    <p className="hiw-step-desc">Restaurants post their leftover food at the end of each day.</p>
                </div>
                <div className="hiw-line" />
                <div className="hiw-step">
                    <div className="hiw-circle">2</div>
                    <span className="hiw-icon">🔔</span>
                    <h3 className="hiw-step-title">Charity Gets Notified</h3>
                    <p className="hiw-step-desc">Nearby charities receive instant alerts about available food.</p>
                </div>
                <div className="hiw-line" />
                <div className="hiw-step">
                    <div className="hiw-circle">3</div>
                    <span className="hiw-icon">🤝</span>
                    <h3 className="hiw-step-title">Food Gets Delivered</h3>
                    <p className="hiw-step-desc">Food reaches those in need — fresh, fast, and free.</p>
                </div>
            </div>
        </div>
    );
}

function WhoJoinsSection() {
    return (
        <div className="who-section">
            <h2 className="section-title">Who Joins ReBite?</h2>
            <p className="section-sub">Everyone has a role to play.</p>
            <div className="who-cards">
                <div className="who-card who-card--restaurant">
                    <span className="who-icon">🍽️</span>
                    <h3 className="who-title">Restaurants</h3>
                    <p className="who-desc">List your surplus food at the end of the day instead of throwing it away.</p>
                    <span className="who-stat">500+ restaurants</span>
                </div>
                <div className="who-card who-card--charity">
                    <span className="who-icon">🤲</span>
                    <h3 className="who-title">Charities</h3>
                    <p className="who-desc">Receive food donations and distribute them to people in need.</p>
                    <span className="who-stat">200+ charities</span>
                </div>
                <div className="who-card who-card--donor">
                    <span className="who-icon">💰</span>
                    <h3 className="who-title">Donors</h3>
                    <p className="who-desc">Support the mission with financial contributions to help us grow.</p>
                    <span className="who-stat">1,000+ donors</span>
                </div>
            </div>
        </div>
    );
}

function CardSection() {
    return (
        <div className="card-wrapper">
            <div className="card">
                <div>
                    <div className="card-title">REDUCE<br />WASTE</div>
                    <div className="card-sub">REBITE 2026</div>
                </div>
                <div className="card-emojis">🍽️🥗🍝🥘🥪🥙</div>
            </div>
        </div>
    );
}

export default Landing;