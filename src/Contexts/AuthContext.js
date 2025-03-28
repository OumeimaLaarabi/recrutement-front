import React, { createContext, useContext, useState } from "react";
import { decodeToken } from "../Utils/TokenUtils";
import { login } from "../Services/UserServices";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useUserContext = () => useContext(AuthContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Ajout du state de chargement
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token); // ✅ Store token in localStorage
      const userInfo = decodeToken(token);

      setUser(userInfo);
      return userInfo;
    } catch (error) {
      console.error("Failed to handle login:", error);
      throw error;
    }
  };
  
  const handleLogout = () => {
    console.log("Logging out..."); 
    //localStorage.removeItem("user"); 
    localStorage.clear();

    //localStorage.removeItem("token"); 
    setUser(null);
    navigate("/login");
  };
  
  
  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
