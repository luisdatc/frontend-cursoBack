import React, { useEffect, useState } from "react";
import "./ShoppingBag.scss";
import { useParams } from "react-router-dom";

const ShoppingBag = () => {
  const [carrito, setCarrito] = useState({});
  const { cid } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/carts/`)
      .then((response) => response.json())
      .then((data) => {
        setCarrito(data);
        console.log(carrito);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, []);

  return <div>ShoppingBag</div>;
};

export default ShoppingBag;
