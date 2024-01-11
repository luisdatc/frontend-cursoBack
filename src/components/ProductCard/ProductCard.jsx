import React from "react";
import { Col } from "react-bootstrap";
import "./ProductCard.scss";
import { Link } from "react-router-dom";

const ProductCard = ({
  title,
  price,
  thumbnails,
  _id,
}) => {
  return (
    <Col sm={12} md={6} lg={6} xl={4}>
      <div className="card product-card m-1" /* style="width: 18rem" */>
        <Link to={`/productdetail/${_id}`} key={_id}>
          <img
            src={thumbnails[0]}
            className="card-img-top img-fluid"
            alt={title}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-center">${price}</p>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
