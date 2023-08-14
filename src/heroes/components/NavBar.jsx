import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";

export const Navbar = () => {
  // funcionalidad logout
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Cerro sesión con exito");
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };
  const userSignIn = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-5 ">
      <Link className="navbar-brand" to="/">
        Comics
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="/buscar"
          >
            Buscar
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          {authUser ? (
            <div className="d-flex">
              <span className="nav-item nav-link text-primary">
                {authUser.email}
              </span>
              <button className="nav-item nav-link btn" onClick={userSignOut}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button className="nav-item nav-link btn" onClick={userSignIn}>
              Iniciar Sesión
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};
