
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  
  const authorizationToken = `Bearer ${token}`;
  const API = "https://mernadminba.onrender.com";

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      if (!token) return; // Prevent fetching without a token

      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data ", data.userData);
        setUser(data.userData);
      } else {
        console.error("Invalid token, logging out...");
        LogoutUser(); // Logout if token is invalid
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      LogoutUser();
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
    getServices();
  }, [token]); // Run when token changes

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, API }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
