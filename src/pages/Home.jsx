import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Form, Alert } from "react-bootstrap";
import { fetchProducts } from "../features/products/productSlice.jsx";
import { addToCart } from "../features/cart/cartSlice.jsx";
import ProductCard from "../components/ProductCart.jsx";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ToastMessage from "../components/ToastMessage.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState("All");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // when products load, set the price slider max to the highest product price
  useEffect(() => {
    if (products && products.length > 0) {
      const highest = Math.ceil(
        Math.max(...products.map((p) => Number(p.price) || 0), 1000)
      );
      setMaxPrice(highest);
    }
  }, [products]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setShowToast(true);
  };

  const filteredProducts = products.filter((p) => {
    const pricePass = Number(maxPrice) === 0 ? Number(p.price) === 0 : Number(p.price) <= Number(maxPrice);
    const categoryPass = category === "All" ? true : p.category === category;
    return pricePass && categoryPass;
  });

  return (
    <Container className='mt-4'>
      <h1 className='mb-4 text-center'>🛍️ Latest Products</h1>

      {/* Price Filter */}
      {/* Category Filter */}
      <Form.Group className='mb-3'>
        <Form.Label>Filter by Category:</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {/* derive categories from products */}
          <option value='All'>All</option>
          {Array.from(new Set(products.map((p) => p.category))).map((cat) => (
            cat && (
              <option key={cat} value={cat}>
                {cat}
              </option>
            )
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className='mb-4'>
        <Form.Label>
          Filter by Price: <strong>${maxPrice}</strong>
        </Form.Label>
        <Form.Range
          min={0}
          max={Math.ceil(Math.max(...products.map((p) => Number(p.price) || 0), 1000))}
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
            filteredProducts.map((product, idx) => (
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
                  index={idx}
                />
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant='warning' className='text-center'>
                No products found for the selected filters.
              </Alert>
            </Col>
          )}
        </Row>
      )}

      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message='Product added to cart!'
      />
    </Container>
  );
};

export default Home;
