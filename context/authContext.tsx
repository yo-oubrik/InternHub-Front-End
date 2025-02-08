"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/types/types";

interface AuthContextType {
    isAuthenticated: boolean;
    auth0User: User;
    loading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth0User, setAuth0User] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check-auth`);
                setIsAuthenticated(res.data.isAuthenticated);
                setAuth0User(res.data.user);
                console.log(isAuthenticated, auth0User);
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`);
        setIsAuthenticated(false);
        setAuth0User(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, auth0User, loading, logout }
        }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
