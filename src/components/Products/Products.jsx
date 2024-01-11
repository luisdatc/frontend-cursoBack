import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Products = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProductos(data.docs))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <Row>
        {productos.map((producto) => (
          <ProductCard key={producto._id} {...producto} />
        ))}
      </Row>
    </div>
  );
};

export default Products;
