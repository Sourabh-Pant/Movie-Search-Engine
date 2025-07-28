import { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    setCurrentUser(res.data);
  };

  const register = async (username, email, password) => {
    await axios.post("/auth/register", { username, email, password });
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
    window.location.reload(); // 🔁 Refresh on logout
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      setCurrentUser(res.data);
    } catch {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser(); // 🔥 Auto login on refresh
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
