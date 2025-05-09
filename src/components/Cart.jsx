import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCartState] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [cartTotal, setCartTotal] = useState(0);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => {
      const cost = parseFloat(item.product_cost) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return sum + cost * quantity;
    }, 0);
    setCartTotal(total);
  };

  const setCart = (newCart) => {
    setCartState(newCart);
  };

  const removeFromCart = (productIdToRemove) => {
    setCart(cart.filter(item => item.product_id !== productIdToRemove));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(
      cart.map(item =>
        item.product_id === productId
          ? { ...item, quantity: newQuantity || 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading("Please wait...Processing payment...");

    const normalizedPhone = phone.replace(/\s+/g, "").replace(/^(\+?254|0)/, "254");

    if (!/^2547\d{8}$/.test(normalizedPhone)) {
      setError("Invalid Safaricom phone number.");
      setLoading("");
      return;
    }

    if (cartTotal <= 0) {
      setError("Cart is empty or total is invalid.");
      setLoading("");
      return;
    }

    try {
      const data = new FormData();
      data.append("amount", cartTotal); // Corrected for cart total payment
      data.append("phone", normalizedPhone);

      const response = await axios.post("https://taty4na.pythonanywhere.com/api/mpesa_payment", data);
      
      setLoading("");
      setSuccess(response.data.message);
      setCart([]);
      setCartTotal(0);
      setPhone("");
      navigate("/order-success");
    } catch (err) {
      setLoading("");
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-success">🛒 Your Cart</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty. Add some products!</p>
      ) : (
        <div className="row">
          {cart.map((item) => (
            <div key={item.product_id} className="col-md-3 mb-4 text-center">
              <div className="card shadow-sm">
                <img
                  src={`https://taty4na.pythonanywhere.com/static/images/${item.product_photos[0]}`}
                  alt={item.product_name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <h5>{item.product_name}</h5>
                    <p>{item.product_cat}</p>
                    <p>Price: Ksh {item.product_cost}</p>
                    <div>
                      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.product_id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value, 10))}
                      min="1"
                      className="form-control"
                      style={{ width: "60px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <form onSubmit={submitForm}>
          <div className="mt-4">
            <h4>Total: Ksh {cartTotal.toFixed(2)}</h4>
            <input
              type="tel"
              required
              placeholder="Enter Mpesa No 254XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control my-2"
            />
            <button className="btn btn-success w-100" type="submit" disabled={loading}>
              {loading ? loading : "Pay with M-Pesa"}
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
            {success && <p className="text-success mt-2">{success}</p>}
          </div>
        </form>
      )}
    </div>
  );
};

export default Cart;