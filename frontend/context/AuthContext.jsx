import { createContext, useContext, useEffect, useState } from "react";
import getBaseURL from "../src/utils/baseURL";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const requestAuth = async (path, payload) => {
  const response = await fetch(`${getBaseURL()}/api/auth${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Authentication failed");
  return data;
};

//authProvider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = (data) => {
    localStorage.setItem("customerToken", data.token);
    localStorage.setItem("customer", JSON.stringify(data.user));
    setCurrentUser(data.user);
  };

  const registerUser = async (username, email, password) => {
    const data = await requestAuth("/register", { username, email, password });
    saveSession(data);
    return data;
  };
  const loginUser = async (email, password) => {
    const data = await requestAuth("/login", { email, password });
    saveSession(data);
    return data;
  };
  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");
    setCurrentUser(null);
  };

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("customer"));
      setCurrentUser(user);
    } catch {
      localStorage.removeItem("customer");
    } finally {
      setLoading(false);
    }
  }, []);

  // Value
  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
