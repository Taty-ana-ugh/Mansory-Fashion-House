import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ theme, toggleTheme}) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");  // Redirects the user after logout
  };

  return (
    <section className="mx-4">   
      <div className="col-md-12">
        <div className="navbar navbar-expand-md navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Mansory Fashion House
            <img src="images/mylogo.png" alt="Logo" width="25px" height="25px" />
          </Link>

          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
          </button>

          <button className="navbar-toggler" data-bs-target="#prada" data-bs-toggle="collapse">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="prada">
            <div className="navbar-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/addproduct" className="nav-link">Add Product</Link>
              <Link to="/aboutus" className="nav-link">About Us</Link>
              {/* Added Cart and Contact Us links */}
              <Link to="/contactus" className="nav-link">Contact Us</Link>
              <Link to="/cart" className="fa fa-shopping-cart">Cart</Link>
            </div>

            <div className="navbar-nav ms-auto">
              {user ? (
                <>
                  <b className="text-success nav-link">Hello {user.username}</b>
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="nav-link">Login</Link>
                  <Link to="/signup" className="nav-link">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
