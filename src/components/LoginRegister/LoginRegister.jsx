import { useState, useRef, useContext } from "react";
import "./LoginRegister.scss";
import { Link, useNavigate } from "react-router-dom";
import { LogContext } from "../LogContext";

const LoginRegister = () => {
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [loginData, setLoginData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });

  // Función para alternar entre el formulario de inicio de sesión y registro
  const toggleForm = () => {
    setLoginFormVisible(!isLoginFormVisible);
  };
  const navigate = useNavigate();
  const { setIsLogeado } = useContext(LogContext);
  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(loginFormRef.current);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("https://backend-coderhouse-ncbs.onrender.com/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const datos = await response.json();
      setLoginData(datos); // Almacena los datos en el estado

      document.cookie = `jwtCookie=${datos.token}; expires=${new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ).toUTCString()};path=/;`;
      setIsLogeado(true);
       navigate("/"); 
    } else {
      console.log(response);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const formData = new FormData(registerFormRef.current);

    // Crear un objeto para almacenar solo los campos del formulario de registro
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      age: formData.get("age"),
      password: formData.get("password"),
    };

    console.log(data);

    const response = await fetch(
      "https://backend-coderhouse-ncbs.onrender.com/api/sessions/register",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response);

    registerFormRef.current.reset();
  };

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div
            className={`user_options-unregistered ${
              isLoginFormVisible ? "bounceLeft" : ""
            }`}
          >
            <h2 className="user_unregistered-title">
              No tienes una cuenta? Registrate!
            </h2>
            <p className="user_unregistered-text">
              Registrate para tener novedades de nuestro catalogo y poder
              realizar compras.
            </p>
            <button
              className="user_unregistered-signup"
              id="signup-button"
              onClick={toggleForm}
            >
              Registrate
            </button>
          </div>

          <div
            className={`user_options-registered ${
              isLoginFormVisible ? "" : "bounceRight"
            }`}
          >
            <h2 className="user_registered-title">Ya tienes una cuenta?</h2>
            <p className="user_registered-text">
              Inicia sesion y date una vuelta por nuestro catalogo de comics.
            </p>
            <button
              className="user_registered-login"
              id="login-button"
              onClick={toggleForm}
            >
              Inicia Sesion
            </button>
          </div>
        </div>

        <div
          className={`user_options-forms ${
            isLoginFormVisible ? "bounceRight" : "bounceLeft"
          }`}
          id="user_options-forms"
        >
          <div className="user_forms-login">
            <h2 className="forms_title">Inicia Sesion</h2>
            <form
              onSubmit={handleSubmit}
              ref={loginFormRef}
              className="forms_form"
            >
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                    autoFocus
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="forms_field-input"
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                {/*                 <button type="button" className="forms_buttons-forgot">
                  Forgot password?
                </button> */}

                <Link to="/reset-password-request">Olvidé mi contraseña</Link>

                <input
                  type="submit"
                  value="Log In"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
          <div className="user_forms-signup">
            <h2 className="forms_title">Registro</h2>
            <form
              className="forms_form"
              onSubmit={handleSubmit2}
              ref={registerFormRef}
            >
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="forms_field-input"
                    required
                    name="first_name"
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Apellido"
                    className="forms_field-input"
                    required
                    name="last_name"
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                    name="email"
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="number"
                    placeholder="Edad"
                    className="forms_field-input"
                    required
                    name="age"
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="forms_field-input"
                    required
                    name="password"
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="submit"
                  value="Sign up"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginRegister;
