"use client";
import { Role } from "@/types/types";
import { fetchWithAuth } from "@/utils/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  id: string;
  email: string;
  profilePicture: string;
  role: Role;
}
interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
      setLoading(true);
      const data = await fetchWithAuth("/users/me");
      if (!data) {
        setLoading(false);
        logout();
      }
      setCurrentUser(data);
      setIsAuthenticated(true);
      setLoading(false);
  };

  // console.log("current User : ", currentUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    // console.log("1");
    // console.log("token : ", token);
    // console.log("expiresIn : ", expiresIn);
    if (token && expiresIn) {
      const expirationTime = parseInt(expiresIn);
      if (Date.now() < expirationTime) {
        fetchUser();
      } else {
        logout();
      }
    } else {
      setLoading(false); // No token found or it expired .
    }
  }, []);

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoading(false);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
