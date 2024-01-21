import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  // Intenta obtener el carrito desde localStorage al cargar la página
  const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const [carrito, setCarrito] = useState(storedCarrito);

  const addToCarrito = (producto) => {
    const updatedCarrito = [...carrito, producto];
    setCarrito(updatedCarrito);
  };

  const removeFromCarrito = (productId) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== productId));
  };

  const clearCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.price * producto.quantity, 0);
  };

  const incrementQuantity = (productId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === productId ? { ...producto, quantity: producto.quantity + 1 } : producto
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === productId
          ? { ...producto, quantity: Math.max(1, producto.quantity - 1) }
          : producto
      )
    );
  };

  useEffect(() => {
    // Guarda el carrito en localStorage cada vez que cambie
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        addToCarrito,
        removeFromCarrito,
        clearCarrito,
        calcularTotal,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};
