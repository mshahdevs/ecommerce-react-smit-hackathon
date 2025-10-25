import { Col, Container, Row } from "react-bootstrap";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col xs={12} md={4} className="text-center text-md-left mb-3 mb-md-0">
            <h5>About ShahShop</h5>
            <p>Your one-stop shop for the latest trends and best deals.</p>
          </Col>
          <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
            <h5>Follow Us</h5>
            <div>
              <a
                href="https://linkedin.com/in/mshahdevs"
                className="text-white mx-2"
              >
                <BsLinkedin size={30} />
              </a>
              <a
                href="https://github.com/mshahdevs"
                className="text-white mx-2"
              >
                <BsGithub size={30} />
              </a>
              <a
                href="https://instagram.com/mshahdevs"
                className="text-white mx-2"
              >
                <BsInstagram size={30} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; 2025 ShahShop. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
