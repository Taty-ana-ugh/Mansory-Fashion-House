import Navbar from "./Navbar";

const AboutUs = () => {
    return (
        <div className="row">
            <Navbar/>
            <br /><br />
            <div className="col-md-12">
                <div className="card shadow">
                    <h1>About us</h1>
                    <p>With a holistic approach, we are working at each and every stage of our value chain, from how we design our products, choose the materials and produce the garments, all the way to logistics, and the design and management of our warehouses and stores. We are helping to extend the life of garments through repair, resale and used clothing donation programmes. Meeting our sustainability goals presents a challenge that demands close collaboration at every level, including our supply chain partners, environmental experts, international organisations, trade unions and NGOs. Our aim is to foster genuine change within the industry for a more circular future. While we may not be perfect, we are dedicated to continuous improvement every day, and that will not change.</p>
                </div>
                <br /><br />
                <div className="card shadow">
                    <h3>Commitments</h3>
                    <p>Our commitment to people is at the heart of our decisions, from our teams, customers and suppliers, to the communities in which we operate. Our socially responsible strategy aims to guarantee work environments in which human and labour rights are respected and promoted, developing programmes to identify workers needs and their environment.</p>
                </div>
            </div>
        </div>
    );
}
 
export default AboutUs;