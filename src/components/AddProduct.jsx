import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";

const AddProduct = () => {

    let [product_name, setProductName] = useState("");
    let [product_desc, setProductDesc] = useState("");
    let [product_cost, setProductCost] = useState("");
    let [product_photo, setProductPhoto] = useState("");

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            setError("")
            setSuccess("")
            setLoading("Please wait...") 

            const data = new FormData()
            data.append("product_name", product_name)
            data.append("product_desc", product_desc)
            data.append("product_cost", product_cost)
            data.append("product_photo", product_photo)

            const response = await axios.post('https://taty4na.pythonanywhere.com/api/addproduct', data)
            setLoading("")
            setSuccess(response.data.success)

            setProductName("")
            setProductDesc("")
            setProductCost("")
            setProductPhoto("")
            console.log(response.data)

        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }

    return ( 
      <div className="row justify-content-center mt-4">
            {/* <nav className="m-4">
                <Link className="btn btn-dark mx-2" to="/">Home</Link>
                <Link className="btn btn-dark mx-2" to="/addproduct">Add Product</Link>
                <Link className="btn btn-dark mx-2" to="/signin">Sign In</Link>
                <Link className="btn btn-dark mx-2" to="/signup">Sign Up</Link>
            </nav> */}
            <Navbar/>
        <div className="col-md-6 p-4">
            <h2>Add Product</h2>
            <b className="text-warning">{loading}</b>
            <b className="text-danger">{error}</b>
            <b className="text-success">{success}</b>
            <form onSubmit={submitForm}>
                <input 
                type="text" 
                placeholder= "Enter product name" 
                required 
                className="form-control" 
                onChange={(e) => setProductName(e.target.value)} 
                value ={product_name}/>  
                <br />

                <textarea 
                name="" 
                id="" 
                className="form-control" 
                placeholder= "Product Description"
                onChange={(e) => setProductDesc(e.target.value)} 
                value ={product_desc}>
                </textarea>
                <br />

                <input 
                type="number" 
                placeholder="Product Cost" 
                className="form-control" 
                required 
                onChange={(e) => setProductCost(e.target.value)} 
                value ={product_cost}/>
                <br />

                <p>Product Photo</p>
                <input 
                type="file" 
                className="form-control" 
                required 
                onChange={(e) => setProductPhoto(e.target.files[0])} />
                <br />

                <button className="btn btn-primary">Add Product</button>
            </form>
        </div>
      </div>
     );
}
 
export default AddProduct;