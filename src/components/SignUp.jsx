import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(null);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            setError(null);
            setSuccess(null);
            setLoading("Please wait...");

            const data = new FormData();
            data.append("username", username);
            data.append("password", password);

            const response = await axios.post("https://taty4na.pythonanywhere.com/api/signup", data);

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setLoading(null);
                setSuccess("Signup successful! Redirecting...");
                setTimeout(() => navigate("/"), 2000);
            } else {
                setLoading(null);
                setError(response.data.message);
            }
        } catch (error) {
            setLoading(null);
            setError("Something went wrong");
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Sign Up</h2>
                <b className="text-success">{success}</b>
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>

                <form onSubmit={submitForm}>
                    <input 
                        type="text" 
                        placeholder="Enter Username" 
                        className="form-control" 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <br />

                    <div className="input-group">
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            placeholder="Enter Password" 
                            className="form-control" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <br />

                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>

                <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            </div>
        </div>
    );
};

export default SignUp;