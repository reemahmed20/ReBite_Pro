import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function selectRole(role) {
        setForm({
            ...form,
            role: role,
        });
    }

    function getPasswordStrength(password) {
        if (password.length === 0) return null;
        if (password.length < 6) return "weak";
        if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        )
            return "strong";
        return "medium";
    }

    function validate() {
        let newErrors = {};

        if (!form.name) {
            newErrors.name = "Name is required";
        }

        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Min 6 characters";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Confirm your password";
        } else if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!form.role) {
            newErrors.role = "Select a role";
        }

        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Account created", form);
        }
    }

    return (
        <div className="signup">
            <div className="signup-container">

                <button className="back-btn" onClick={() => navigate("/")}>
                    ← Back
                </button>

                <h2 className="title">Join ReBite</h2>
                <p className="signup-sub">Help reduce food waste and feed those in need.</p>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}

                    {/* Email */}
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    {/* Password */}
                    <label>Password</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Min. 8 characters"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <span
                            className="eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🔒" : "👁️"}
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}

                    {/* Password Strength */}
                    {form.password && (
                        <div className={`strength strength--${getPasswordStrength(form.password)}`}>
                            <div className="strength-bars">
                                <div className="strength-bar" />
                                <div className="strength-bar" />
                                <div className="strength-bar" />
                            </div>
                            <span className="strength-text">
                                {getPasswordStrength(form.password) === "weak" && "Weak"}
                                {getPasswordStrength(form.password) === "medium" && "Medium"}
                                {getPasswordStrength(form.password) === "strong" && "Strong 💪"}
                            </span>
                        </div>
                    )}

                    {/* Confirm Password */}
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Repeat your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                    )}

                    {/* Roles */}
                    <label>Select Role</label>
                    <div className="roles">
                        <button
                            type="button"
                            className={form.role === "restaurant" ? "role active" : "role"}
                            onClick={() => selectRole("restaurant")}
                        >
                            🍽️ Restaurant
                        </button>
                        <button
                            type="button"
                            className={form.role === "charity" ? "role active" : "role"}
                            onClick={() => selectRole("charity")}
                        >
                            🤲 Charity
                        </button>
                        <button
                            type="button"
                            className={form.role === "donor" ? "role active" : "role"}
                            onClick={() => selectRole("donor")}
                        >
                            💰 Donor
                        </button>
                    </div>
                    {errors.role && <p className="error">{errors.role}</p>}

                    <button type="submit" className="signup-btn">
                        Create Account
                    </button>

                </form>

                <p className="footer-text">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/signin")}>Sign In</span>
                </p>

            </div>
        </div>
    );
}

export default SignUp;