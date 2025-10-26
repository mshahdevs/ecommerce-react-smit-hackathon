import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Form, Alert } from "react-bootstrap";
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
    dispatch(addToCart(product));
  };

  const filteredProducts = products.filter((p) => {
    if (Number(maxPrice) === 0) {
      return p.price === 0;
    }
    return p.price <= maxPrice;
  });

  return (
    <Container className='mt-4'>
      <h1 className='mb-4 text-center'>🛍️ Latest Products</h1>

      {/* Price Filter */}
      <Form.Group className='mb-4'>
        <Form.Label>
          Filter by Price: <strong>${maxPrice}</strong>
        </Form.Label>
        <Form.Range
          min={0}
          max={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Form.Group>

      {status === "loading" ? (
        <Loader />
      ) : status === "failed" ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col
                key={product.id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className='mb-4'
              >
                <ProductCard
                  product={product}
                  onAdd={() => handleAddToCart(product)}
                />
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant='warning' className='text-center'>
                No products found for this price range.
              </Alert>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Home;
