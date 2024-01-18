import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Products = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://backend-coderhouse-ncbs.onrender.com/api/products")
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
