import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

const GetProduct = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(8); // Start with 8 products
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const img_url = "https://taty4na.pythonanywhere.com/static/images/";
    const navigate = useNavigate();

    // Function to fetch products from API
    const getProduct = async () => {
        setError("");
        setLoading("Please wait, receiving the products...");
        try {
            const response = await axios.get("https://taty4na.pythonanywhere.com/api/getproducts");
            console.log(response)
            setLoading("");
            setProducts(response.data);
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Load More Function
    const loadMore = () => {
        setVisibleProducts((prev) => prev + 8); // Load 8 more products
    };

    return (
        <div className="container-fluid">
            {/* <Navbar /> */}
            <Carousel />
            <ChatBot />

            <br /><br />

            {/* Search bar */}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Search for a product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <br />

            {/* Display products */}
            <div className="row">
                <h3 className="text-center mb-2">Available Products</h3>
                <b className="text-danger">{error}</b>
                <b className="text-warning">{loading}</b>
                <br /><br />

                {filteredProducts.slice(0, visibleProducts).map((product) => (
                    <div key={product.id} className="col-md-3 mb-4">
                        <div className="card shadow">
                            <img src={img_url + product.product_photos[0]} alt={product.product_name} className="product_img mt-4" />
                            <div className="card-body">
                                <h5>{product.product_name}</h5>
                                <p className="text-muted">
                                    {product.product_desc.slice(0, 15)}{product.product_desc.length > 15 ? "..." : ""}
                                </p>
                                <b className="text-warning">Ksh {product.product_cost}</b>
                                <br /><br />
                                <button 
                                    className="btn btn-dark w-100" 
                                    onClick={() => navigate("/singleproduct", { state: { product } })}
                                >
                                    View Product
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleProducts < filteredProducts.length && (
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={loadMore}>Load More...</button>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default GetProduct;