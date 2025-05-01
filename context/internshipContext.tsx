"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "./userContext";
import {
  Application,
  ApplicationRequest,
  ApplicationStatus,
  Internship,
  InternshipRequest,
  InternshipType,
  SalaryType,
  Student,
  WorkMode,
} from "@/types/types";
import { RequestWithAuth as fetchWithAuth } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface InternshipContextType {
  loading: boolean;
  internship: Internship;
  setInternship: (internship: Internship) => void;
  internships: Internship[];
  applications: Application[];
  // setApplications: (applications: Application[]) => void;
  getCompanyApplications: (companyId: string) => void;
  countInternshipApplications: (internshipId: string) => Promise<number>;
  countCompanyApplications: (companyId: string) => Promise<number>;
  countCompanyApplicationsWithStatus: (
    companyId: string,
    status: ApplicationStatus
  ) => Promise<number>;
  createInternship: () => void;
  getAllInternships: () => void;
  isApplied: (internshipId: string, studentId: string) => Promise<boolean>;
  searchInternships: (location: string, title: string) => void;
  updateInternship: (internshipId: string) => void;
  getInternshipById: (id: string) => Promise<Internship | null>;
  getCompanyInternships: (id: string) => Promise<Internship[]>;
  likeInternship: (internshipId: string) => void;
  applyToInternship: (application: ApplicationRequest) => void;
  handleSearchChange: (searchName: string, value: string) => void;
  resetInternshipForm: () => void;
}

export interface Location {
  country: string;
  city: string;
  address: string;
}

const InternshipContext = createContext<InternshipContextType | null>(null);

export const InternshipContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [internship, setInternship] = useState<Internship>({
    motivationLetterRequired: false,
    negotiable: false,
    paid: false,
    tags: [] as string[],
    skills: [] as string[],
    salary: 0,
    salaryType: SalaryType.MONTH,
    workMode: WorkMode.REMOTE,
  } as Internship);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // get the user contextundefined
  const { company, setCompany } = useUser();
  const router = useRouter();

  const createInternship = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`/internships`, {
        method: "POST",
        body: JSON.stringify(internship as InternshipRequest),
      });
      if (response) {
        toast.success("Internship created successfully");
        router.push("/internships");
      } else {
        toast.error("Failed to create internship");
      }
    } catch (error) {
      console.error("Error creating internship", error);
      toast.error("Ooops! Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAllInternships = async () => {
    try {
      setLoading(true);
      const data = await fetchWithAuth(`/internships`);
      setInternships(data);
    } catch (error) {
      console.log("Error getting internships", error);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyInternships = async (companyId: string) => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(`internships/company/${companyId}`);
      return res || [];
    } catch (error) {
      console.error("Error getting user internships", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const isApplied = async (internshipId: string, studentId: string) => {
    if (!internshipId || !studentId) return false;
    try {
      const response = await fetchWithAuth(
        `/applications/internship/${internshipId}/student/${studentId}`
      );
      return response;
    } catch (error) {
      console.error(
        "Error checking if student is applied to internship",
        error
      );
      return false;
    }
  };

  const updateInternship = async (internshipId: string) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/internships/${internshipId}`, {
        method: "PUT",
        body: JSON.stringify(internship),
      });
      setInternship(res.data);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log("Error updating internship", error);
    } finally {
      setLoading(false);
    }
  };

  const searchInternships = async (location: string, title: string) => {
    setLoading(true);
    try {
      // build query string
      const query = new URLSearchParams();

      if (location) query.append("location", location);
      if (title) query.append("title", title);

      // send the request
      const res = await fetchWithAuth(
        `/internships/search?${query.toString()}`
      );

      // set internships to the response data
      setInternships(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error searching internships", error);
    } finally {
      setLoading(false);
    }
  };

  // get internship by id
  const getInternshipById = async (id: string): Promise<Internship | null> => {
    if (!id) return null;
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/internships/${id}`);
      console.log("response : ", res);
      setLoading(false);
      return res;
    } catch (error) {
      console.log("Error getting internship", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // like an internship
  const likeInternship = async (internshipId: string) => {
    // console.log("internship liked", internshipId);
    // try {
    //   const res = await fetchWithAuth(`/internships/like/${internshipId}`);
    //   console.log("internship liked successfully", res);
    //   toast.success("internship liked successfully");
    //   getInternships();
    // } catch (error) {
    //   console.log("Error liking the internship", error);
    // }
  };

  // apply to a internship
  const applyToInternship = async (application: ApplicationRequest) => {
    try {
      const response = await fetchWithAuth(`/applications`, {
        method: "POST",
        body: JSON.stringify({
          ...application,
        }),
      });
      if (!response) {
        toast.error("Failed to apply to internship");
        return;
      }
      toast.success("Applied to internship successfully");
    } catch (error) {
      toast.error("Error applying to internship");
    }
  };

  // reset Internship Form for post-internship page
  const resetInternshipForm = () => {
    setInternship({} as Internship);
  };

  //
  const handleSearchChange = (searchName: string, value: string) => {
    //   setSearchQuery((prev) => ({ ...prev, [searchName]: value }));
  };

  const getCompanyApplications = async (companyId: string) => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(
        `/applications/company/${companyId}`
      );
      setApplications(response);
    } catch (error) {
      console.error("Error getting applications", error);
      toast.error("Ooops! Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const countInternshipApplications = async (internshipId: string) => {
    if (!internshipId) return 0;
    try {
      setLoading(true);
      if (!internshipId) return 0;
      const response = await fetchWithAuth(
        `/applications/count/internship/${internshipId}`
      );
      return response;
    } catch (error) {
      console.error("Error getting applications", error);
      toast.error("Ooops! Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const countCompanyApplications = async (companyId: string) => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(
        `/applications/company/${companyId}/count`
      );
      return response;
    } catch (error) {
      console.error("Error getting applications", error);
      toast.error("Ooops! Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const countCompanyApplicationsWithStatus = async (
    companyId: string,
    status: ApplicationStatus
  ) => {
    console.log(
      `url is : /applications/${companyId}/count/status?status=${status}`
    );
    try {
      setLoading(true);
      const response = await fetchWithAuth(
        `/applications/${companyId}/count/status?status=${status}`
      );
      return response;
    } catch (error) {
      console.error(`Error getting ${status} applications`, error);
      toast.error("Ooops! Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInternships();
  }, []);

  // useEffect(() => {
  //   if (userProfile?.id) {
  //     getUserInternships(userProfile.id);
  //     getUserProfile(userProfile.id);
  //   }
  // }, [userProfile?.id]);

  return (
    <InternshipContext.Provider
      value={{
        loading,
        internship,
        setInternship,
        internships,
        applications,
        isApplied,
        getCompanyApplications,
        countInternshipApplications,
        countCompanyApplications,
        countCompanyApplicationsWithStatus,
        createInternship,
        getAllInternships,
        searchInternships,
        getInternshipById,
        getCompanyInternships,
        updateInternship,
        likeInternship,
        applyToInternship,
        handleSearchChange,
        resetInternshipForm,
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternship = (): InternshipContextType => {
  const context = useContext(InternshipContext);
  if (!context)
    throw new Error(
      "useInternship must be used within an InternshipContextProvider"
    );
  return context;
};
