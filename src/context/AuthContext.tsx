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
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string
  role: string
  exp: number
}

interface AuthContextType {
  token: string | null;
  adminInfo: any | null;
  userRole: string | null;
  login: (token: string, adminData: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [adminInfo, setAdminInfo] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const logout = useCallback(() => {
    setToken(null);
    setAdminInfo(null);
    setUserRole(null);
    authStorage.clearAuth();
    // Clear cookie for middleware
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }, []);

  useEffect(() => {
    const savedToken = authStorage.getToken();
    const savedAdmin = authStorage.getUser();

    if (authStorage.isExpired()) {
      logout();
      return;
    }

    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode<DecodedToken>(savedToken);
        setUserRole(decoded.role);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
        return;
      }
    }
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
    
    // Set cookie for middleware
    document.cookie = `token=${newToken}; path=/; max-age=${24 * 60 * 60}; secure; samesite=strict`;
    
    // Decode token to get role
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      setUserRole(decoded.role);
    } catch (error) {
      console.error('Invalid token during login:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        adminInfo,
        userRole,
        login,
        logout,
        isAuthenticated: !!token && !authStorage.isExpired(),
        isAdmin: userRole === 'ADMIN' || userRole === 'SUPER_ADMIN',
        isSuperAdmin: userRole === 'SUPER_ADMIN',
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

