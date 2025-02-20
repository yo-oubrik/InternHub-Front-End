"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types/types";

interface AuthContextType {
    isAuthenticated: boolean;
    auth0User: User;
    loading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
axios.defaults.withCredentials = true;
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [auth0User, setAuth0User] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const res = await axios.get(`/api/auth/check-auth`);
    //             setIsAuthenticated(res.data.isAuthenticated);
    //             setAuth0User(res.data.user);
    //             console.log(isAuthenticated, auth0User);
    //         } catch (error) {
    //             console.error("Auth check failed:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     checkAuth();
    // }, []);

    const logout = async () => {
        axios.post(`/api/auth/logout`);
        setIsAuthenticated(false);
        setAuth0User(null);
        axios.get("/"); // i don't know if this will work instead of router.push('/')
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, auth0User, loading, logout }}
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
