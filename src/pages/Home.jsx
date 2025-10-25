import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Form } from "react-bootstrap";
import { fetchProducts } from "../features/products/productSlice.jsx";
import { addToCart } from "../features/cart/cartSlice.jsx";
import ProductCard from "../components/ProductCart.jsx";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);
  const [maxPrice, setMaxPrice] = useState(1000);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    console.log("hanndnel  add  to  cart");
    dispatch(addToCart(product));
  };

  const filteredProducts = products.filter((p) => p.price <= maxPrice);

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">🛍️ Latest Products</h1>

      {/* Price Filter */}
      <Form.Group className="mb-4">
        <Form.Label>Filter by Price: ${maxPrice}</Form.Label>
        <Form.Range
          min={0}
          max={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Form.Group>

      {/* Loader / Error / Product Grid */}
      {status === "loading" ? (
        <Loader />
      ) : status === "failed" ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <ProductCard
                product={product}
                onAdd={() => handleAddToCart(product)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
