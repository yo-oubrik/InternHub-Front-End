"use client"
import { Internship } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
axios.defaults.withCredentials = true;


interface InternshipContextType {
    loading: boolean;
    createInternship: (data: Internship) => void;
}

const InternshipContext = createContext<InternshipContextType | null>(null);

export const InternshipContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const createInternship = async (data: Internship) => {
        try {
            setLoading(true);
            axios.post("/api/internships", data);
            toast.success("Internship created successfully");
            //take me to profile
            //router.push("/");
        } catch (error) {
            console.error("Error creating internship", error);
            toast.error("Ooops! Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <InternshipContext.Provider
            value={{
                loading,
                createInternship,
            }}
        >
            {children}
        </InternshipContext.Provider>
    );
};

export const useInternship = (): InternshipContextType => {
    const context = useContext(InternshipContext);
    if (!context) throw new Error("useInternshipContext must be used within an InternshipContextProvider");
    return context;
};
