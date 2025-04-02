"use client";
import axios from "@/lib/axios";
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
  role: string;
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
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data);
      console.log(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    if (token && expiresIn) {
      const expirationTime = parseInt(expiresIn);
      if (Date.now() < expirationTime) {
        setIsAuthenticated(true);
        fetchUser();
      } else {
        logout();
      }
    } else {
      setLoading(false);
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
