import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.clear();
      navigate("/signin");
    };
  
    return (
        <section className="row-mx-6-px-4">
            <div className="col-md-12">
                <div className="navbar navbar-expand-md navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Mansory Fashion House
                        <img src="images/mylogo.png" alt="" width="25px" height="25px"/>
                    </Link>

                    <button className="navbar-toggler" data-bs-target="#prada" data-bs-toggle="collapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="prada">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/addproduct" className="nav-link">Add Product</Link>
                            <Link to="/aboutus" className="nav-link">About Us</Link>
                        </div>

                        <div className="navbar-nav ms-auto">
                            <Link to="#">
                                <img src="images/cart2.webp" alt="" width="25px" height="25px" className="center"/>
                            </Link>
                            <br/>
                        </div>

                        <div class="">
                        {user && (
                            <div className="navbar-nav ms-auto">
                            <b className="text-success nav-link">Hello {user.username}</b>
                            <button className="nav-link" onClick={handleLogout}>
                                Logout
                            </button>
                            </div>
                        )}

                        {!user && (
                            <div className="navbar-nav ms-auto">
                            <Link to="/signin" class="nav-link">
                                Login
                            </Link>
                            <Link to="/signup" class="nav-link">
                                Register
                            </Link>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
         </section>
    );
}
 
export default Navbar;