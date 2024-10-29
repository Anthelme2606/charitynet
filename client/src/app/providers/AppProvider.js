import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLazyQuery } from "@apollo/client";
import useTokenRefresh from "../../hooks/useTokenRefresh";
import { CURRENT_USER } from "../../lib/queries";

const UserContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Charger l'utilisateur depuis le cookie
    const savedUser = Cookies.get("currentUser");
    return savedUser ? JSON.parse(savedUser) : { isAuth: false, auth: null };
  });

  const initialToken = Cookies.get("token");
  let initialLifeTime = Cookies.get("lifeTime");
  initialLifeTime = initialLifeTime ? parseInt(initialLifeTime) : null;

  // Rafraîchissement du token
  useTokenRefresh();

  const [getCurrentUser, { data, loading, error }] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: "network-only", // Toujours vérifier l'utilisateur sur le réseau
    onCompleted: (data) => {
      if (data?.currentUser) {
        const currentUserData = {
          isAuth: true,
          auth: data.currentUser,
        };
        setUser(currentUserData);

        // Stocker l'utilisateur dans les cookies avec une durée définie (par exemple, 1 jour)
        Cookies.set("currentUser", JSON.stringify(currentUserData), { expires: 1 });
      }
    },
    onError: () => {
      // Si une erreur se produit, déconnecter l'utilisateur
      Cookies.remove("token");
      Cookies.remove("lifeTime");
      Cookies.remove("currentUser");
      setUser({
        isAuth: false,
        auth: null,
      });
    },
  });

  useEffect(() => {
    const now = Date.now();

    if (initialToken && initialLifeTime > now) {
      // Si le token existe et est valide, demander le currentUser
      getCurrentUser();
    } else {
      // Sinon, nettoyer les cookies et réinitialiser l'utilisateur
      Cookies.remove("token");
      Cookies.remove("lifeTime");
      Cookies.remove("currentUser");
      setUser({
        isAuth: false,
        auth: null,
      });
    }
  }, [initialToken, initialLifeTime, getCurrentUser]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
