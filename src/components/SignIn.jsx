import axios from "axios";
import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";

const SignIn = () => {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState("");
    let [success, setSuccess] = useState("");
    let [error, setError] = useState("");

    const navigate = useNavigate();
     
    const submitForm = async (e) => {
    e.preventDefault();
    
    try {
        setError("");
        setSuccess("");
        setLoading("Please wait...");
        
        const data = new FormData()
        data.append("username", username);
        data.append("password", password);
        
        const response = await axios.post("https://taty4na.pythonanywhere.com/api/signin", data);
        
        if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/")
        } else {
            setLoading("");
            setError(response.data.message);
        }
        
        } catch (error) {
            setLoading("");
            setError("Something went wrong");  
        }
    };

    const togglePassword = () => {
        const passwordInput = document.getElementById("password");
        const icon = document.getElementById("icon");
        
        let current_type = passwordInput.getAttribute("type");
        let new_type = "";
        if (current_type === "password") {
            new_type = "text";
            icon.classList.remove("bi-eye-fill");
            icon.classList.add("bi-eye-slash-fill");

        } else {
            new_type = "password"
            icon.classList.add("bi-eye-fill");
            icon.classList.remove("bi-eye-slash-fill");
        }
        passwordInput.setAttribute("type", new_type);
    }

    return (
        <div className="row justify-content-center mt-4">
        <div className="col-md-6 card shadow p-4">
            <h2>Sign In</h2>
            <b className="text-success">{success}</b>
            <b className="text-warning">{loading}</b>
            <b className="text-danger">{error}</b>
           
            <form onSubmit={submitForm}>
                <input 
                type="text" 
                placeholder="Enter Username" 
                className="form-control" 
                onChange={(e) => setUsername(e.target.value)} 
                required/>
                <br />

               <div className="input-group">
               <input 
                type="password" 
                placeholder="Enter Password" 
                id="password"
                className="form-control" 
                onChange={(e) => setPassword(e.target.value)} 
                required/>
                <span className="input-group-text" onClick={togglePassword}>
                    <i id="icon" class="bi bi-eye-fill"></i>
                </span>
               </div>
                <br />
                <button className="btn btn-primary" type="submit">Sign In</button>
            </form>

            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
       </div>
    )
}

export default SignIn