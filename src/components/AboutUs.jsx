import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <section className="container text-center py-5">
        <h2 className="text-uppercase fw-bold">About Us</h2>
        <p className="lead text-dark">
          Welcome to Mansory Fashion House—where elegance and innovation converge in every stitch.
        </p>

        <div className="mt-4 text-start">
          <h3 className="fw-bold">Our Mission</h3>
          <p>
            Fashion is more than clothing—it’s a statement. At <strong>Mansory Fashion House</strong>, 
            we craft timeless pieces that empower individuals to express confidence, sophistication, 
            and authenticity. Our designs reflect a harmony of tradition and modern artistry, ensuring 
            every outfit tells a story.
          </p>

          <h3 className="fw-bold mt-3">Our Commitment</h3>
          <p>
            We uphold excellence by focusing on:
          </p>
          <ul className="list-unstyled">
            <li>✨ Masterful craftsmanship and premium materials</li>
            <li>🌍 Ethical and sustainable production practices</li>
            <li>🎨 Bold, trendsetting designs with global influences</li>
            <li>💖 A customer-first philosophy, ensuring quality and satisfaction</li>
          </ul>

          <h3 className="fw-bold mt-3">Be Part of Our Journey</h3>
          <p>
            Whether you seek everyday sophistication or statement pieces that redefine fashion, 
            Mansory Fashion House is your destination for artistry in style. Join us in celebrating 
            individuality, culture, and creativity—because fashion should never be ordinary.
          </p>

          <div className="text-center mt-4">
            <Link to="/" className="btn btn-dark btn-lg">
              Discover Our Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;