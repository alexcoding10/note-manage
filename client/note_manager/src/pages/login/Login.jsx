import { useState } from "react";
import "./Login.css"; // Estilo CSS para el formulario de inicio de sesión
import { Link} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const user = {
      email,
      password
    }
    console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status >= 400) {
          setError(data.message);
        } else {
          localStorage.setItem("jwt", data.token);
          window.location.href = "/notes";
        }
      })
      .catch((error) => {
        console.error("Error de inicio de sesión:", error);
        setError("Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.");
      });
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <div className="container-link">
          <Link className="link" to="/signup">Registrarse</Link>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
