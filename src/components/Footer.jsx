import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="">
            <section className="row bg-dark p-4">
        <div className="col-md-6">
            <h4 className="text-center text-light">Contact Us</h4>
            <form action="">
                <input type="email" placeholder="Enter your email" className="form-control"/>
                <br/>
                <textarea placeholder="Leave a comment" rows="7" className="form-control"></textarea>
                <br/>
                <input type="submit" value="Send message" className="btn btn-outline-light text-dark bg-light"/>
            </form>
        </div>

        <div className="col-md-6">
            <h4 className="text-center text-light">Stay Connected</h4>
            <Link to="https://x.com">
                <img src="images/x.png" alt=""/>
                <p className="text-light">@MansoryFashionHouse</p>
            </Link>
            <br/>
            <Link to="https://facebook.com">
                <img src="images/fb.png" alt=""/>
                <p className="text-light">@MansoryFashionHouse</p>
            </Link>
            <br/>
            <Link to="https://instagram.com">
                <img src="images/in.png" alt=""/>
                <p className="text-light">@MansoryFashionHouse</p>
            </Link>
        </div>
    </section>
    
    <footer className="bg-dark text-white text-center p-2">
        <h5>Developed by Tatyana.W.K &copy; 2025. All rights reserved</h5>
    </footer>
        </div>
    );
}
 
export default Footer;