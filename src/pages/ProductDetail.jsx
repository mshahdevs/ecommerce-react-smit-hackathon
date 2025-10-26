import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { fetchProductById } from "../features/products/productSlice";
import ToastMessage from "../components/ToastMessage.jsx";

const ProductDetail = () => {
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    productDetail: product,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
    setShowToast(true);
  };

  if (status === "loading") return <Loader />;
  if (status === "failed") return <Message variant='danger'>{error}</Message>;
  if (!product) return null;

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating.rate}
                text={`${product.rating.count} reviews`}
                color='#f8e825'
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.rating.count > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.rating.count > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.rating.count).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={product.rating.count === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message='Product added to cart!'
      />
    </>
  );
};

export default ProductDetail;
