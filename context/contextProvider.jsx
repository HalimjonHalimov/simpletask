import React, { createContext, useContext, useEffect, useState } from "react";
import { getItems, setItems } from "@/helper/localstorage";
import AuthService from "@/service/authService";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchingData = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userToken = getItems("token");

    if (userToken) {
      setToken(userToken);
      fetchingData();
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error("Auth Error with Context Provider");
  }
  return context;
}
