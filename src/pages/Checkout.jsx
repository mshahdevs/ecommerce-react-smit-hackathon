// src/pages/Checkout.jsx
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  // Calculate total
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <Row className="mt-4">
      <Col md={6}>
        <h2>Shipping Information</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ZIP Code</Form.Label>
            <Form.Control
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="btn-block">
            Place Order
          </Button>
        </Form>
      </Col>

      <Col md={6}>
        <h2>Order Summary</h2>
        <ListGroup variant="flush">
          {cartItems.map((item) => (
            <ListGroup.Item key={item.product}>
              {item.title} x {item.qty} = ${(item.qty * item.price).toFixed(2)}
            </ListGroup.Item>
          ))}
          <ListGroup.Item>
            <strong>Total: ${totalPrice}</strong>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default Checkout;
