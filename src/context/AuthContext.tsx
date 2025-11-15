"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authStorage } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  adminInfo: any | null;
  login: (token: string, adminData: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [adminInfo, setAdminInfo] = useState<any | null>(null);

  const logout = useCallback(() => {
    setToken(null);
    setAdminInfo(null);
    authStorage.clearAuth();
  }, []);

  useEffect(() => {
    const savedToken = authStorage.getToken();
    const savedAdmin = authStorage.getUser();

    if (authStorage.isExpired()) {
      logout();
      return;
    }

    if (savedToken) setToken(savedToken);
    if (savedAdmin) setAdminInfo(savedAdmin);
  }, [logout]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (authStorage.isExpired()) {
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [logout]);

  const login = (newToken: string, adminData: any) => {
    setToken(newToken);
    setAdminInfo(adminData);
    authStorage.setAuth(newToken, adminData, 24);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        adminInfo,
        login,
        logout,
        isAuthenticated: !!token && !authStorage.isExpired(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

