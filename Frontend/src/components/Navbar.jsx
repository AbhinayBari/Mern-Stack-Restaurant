import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        const count = cart.reduce(
          (total, item) =>
            total + Number(item.quantity || 1),
          0
        );

        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };

    const updateAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    updateCartCount();
    updateAuth();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("authUpdated", updateAuth);
    window.addEventListener("storage", updateAuth);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("authUpdated", updateAuth);
      window.removeEventListener("storage", updateAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authUpdated"));

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Restaurant</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart
          <span className="cart-count">{cartCount}</span>
        </Link>

        {isLoggedIn ? (
          <button
            type="button"
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
