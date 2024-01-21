// ShoppingBag.jsx
import React from "react";
import "./ShoppingBag.scss";
import { useCarrito } from "../CarritoContext";
import { ToastContainer, toast } from 'react-toastify';


const ShoppingBag = () => {
  const { carrito, removeFromCarrito, incrementQuantity, decrementQuantity, clearCarrito, calcularTotal } = useCarrito();

  const handleRemoveFromCarrito = (productId) => {
    removeFromCarrito(productId);
  };

  const handleIncrementQuantity = (productId) => {
    incrementQuantity(productId);
  };

  const handleDecrementQuantity = (productId) => {
    decrementQuantity(productId);
  };

  const handleClearCarrito = () => {
    clearCarrito();
  };

  const handleCompra = () => {
    // Agrega la lógica para realizar la compra (llamar a la API, etc.)
    console.log("Compra realizada. Total: $" + calcularTotal());
    toast.success('¡Compra realizada con éxito!');
    setTimeout(() => {
      clearCarrito();
      console.log("Carrito limpiado después de la compra");
    }, 3000);
  };

  return (
    <div className="container-fluid">
      <h2 className="carrito-title">CARRITO DE COMPRAS</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {carrito.map((producto) => (
            <div key={producto.id} className="cart-item ">
              <div className="row">
                <div className="col-6">
                  <img src={producto.thumbnails} alt={producto.title} className="img-fluid w-50" />
                </div>
                <div className="col-6">
                  <p className="carrito-text">{producto.title}</p>
                  <p className="carrito-text">Precio: ${producto.price}</p>
                  <p className="carrito-text">Cantidad: {producto.quantity}</p>
                  <button onClick={() => handleIncrementQuantity(producto.id)}>+</button>
                  <button onClick={() => handleDecrementQuantity(producto.id)}>-</button>
                  <button onClick={() => handleRemoveFromCarrito(producto.id)}>Eliminar</button>
                </div>
              </div>
            </div>
      ))}
          <div className="cart-total">
            <p>Total del carrito de compras: ${calcularTotal()}</p>
          </div>

          <div className="cart-actions">
            <button onClick={handleClearCarrito}>Vaciar Carrito</button>
            <button onClick={handleCompra}>Realizar Compra</button>
          </div>
          <ToastContainer/>
        </div>
      )}
    </div>
  );
};

export default ShoppingBag;
