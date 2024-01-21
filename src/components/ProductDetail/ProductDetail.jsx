// ProductDetail.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import { useCarrito } from "../CarritoContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCarrito } = useCarrito();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://backend-coderhouse-ncbs.onrender.com/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  const handleAddToCart = () => {
    // Verifica si el producto tiene un ID válido antes de agregarlo al carrito
    if (product && (product.id || product._id)) {
      // Usa el campo correcto del servidor para obtener el ID del producto
      const productId = product.id || product._id;

      // Crea un objeto que representa el producto con la cantidad seleccionada
      const productToAdd = {
        id: productId,
        title: product.title,
        price: product.price,
        quantity: quantity,
        thumbnails: product.thumbnails,
      };

      // Llama a la función addToCarrito del contexto para agregar el producto al carrito
      addToCarrito(productToAdd);

      // Puedes agregar lógica adicional, como mostrar una notificación de éxito
      console.log('Producto agregado al carrito:', productToAdd);
    } else {
      console.error("El producto no tiene un ID válido");
    }
  };

  return (
    <section className="productdetail">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={product.thumbnails && product.thumbnails[0]} alt={product.title} className="img-fluid rounded-start" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Precio: ${product.price}</p>
              <p className="card-text">Precio: ${product.stock}</p>
            <div className="quantity-container">
          <label>Cantidad:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          />
          <button className="CartBoton mx-auto" onClick={handleAddToCart}>
                <span className="IconContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    fill="rgb(17, 17, 17)"
                    className="cart"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                  </svg>
                </span>
                <p className="texto">Add to Cart</p>
              </button>
        </div>
        </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default ProductDetail;
