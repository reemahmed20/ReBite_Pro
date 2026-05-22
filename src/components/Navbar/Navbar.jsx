import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className="navbar-left">
                <span className="logo">🌿</span>
                <span className="brand">
                    ReBite <br /> Community
                </span>
            </div>

            <div className="navbar-right">
                <button
                    className="signin-btn"
                    onClick={() => navigate("/signin")}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Navbar;