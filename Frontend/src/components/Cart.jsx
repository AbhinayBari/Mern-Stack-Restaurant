
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      return Array.isArray(savedCart) ? savedCart : [];
    } catch {
      return [];
    }
  });

  // Sync cart updates
  useEffect(() => {
    const updateCart = () => {
      try {
        const savedCart = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        setCart(Array.isArray(savedCart) ? savedCart : []);
      } catch {
        setCart([]);
      }
    };

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  // Save updated cart
  const saveCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase or decrease quantity
  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item._id !== id) {
        return item;
      }

      const quantity = Math.max(
        1,
        Number(item.quantity) || 1
      );

      return {
        ...item,
        quantity: quantity + change,
      };
    });

    saveCart(updatedCart);
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    saveCart(updatedCart);
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Math.max(
      1,
      Number(item.quantity) || 1
    );

    return total + price * quantity;
  }, 0);

  // Navigate to checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h1>My Cart 🛒</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>

          <button
            type="button"
            className="Menu-btn"
            onClick={() => navigate("/menu")}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => {
              const price = Number(item.price) || 0;
              const quantity = Math.max(
                1,
                Number(item.quantity) || 1
              );

              return (
                <div
                  className="cart-item"
                  key={item._id}
                >
                  <img
                    src={item.image}
                    alt={item.name || "Food item"}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="cart-item-info">
                    <h3>{item.name || "Food Item"}</h3>

                    <p>
                      Price: ₹{price.toFixed(2)}
                    </p>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item._id, -1)
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item._id, 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <p>
                      Subtotal: ₹
                      {(price * quantity).toFixed(2)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2>
              Total: ₹{totalPrice.toFixed(2)}
            </h2>

            <button
              type="button"
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
