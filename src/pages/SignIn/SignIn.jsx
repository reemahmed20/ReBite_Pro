import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function validate() {
        let newErrors = {};

        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Login success", form);
        }
    }

    return (
        <div className="signin">
            <div className="signin-container">

                <button className="back-btn" onClick={() => navigate("/")}>
                    ← Back
                </button>

                <h2 className="title">Welcome back</h2>
                <p className="subtitle">
                    Sign in to continue helping your community
                </p>

                <form onSubmit={handleSubmit}>

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
                    <div className="password-row">
                        <label>Password</label>
                        <span className="forgot">Forgot password?</span>
                    </div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <button type="submit" className="btn-primary">
                        Sign In
                    </button>

                </form>

                <p className="footer-text">
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/signup")}>Sign up</span>
                </p>

            </div>
        </div>
    );
}

export default SignIn;