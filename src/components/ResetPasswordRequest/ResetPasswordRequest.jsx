// ResetPasswordRequest.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRequestPasswordReset = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/reset-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Solicitud enviada con éxito, redirigir al usuario al mensaje de confirmación
        navigate("/reset-password-confirm");
      } else {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error(
          "Error en la solicitud de restablecimiento de contraseña:",
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        "Error en la solicitud de restablecimiento de contraseña:",
        error
      );
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <p>Ingresa tu correo electrónico para restablecer la contraseña.</p>
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRequestPasswordReset}>
        Solicitar Restablecimiento
      </button>
    </div>
  );
};

export default ResetPasswordRequest;
