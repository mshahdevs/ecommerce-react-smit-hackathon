import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  // Redux se cartItems aur totalQuantity fetch kar rahe hain
  const { cartItems, totalQuantity } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar expand="lg" className="bg-dark" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ShahShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Home */}
              <LinkContainer to="/">
                <Nav.Link>
                  <i className="fas fa-home me-1" />
                  Home
                </Nav.Link>
              </LinkContainer>

              {/* Cart */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart me-1" />
                  Cart{" "}
                  {totalQuantity > 0 && (
                    <Badge bg="success" pill>
                      {totalQuantity}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {/* Checkout */}
              <LinkContainer to="/checkout">
                <Nav.Link>
                  <i className="fas fa-credit-card me-1" />
                  Checkout
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
