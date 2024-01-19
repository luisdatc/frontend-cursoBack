import React, { useEffect, useState } from "react";
import "./ShoppingBag.scss";
import { useParams } from "react-router-dom";
import { useCart } from "../CartContext";

const ShoppingBag = () => {
  const { cid } = useParams();
  const { cart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`https://backend-coderhouse-ncbs.onrender.com/api/carts/${cid}`); 
        if (response.status === 200) {
          const data = await response.json();
          // Actualizar el carrito usando la función setCart del contexto
          updateCart(data.mensaje); // Ajusta según la estructura de la respuesta del backend
        } else {
          // Manejar errores, por ejemplo, carrito no encontrado
        }
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    fetchCart();
  }, [cid]);
  

  const getTotal = () => {
    // Calcular el total sumando los precios de cada producto
    return cart.products
      ? cart.products.reduce((total, product) => total + product.id_prod.price * product.quantity, 0)
      : 0;
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(`https://backend-coderhouse-ncbs.onrender.com/api/carts/${cid}/products/${productId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // Actualizar el estado local del carrito después de eliminar el producto
        setCarrito((prevCart) => ({
          ...prevCart,
          products: prevCart.products.filter((product) => product.id_prod._id !== productId),
        }));
      } else {
        // Manejar errores, por ejemplo, producto no encontrado
      }
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };

  const handleIncrementQuantity = async (productId) => {
    try {
      // Lógica para incrementar la cantidad en el carrito (actualmente en tu código)

      // Llamar a la función updateQuantity del contexto del carrito
      // con la nueva cantidad calculada
      updateQuantity(productId, newQuantity);

    } catch (error) {
      console.error("Error al incrementar cantidad en el carrito:", error);
    }
    try {
      // Realiza una solicitud PUT para incrementar la cantidad del producto en el carrito
      const response = await fetch(`https://backend-coderhouse-ncbs.onrender.com/api/carts/${cid}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: 1, // Puedes ajustar la cantidad según tus necesidades
        }),
      });

      if (response.status === 200) {
        // Actualizar el estado local del carrito después de incrementar la cantidad
        setCarrito((prevCart) => ({
          ...prevCart,
          products: prevCart.products.map((product) =>
            product.id_prod._id === productId
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        }));
      } else {
        // Manejar errores, por ejemplo, producto no encontrado
      }
    } catch (error) {
      console.error("Error al incrementar cantidad en el carrito:", error);
    }
  };

  const handleDecrementQuantity = async (productId) => {
    try {
      // Realiza una solicitud PUT para decrementar la cantidad del producto en el carrito
      const response = await fetch(`https://backend-coderhouse-ncbs.onrender.com/api/carts/${cid}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: -1, // Puedes ajustar la cantidad según tus necesidades
        }),
      });

      if (response.status === 200) {
        // Actualizar el estado local del carrito después de decrementar la cantidad
        setCarrito((prevCart) => ({
          ...prevCart,
          products: prevCart.products.map((product) =>
            product.id_prod._id === productId
              ? { ...product, quantity: Math.max(0, product.quantity - 1) }
              : product
          ),
        }));
      } else {
        // Manejar errores, por ejemplo, producto no encontrado
      }
    } catch (error) {
      console.error("Error al decrementar cantidad en el carrito:", error);
    }
  };

  return (
    <div>
      <h2>Shopping Bag</h2>
      {cart.products &&
        cart.products.map((product) => (
          <div key={product.id_prod._id}>
          <p>{product.id_prod && product.id_prod.title}</p>
            <p>Cantidad: {product.quantity}</p>
            <button onClick={() => handleIncrementQuantity(product.id_prod._id)}>
              Incrementar Cantidad
            </button>
            <button onClick={() => handleDecrementQuantity(product.id_prod._id)}>
              Decrementar Cantidad
            </button>
            <button onClick={() => handleRemoveFromCart(product.id_prod._id)}>
              Eliminar del Carrito
            </button>
          </div>
        ))}
      <p>Total: ${getTotal()}</p>
    </div>
  );
};


export default ShoppingBag;
