import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    // Check password length
    if (password.length < 6) {
      setIsError(true);
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://mern-stack-restaurant-finj.onrender.com/api/auth/register",
        {
          username: username.trim(),
          email: email.trim(),
          password,
        }
      );

      setIsError(false);
      setMessage(
        response.data?.message || "Account created successfully!"
      );

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setIsError(true);

      if (error.response) {
        setMessage(
          error.response.data?.message ||
            error.response.data?.error ||
            "Registration failed. Please try again."
        );
      } else if (error.request) {
        setMessage(
          "Cannot connect to server. Please make sure the backend is running."
        );
      } else {
        setMessage("Something went wrong. Please try again.");
      }

      console.error(
        "Signup error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account 🍽️</h1>

        <p className="auth-subtitle">
          Sign up for MERN Stack Restaurant
        </p>

        <form onSubmit={handleSignup}>
          <label htmlFor="username">Full Name</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="name"
            required
            disabled={loading}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={loading}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
            disabled={loading}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
            disabled={loading}
          />

          {message && (
            <p
              role="status"
              aria-live="polite"
              style={{
                color: isError ? "red" : "green",
                marginTop: "12px",
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
