// CartContext.js

import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [] });

  useEffect(() => {
    // Recuperar el carrito desde el almacenamiento local al cargar la página
    const storedCart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
    setCart(storedCart);
  }, []);

  useEffect(() => {
    // Actualizar el almacenamiento local cuando el carrito cambie
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    // Lógica para agregar productos al carrito
    // Asegúrate de manejar las actualizaciones correctamente

    setCart((prevCart) => {
      // Evitar agregar duplicados, puedes ajustar esto según tu lógica
      if (!prevCart.products.find((p) => p.id_prod._id === product.id_prod._id)) {
        return {
          ...prevCart,
          products: [...prevCart.products, { ...product, quantity: 1 }],
        };
      }
      return prevCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    // Lógica para actualizar la cantidad de un producto en el carrito
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.map((product) =>
        product.id_prod._id === productId ? { ...product, quantity } : product
      ),
    }));
  };

  const removeFromCart = (productId) => {
    // Lógica para eliminar un producto del carrito
    setCart((prevCart) => ({
      ...prevCart,
      products: prevCart.products.filter((product) => product.id_prod._id !== productId),
    }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
