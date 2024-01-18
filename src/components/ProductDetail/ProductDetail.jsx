import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import { useCart } from "../CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cid, setCid] = useState("");

  const {addToCart, cart} = useCart();


  useEffect(() => {
    fetch(`https://backend-coderhouse-ncbs.onrender.com/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, [id]);

  const handleAddToCart = async () => {
    try {
      // Llamar a la función addToCart del contexto del carrito
      addToCart(product);
  
      // Puedes mostrar un mensaje de éxito o actualizar la interfaz de usuario aquí
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  
    try {
      // Obtener el id del carrito directamente del contexto
      const response = await fetch(`https://backend-coderhouse-ncbs.onrender.com/api/carts/${cart.id}/products/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: 1, // O la cantidad que desees agregar
        }),
      });
  
      if (response.status === 200) {
        // Actualizar la interfaz de usuario o mostrar un mensaje de éxito
      } else {
        // Manejar errores, por ejemplo, producto no disponible
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };


  return (
    <section className="productdetail">
      <div className="card mb-3 " /* style="max-width: 540px;" */>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product.thumbnails && product.thumbnails[0]}
              className="img-fluid rounded-start"
              alt={product.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Precio: ${product.price}</p>
              <p className="card-text">Precio: ${product.stock}</p>
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
    </section>
  );
};

export default ProductDetail;
