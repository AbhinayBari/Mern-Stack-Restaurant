import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
const navigate = useNavigate();

const [customerName, setCustomerName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const cart = JSON.parse(localStorage.getItem("cart") || "[]");

const totalAmount = cart.reduce(
(total, item) =>
total + Number(item.price) * Number(item.quantity || 1),
0
);

const placeOrder = async (e) => {
e.preventDefault();
setError("");

if (cart.length === 0) {
  setError("Your cart is empty.");
  return;
}

setLoading(true);

try {
  const response = await fetch(
    "http://localhost:5000/api/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName,
        phone,
        address,
        paymentMethod: "COD",
        items: cart.map((item) => ({
          foodId: item._id,
          quantity: Number(item.quantity || 1),
        })),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Order failed");
  }

  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));

  alert(
    `Order placed successfully! Order ID: ${
      data.order?._id || "Confirmed"
    }`
  );

  navigate("/");
} catch (err) {
  setError(err.message || "Something went wrong");
} finally {
  setLoading(false);
}


};

return ( <div className="checkout-page"> <div className="checkout-header"> <span className="checkout-tag">ALMOST THERE!</span> <h1>Checkout <span>🛒</span></h1> <p>Complete your details and enjoy your favourite food.</p> </div>

  {cart.length === 0 ? (
    <div className="checkout-empty">
      <div className="empty-cart-icon">🛍️</div>
      <h2>Your cart is empty</h2>
      <p>Add some delicious food before checking out.</p>
      <button
        className="checkout-primary-btn"
        onClick={() => navigate("/menu")}
      >
        Explore Menu
      </button>
    </div>
  ) : (
    <div className="checkout-layout">
      <section className="checkout-card checkout-form-card">
        <h2>Delivery Details</h2>
        <p className="checkout-subtitle">
          Where should we deliver your order?
        </p>

        <form onSubmit={placeOrder}>
          <div className="checkout-field">
            <label htmlFor="customerName">Full Name</label>
            <input
              id="customerName"
              type="text"
              placeholder="Enter your full name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              autoComplete="name"
              maxLength={80}
              required
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="phone">Mobile Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
              title="Enter a 10-digit mobile number"
              autoComplete="tel"
              maxLength={10}
              required
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              placeholder="House number, street, city, PIN code"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
              rows={4}
              maxLength={500}
              required
            />
          </div>

          <div className="checkout-payment">
            <span className="payment-icon">💵</span>
            <div>
              <strong>Cash on Delivery</strong>
              <p>Pay when your order arrives.</p>
            </div>
            <span className="payment-check">✓</span>
          </div>

          {error && (
            <p className="checkout-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="checkout-primary-btn place-order-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : `Place Order • ₹${totalAmount}`}
          </button>

          <p className="checkout-secure-note">
            🔒 Your delivery details are required to process your order.
          </p>
        </form>
      </section>

      <aside className="checkout-card checkout-summary">
        <h2>Order Summary</h2>
        <p className="checkout-subtitle">
          {cart.length} item type(s) in your cart
        </p>

        <div className="checkout-items">
          {cart.map((item, index) => {
            const quantity = Number(item.quantity || 1);
            const price = Number(item.price) || 0;

            return (
              <div
                className="checkout-item"
                key={item._id || index}
              >
                <div className="checkout-item-info">
                  <h3>{item.name || "Food Item"}</h3>
                  <p>₹{price.toFixed(2)} × {quantity}</p>
                </div>

                <strong>
                  ₹{(price * quantity).toFixed(2)}
                </strong>
              </div>
            );
          })}
        </div>

        <div className="checkout-total-row">
          <span>Subtotal</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <div className="checkout-total-row">
          <span>Delivery Fee</span>
          <span className="delivery-free">FREE</span>
        </div>

        <div className="checkout-grand-total">
          <span>Total Amount</span>
          <strong>₹{totalAmount.toFixed(2)}</strong>
        </div>

        <div className="checkout-help">
          <span>🍽️</span>
          <p>Fresh food, prepared with care and delivered to you.</p>
        </div>

        <button
          className="checkout-back-btn"
          onClick={() => navigate("/cart")}
        >
          ← Back to Cart
        </button>
      </aside>
    </div>
  )}
</div>

);
}

export default Checkout;
