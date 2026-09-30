import React, { createContext, useState } from "react";
import type { AuthUser } from "../types/AuthUser";

interface AuthContextValue { 
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined); 

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("authUser");

    if (!stored) return null;

    try {
      const parsed: AuthUser = JSON.parse(stored);
      localStorage.setItem("token", parsed.token);
      return parsed;
    } catch {
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = (authUser: AuthUser) => {
    setUser(authUser);
    localStorage.setItem("authUser", JSON.stringify(authUser)); 
    localStorage.setItem("token", authUser.token); 
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>; 
};

