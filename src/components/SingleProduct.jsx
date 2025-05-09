import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SingleProduct = () => {
    const { product } = useLocation().state || {};
    const img_url = "https://taty4na.pythonanywhere.com/static/images/";

    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [cart, setCartState] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [products, setProducts] = useState([]);

    const setCart = (newCart) => {
        setCartState(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    useEffect(() => {
        fetchProducts();
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://taty4na.pythonanywhere.com/api/getproducts");
            setProducts(response.data);
        } catch (error) {
            setError("Failed to fetch products");
        }
    };

    const addToCart = (product) => {
        const exists = cart.find(p => p.product_id === product.product_id);
        if (exists) {
            setCart(cart.map(p =>
                p.product_id === product.product_id
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
            setSuccess("Product added to cart!");
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading("Please wait...Processing payment...");
        try {
            const data = new FormData();
            data.append("amount", product.product_cost);
            data.append("phone", phone);

            const response = await axios.post("https://taty4na.pythonanywhere.com/api/mpesa_payment", data);
            setLoading("");
            setSuccess(response.data.message);
        } catch (error) {
            setLoading("");
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\+254\d{9}$/.test(value)) {
            setPhone(value);
            setError(""); // Clear error if input is valid
        } else {
            setError("Invalid phone number. Please enter a valid M-Pesa number.");
        }
    };

    const formattedCost = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KES',
    }).format(product.product_cost);

    // **Image Handling Fix**
    // Ensure images exist before rendering
    // const images = product.product_photos.filter(img => img).map(img => img_url + img);
    const images = product.product_photos || [];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => setCurrentIndex((next) => (next + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="row justify-content-center mt-3">
            <nav className="m-4">
                <Link className="btn btn-dark mx-2" to="/">Home</Link>
                <Link className="btn btn-dark mx-2" to="/addproduct">Add Product</Link>
                <Link className="btn btn-dark mx-2" to="/signin">Sign In</Link>
                <Link className="btn btn-dark mx-2" to="/signup">Sign Up</Link>
            </nav>

            {/* Image Carousel with Updated Button Placement */}
                        <div className="col-md-3 card shadow text-center position-relative">
                {images.length > 0 ? (
                    <div className="image-container">
                        <button onClick={prevImage} className="arrow-btn left" aria-label="Previous">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <img src={img_url+ images[currentIndex]} alt={product.product_name} className="img-fluid rounded" />
                        <button onClick={nextImage} className="arrow-btn right" aria-label="Next">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                ) : (
                    <p>No images available</p>
                )}
            </div>


            <div className="col-md-3 card shadow">
                <h2>{product.product_name}</h2>
                <h3 className="text-warning">{formattedCost}</h3>
                <p className="text-muted">{product.product_desc}</p>

                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                <b className="text-success">{success}</b>

                <form onSubmit={submitForm}>
                    <input type="number" readOnly value={product.product_cost} className="form-control" />
                    <br />
                    <input
                        type="tel"
                        required
                        placeholder="Enter Mpesa No 254XXXXXXXXX"
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                    />
                    <br />
                    <button className="btn btn-primary" disabled={loading}>Pay Now</button>
                </form>

                {/* Add to Cart Button */}
                <button onClick={() => addToCart(product)} className="btn btn-success mt-3">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default SingleProduct;