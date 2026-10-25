import { useEffect, useState } from "react";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mern-stack-restaurant-finj.onrender.com/api/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        return response.json();
      })
      .then((data) => {
        setFoods(data.menuItems || []);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addToCart = (food) => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingFood = cart.find(
      (item) => item._id === food._id
    );

    let updatedCart;

    if (existingFood) {
      updatedCart = cart.map((item) =>
        item._id === food._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        { ...food, quantity: 1 },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${food.name} added to cart! 🛒`);
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = (food.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      (food.category || "").toLowerCase() ===
        category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="menu-section" id="menu">
      <p className="menu-subtitle">OUR MENU</p>
      <h2>Popular Dishes</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="category-filters">
        {["All", "Pizza", "Burger", "Main Course", "Sweet Dish"].map(
          (item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          )
        )}
      </div>

      {loading ? (
        <p>Loading menu...</p>
      ) : (
        <div className="food-container">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div className="food-card" key={food._id}>
                <img src={food.image} alt={food.name} />

                <div className="food-info">
                  <h3>{food.name}</h3>
                  <p>₹{food.price}</p>

                  <button
                    type="button"
                    onClick={() => addToCart(food)}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-food">No food found 😔</p>
          )}
        </div>
      )}
    </section>
  );
}

export default Menu;