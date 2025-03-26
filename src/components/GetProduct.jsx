import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Navbar from "./Navbar";
import Footer from "./Footer";

const GetProduct = () => {

    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [searchTerm, setSearchTerm] = useState("");

    const img_url = "https://taty4na.pythonanywhere.com/static/images/"

    const navigate = useNavigate();

    // Function to fetch products from api
    const getProduct = async () => {
        setError("")
        setLoading("Please wait, receiving the products...")
        try {
            const response = await axios.get("https://taty4na.pythonanywhere.com/api/getproducts")
            console.log(response.data)
            setLoading("")
            setProducts(response.data)
        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    // Filter products -  returns elements in an array that meet certain conditions
    const filteredProducts = products.filter(product => {
        return product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        
    })

    return ( 
        <div className="container-fluid">
             {/* mount navbar component */}
             <Navbar/>
            {/* mount carousel component */}
            <Carousel/>
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
            <br />
        <div className="row">
            <h3 className="text-center mb-2">Available Products</h3>
            <b className="text-danger">{error}</b>
            <b className="text-warning">{loading}</b>
            <br /><br />
            {filteredProducts.map((product) => (
            <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow">
                    <img src={img_url + product.product_photo} alt={product.product_name} className="product_img mt-4" />
                    <div className="card-body">
                        <h5 className="mt-2">{product.product_name} </h5>
                        <p className="text-muted">{product.product_desc.slice(0, 15)}{product.product_desc.length > 15 ? "..." : ""}</p>
                        <b className="text-warning">Ksh  {product.product_cost}</b>
                        <br /><br />
                        <button className="btn btn-dark w-100" onClick={()=>navigate("/singleproduct", {state: {product}})}>View Product</button>
                    </div>
                </div>
            </div>              
            ))}   
        </div>
        <Footer/>
        </div>
             );
}
 
export default GetProduct;