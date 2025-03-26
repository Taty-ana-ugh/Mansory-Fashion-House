import { Link } from "react-router-dom";

const Carousel = () => {
    return (
        <div>
        <section className="row">
        <div className="col-md-12">
            <div className="carousel slide" id="MyCarousel" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/slide7.png" alt="" className="d-block w-100" height="500px"/>
                        <div className="carousel-caption">
                            <h2 className="text-light">Hello</h2>
                            <p className="text-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, totam.</p>
                            <button className="btn btn-danger">Buy Now</button>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="images/summer.jpg" alt="" className="d-block w-100" height="500px"/>
                    </div>

                    <div className="carousel-item">
                        <img src="images/suit upper half.jpg" alt="" className="d-block w-100" height="500px"/>
                    </div>

                    <div className="carousel-item">
                        <img src="images/women casual on bed.jpg" alt="" className="d-block w-100" height="500px"/>
                    </div>
                </div>

                <Link to="#MyCarousel" 
                data-bs-slide="prev" className="carousel-control-prev">
                <span className="carousel-control-prev-icon"></span></Link>

                <Link to="#MyCarousel" 
                data-bs-slide="next" className="carousel-control-next">
                <span className="carousel-control-next-icon"></span></Link>
            </div>
        </div>
      </section>
        </div>
    );
}
 
export default Carousel;