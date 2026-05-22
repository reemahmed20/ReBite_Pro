import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="footer-brand">🌿 ReBite</div>

            <p className="footer-copy">
                © 2026 ReBite.<br />
                Rooted in Community.
            </p>

            <div className="footer-links">
                <span className="footer-link">Our Story</span>
                <span className="footer-link">Contact</span>
                <span className="footer-link">Privacy</span>
            </div>
        </div>
    );
}

export default Footer;