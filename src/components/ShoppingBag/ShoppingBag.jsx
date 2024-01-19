import React, { useContext, useEffect, useState } from "react";
import "./ShoppingBag.scss";
import { useNavigate, useParams } from "react-router-dom";
import { CartProvider } from "../CartContext";

const ShoppingBag = () => {

  const { cart, cartId, setCartId, setCart, fetchCart, getTotal} = useContext(CartProvider)

  const navigate = useNavigate()

  const createTicket = async()=>{
    const idCart = localStorage.getItem("cartId")
    const userEmail = localStorage.getItem("userEmail")

    const response = await fetch(`https://backend-coderhouse-ncbs.onrender.com/api/carts/${idCart}/purchase`, {
      method: "GET", 
      headers: {
        "content-type": "application/json",
        "user-email": userEmail,
      }
    })
    if(response.status === 200){
      navigate("/")
    }
  }

  useEffect(() => {
    const idCart = localStorage.getItem("cartId");
    const fetchCart = async () => {
      try {
        const response = await fetch(`https://backend-coderhouse-ncbs.onrender.com/api/carts/${idCart}`);
        if (!response.ok) {
          throw new Error("Error al obtener el carrito con FETCH");
        }

        const data = await response.json();
        const cartData = data.payload.products;
        setCartId(idCart);
        setCart(cartData);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    fetchCart();
  }, [cartId, setCartId, setCart]);


  const removeProductFromCart = async (productId) => {
    try {
      const response = await fetch(
        `https://backend-coderhouse-ncbs.onrender.com/api/carts/${cartId}/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Actualizar el carrito después de eliminar el producto
        fetchCart(cartId);
      } else {
        console.error("Error al eliminar el producto del carrito.");
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
    }
  };

  return (
    <div>
      <h2>Shopping Bag</h2>
      {cart &&
        cart.map((product) => (
          <div key={product.id_prod._id}>
            <p>{product.id_prod && product.id_prod.title}</p>
            <p>Cantidad: {product.quantity}</p>
            <button onClick={() => removeProductFromCart(product.id_prod._id)}>
              Eliminar del Carrito
            </button>
          </div>
        ))}
      <p>Total: ${getTotal()}</p>
    </div>
  );
};


export default ShoppingBag;
