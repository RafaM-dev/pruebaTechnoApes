import { useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setAuthInitialized(true); // Indicar que la verificación inicial se completó
    });

    return () => unsubscribe();
  }, []);

  return { user, authInitialized };
};
