"use client";

import { Company } from "@/types/types";
import { deleteWithAuth, RequestWithAuth } from "@/utils/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface CompaniesContextType {
  companies: Company[];
  isLoading: boolean;
  removeCompany: (studentId: string) => void;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(
  undefined
);

export function CompaniesProvider({ children }: { children: ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = async () => {
    setIsLoading(true);
    const data = await RequestWithAuth("/companies");
    setIsLoading(false);
    if (!data) {
      toast.error("Failed to fetch companies", { id: "fetch-companies" });
      return;
    }
    setCompanies(data);
  };

  const removeCompanie = async (companyId: string) => {
    setIsLoading(true);
    const result = await deleteWithAuth("/companies/" + companyId);
    setIsLoading(false);
    if (!result) {
      toast.error("Failed to delete companie", { id: "delete-companie" });
      return;
    }
    setCompanies((prev) => prev.filter((company) => company.id !== companyId));
    toast.success("Company deleted successfully", {
      id: "delete-companie",
    });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <CompaniesContext.Provider
      value={{
        companies,
        isLoading: isLoading,
        removeCompany: removeCompanie,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompaniesContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompaniesProvider");
  }
  return context;
}
