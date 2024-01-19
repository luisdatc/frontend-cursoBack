// CartContext.js

import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
 
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState();

  const fetchCart = async () => {
    try {
      const response = await fetch(`https://backend-coderhouse-ncbs.onrender.com/api/carts/${cartId}`);
      if (!response.ok) {
        throw new Error("Error al obtener el carrito con FETCH");
      }

      const data = await response.json();
      const cartData = data.payload.products || [];
      setCartId(cartId);
      setCart(cartData);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  const getTotal = () => {
    return cart.products
      ? cart.products.reduce((total, product) => total + product.id_prod.price * product.quantity, 0)
      : 0;
  };

  useEffect(() => {
    const hasCookie = document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("jwtCookie="));

    if (hasCookie && cartId) {
      fetchCart();
      localStorage.setItem("cartId", cartId);

      // Configurar un intervalo para llamar a fetchCart cada 5 minutos (puedes ajustar el tiempo según tus necesidades)
      const intervalId = setInterval(fetchCart, 5 * 1000);

      // Limpieza del intervalo al desmontar el componente
      return () => clearInterval(intervalId);
    }
  }, [cartId]);


  return (
    <CartContext.Provider value={{ cart, setCart, cartId, setCartId, fetchCart, getTotal}}>
      {children}
    </CartContext.Provider>
  );
};
