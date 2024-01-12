import React, { createContext, useContext, useEffect, useState } from "react";
import { getItems, setItems } from "@/helper/localstorage";
import AuthService from "@/service/authService";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null || getItems("token"));
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchingData = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token !== null) {
      fetchingData();
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    setItems("token", token);
  }, [token]);

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
