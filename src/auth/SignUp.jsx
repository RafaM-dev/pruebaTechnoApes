import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created:", user);
        window.alert("Usuario creado exitosamente.");
      })
      .catch((error) => {
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        setError("Error al crear usuario: " + error.message);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="text-center" onSubmit={handleSignup}>
        <h1>Registro</h1>
        <div className="form-group">
          <label className="p-3" style={{ fontSize: "30px" }}>
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Correo Electrónico"
            style={{ fontSize: "20px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="p-3" style={{ fontSize: "30px" }}>
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Contraseña"
            style={{ fontSize: "20px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button
          type="submit"
          className="btn btn-primary w-100 my-4"
          style={{ fontSize: "20px" }}
        >
          Crear cuenta
        </button>
        <p>
          ¿Ya tienes cuenta? <Link to="/login"> Inicia Sesión</Link>
        </p>
      </form>
    </div>
  );
};
