import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      // Validar que las contraseñas sean iguales
      if (newPassword !== confirmPassword) {
        console.error("Las contraseñas no coinciden");
        return;
      }

      const response = await fetch(
        `https://backend-coderhouse-ncbs.onrender.com/api/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ newPassword, confirmPassword }),
        }
      );

      if (response.status === 200) {
        // Restablecimiento exitoso, puedes redirigir a la página de inicio de sesión u otra página
        navigate("/confirm-password-change"); // Ajusta la ruta según tus necesidades
      } else {
        // Manejar otros casos de error, por ejemplo, mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <input
        type="password"
        placeholder="Nueva Contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Restablecer Contraseña</button>
    </div>
  );
};

export default ResetPasswordPage;
