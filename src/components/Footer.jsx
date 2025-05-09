const Footer = () => {
    return (
        <div className="">
            <section className="row bg-purple p-4">
                <div className="col-md-6">
                    <h4 className="text-center text-light">Contact Us</h4>
                    <form action="">
                        <input type="email" placeholder="Enter your email" className="form-control" />
                        <br />
                        <textarea placeholder="Leave a comment" rows="7" className="form-control"></textarea>
                        <br />
                        <input type="submit" value="Send message" className="btn btn-outline-light text-dark bg-light" />
                    </form>
                </div>

                <div className="col-md-6">
                    <h4 className="text-center text-light">Stay Connected</h4>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                        <img src="images/x.png" alt="" />
                        <p className="text-light">@MansoryFashionHouse</p>
                    </a>
                    <br />
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="images/fb.png" alt="" />
                        <p className="text-light">@MansoryFashionHouse</p>
                    </a>
                    <br />
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="images/in.png" alt="" />
                        <p className="text-light">@MansoryFashionHouse</p>
                    </a>
                </div>
            </section>

            {/* Updated footer style */}
            <footer className="footer-purple text-white text-center p-2">
                <h5>Developed by Tatyana.W.K &copy; 2025. All rights reserved</h5>
            </footer>
        </div>
    );
};

export default Footer;