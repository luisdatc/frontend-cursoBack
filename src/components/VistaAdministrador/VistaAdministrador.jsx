// Importa useEffect y useMemo de React
import React, { useState, useEffect, useMemo } from "react";

const VistaAdministrador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener la lista de usuarios
    fetch("https://backend-coderhouse-ncbs.onrender.com/api/users")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
            console.log(data)
          setUsuarios(data.data);
        } else {
          const usuariosArray = Object.values(data);
          setUsuarios(usuariosArray);
        }
      })
      .catch(error => console.error("Error al obtener usuarios:", error));
  }, []);

  const handleEliminarUsuario = async (id) => {
    try {
      const response = await fetch(`https://backend-coderhouse-ncbs.onrender.com/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Usuario eliminado con éxito");
        setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario._id !== id));
        setUsuarioSeleccionado(null);
      } else {
        throw new Error(`Error al eliminar usuario: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

return (
  <div>
    <h2>Administrar Usuarios</h2>
    <ul>
      {usuarios.map(usuario => (
        <li key={usuario._id}>
          <span>{usuario.first_name} {usuario.last_name}</span>
          <button onClick={() => setUsuarioSeleccionado(usuario)}>Ver Detalles</button>
          <button onClick={() => handleEliminarUsuario(usuario._id)}>Eliminar Usuario</button>
        </li>
      ))}
    </ul>

    {usuarioSeleccionado && (
      <div>
        <h3>Detalles del Usuario</h3>
        <p>ID: {usuarioSeleccionado._id}</p>
        <p>Nombre: {usuarioSeleccionado.first_name} {usuarioSeleccionado.last_name}</p>
        {/* Otros detalles del usuario */}
      </div>
    )}
  </div>
);
};

export default VistaAdministrador;
