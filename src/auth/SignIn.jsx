import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);
      localStorage.setItem("authData", JSON.stringify(userCredentials));
      navigate("/"); // Redirect to the home page
    } catch (error) {
      setError(
        "Credenciales inválidas. Por favor, verifica tu correo y contraseña."
      );
    }
  };

  if (user) {
    navigate("/"); // Redirect to the home page
    return null;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="text-center" onSubmit={signIn}>
        <h1>Inicio de sesión</h1>

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
          className="btn btn-primary my-4 d-block m-auto"
          style={{ fontSize: "20px" }}
        >
          Ingresar
        </button>
        <p>
          ¿No tienes cuenta? <Link to="/registro"> Regístrate</Link>
        </p>
      </form>
    </div>
  );
};
