import { Route, Routes, Navigate } from "react-router-dom";
import { ComicRoutes } from "../heroes/routes/ComicRoutes";
import { SignUp } from "../auth/SignUp";
import { SignIn } from "../auth/SignIn";
import { useAuth } from "../hooks/useAuth";

export const AppRouter = () => {
  const auth = useAuth(); // Hook personalizado para gestionar la autenticación
  if (!auth.authInitialized) {
    return null; // O un componente de carga
  }
  return (
    <Routes>
      <Route
        path="login"
        element={!auth.user ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="registro"
        element={!auth.user ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/*"
        element={!auth.user ? <Navigate to="/login" /> : <ComicRoutes />}
      />
    </Routes>
  );
};
