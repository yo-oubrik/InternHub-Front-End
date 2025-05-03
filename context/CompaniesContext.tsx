"use client";

import { Company, CompanyFlag, FlaggedCompanyOverview } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { getValidToken } from "@/utils/auth";
import axios from "@/lib/axios";

interface CompaniesContextType {
  getCompanies: () => Promise<Company[]>;
  fetchFlaggedCompaniesOverview: () => Promise<FlaggedCompanyOverview[]>;
  fetchCompanyFlagsHistory: (companyId: string) => Promise<CompanyFlag[]>;
  fetchUnresolvedFlagsCount: (companyId: string) => Promise<number>;
  fetchResolvedFlagsCount: (companyId: string) => Promise<number>;
  fetchWarningsCount: (companyId: string) => Promise<number>;
  resolveFlag: (flagId: string) => Promise<boolean>;
  warnCompany: (
    flagId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => Promise<boolean>;
  blockCompany: (
    companyId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => Promise<boolean>;
  unblockCompany: (
    companyId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => Promise<boolean>;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(
  undefined
);

export function useCompanies() {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error("useCompanies must be used within a CompaniesProvider");
  }
  return context;
}

export function CompaniesProvider({ children }: { children: ReactNode }) {
  const getCompanies = async () => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to fetch companies");
        return;
      }
      const { data } = await axios.get("/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      toast.error("Failed to fetch companies");
      return [];
    }
  };

  const fetchFlaggedCompaniesOverview = async () => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to fetch flagged companies", {
          id: "fetch-flagged-companies",
        });
        return [];
      }
      const { data } = await axios.get("/flagged-companies/overview", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Failed to fetch flagged companies:", error);
      toast.error("Failed to fetch flagged companies");
      return [];
    }
  };

  const fetchCompanyFlagsHistory = async (companyId: string) => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to fetch company flags history");
        return [];
      }
      const { data } = await axios.get(
        `/flagged-companies/${companyId}/flags`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch company flags history:", error);
      toast.error("Failed to fetch company flags history");
      return [];
    }
  };

  const fetchUnresolvedFlagsCount = async (
    companyId: string
  ): Promise<number> => {
    try {
      const token = getValidToken();
      if (!token) return 0;
      const { data } = await axios.get(
        `/flagged-companies/${companyId}/unresolved/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch unresolved flags count:", error);
      return 0;
    }
  };

  const fetchResolvedFlagsCount = async (
    companyId: string
  ): Promise<number> => {
    try {
      const token = getValidToken();
      if (!token) return 0;
      const { data } = await axios.get(
        `/flagged-companies/${companyId}/resolved/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch resolved flags count:", error);
      return 0;
    }
  };

  const fetchWarningsCount = async (companyId: string): Promise<number> => {
    try {
      const token = getValidToken();
      if (!token) return 0;
      const { data } = await axios.get(
        `/flagged-companies/${companyId}/warnings/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch warnings count:", error);
      return 0;
    }
  };

  const resolveFlag = async (flagId: string) => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to resolve flag");
        return false;
      }
      await axios.put(
        `/flagged-companies/${flagId}/resolve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Flag resolved successfully", {
        id: "resolve-flag",
      });
      return true;
    } catch (error) {
      console.error("Failed to resolve flag:", error);
      toast.error("Failed to resolve flag");
      return false;
    }
  };

  const warnCompany = async (
    flagId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to warn company");
        return false;
      }

      const formData = new FormData();
      formData.append("message", message);
      formData.append("subject", subject);
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      await axios.post(`/flagged-companies/${flagId}/warn`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Warning sent successfully");
      return true;
    } catch (error) {
      console.error("Failed to warn company:", error);
      toast.error("Failed to warn company");
      return false;
    }
  };

  const blockCompany = async (
    companyId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to block company");
        return false;
      }

      const formData = new FormData();
      formData.append("message", message);
      formData.append("subject", subject);
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      await axios.post(`/companies/${companyId}/block`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Company blocked successfully");
      return true;
    } catch (error) {
      console.error("Failed to block company:", error);
      toast.error("Failed to block company");
      return false;
    }
  };

  const unblockCompany = async (
    companyId: string,
    message: string,
    subject: string,
    attachments: File[]
  ) => {
    try {
      const token = getValidToken();
      if (!token) {
        toast.error("Failed to unblock company");
        return false;
      }

      const formData = new FormData();
      formData.append("message", message);
      formData.append("subject", subject);
      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      await axios.post(`/companies/${companyId}/unblock`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Company unblocked successfully");
      return true;
    } catch (error) {
      console.error("Failed to unblock company:", error);
      toast.error("Failed to unblock company");
      return false;
    }
  };

  return (
    <CompaniesContext.Provider
      value={{
        getCompanies,
        fetchFlaggedCompaniesOverview,
        fetchCompanyFlagsHistory,
        fetchUnresolvedFlagsCount,
        fetchResolvedFlagsCount,
        fetchWarningsCount,
        resolveFlag,
        warnCompany,
        blockCompany,
        unblockCompany,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
}
