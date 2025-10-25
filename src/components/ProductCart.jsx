// components/ProductCard.jsx
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product, onAdd }) => {
  return (
    <Card className="h-100">
      <Link to={`/product/${product.id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{
            height: "200px",
            objectFit: "contain",
            borderRadius: "10px",
            backgroundColor: "#f8f8f8",
          }}
        />
      </Link>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Rating
          value={product.rating.rate}
          text={`${product.rating.count} reviews`}
          color="#f8e825"
        />
        <Button className="mt-2" onClick={onAdd} variant="primary">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
