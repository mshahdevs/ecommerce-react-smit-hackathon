import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { Button, Form, ListGroup, Col, Row, Card } from "react-bootstrap";
import Message from "../components/Message";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zip
    ) {
      setMessage("Please fill all fields.");
      return;
    }
    setMessage("Order placed successfully!");
    dispatch(clearCart());
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Order Summary</h1>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        height: "100px",
                        objectFit: "contain",
                        borderRadius: "10px",
                        backgroundColor: "#f8f8f8",
                      }}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <a href={`/product/${item.product}`}>{item.title}</a>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>{item.qty}</Col>
                  <Col md={2}>${(item.qty * item.price).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h3>
                Total: $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h3>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <h2>Shipping Information</h2>
            {message && <Message>{message}</Message>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="zip">
                <Form.Label>ZIP Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your ZIP code"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Place Order
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Checkout;
