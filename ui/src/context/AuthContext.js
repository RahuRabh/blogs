import React, { createContext, useState } from "react";
import { login, register } from "../apis/auth";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = async (data) => {
    try {
      const response = await login(data);
      if (response.status === "success" && response.token) {
        setIsAuthenticated(true);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("name", response.name);
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.log("Login Error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  const registerUser = async (data) => {
    try {
      const response = await register(data);
      if (response.status === "success" ) {
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.log("Register Error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  const logout = (navigate) => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginUser, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

