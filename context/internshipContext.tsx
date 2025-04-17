"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "./userContext";
import { Internship, InternshipRequest } from "@/types/types";
import { RequestWithAuth as fetchWithAuth } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface InternshipContextType {
  loading: boolean;
  internship: Internship;
  setInternship: (internship: Internship) => void;
  internships: Internship[];
  // companyInternships: Internship[];
  createInternship: () => void;
  getAllInternships: () => void;
  searchInternships: (location: string, title: string) => void;
  updateInternship: (internshipId: string) => void;
  getInternshipById: (id: string) => void;
  getCompanyInternships: () => void;
  likeInternship: (internshipId: string) => void;
  applyToInternship: (id: string) => void;
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
  const [internship, setInternship] = useState<Internship>({} as Internship);
  const [internships, setInternships] = useState<Internship[]>([]);

  // get the user context
  const { company, setCompany } = useUser();
  const router = useRouter();

  const createInternship = async () => {
    try {
      setLoading(true);
      await fetchWithAuth(`/internships/create`, {
        method: "POST",
        body: JSON.stringify(internship as InternshipRequest),
      });
      toast.success("Internship created successfully");
      //take me to profile
      router.push("/internships");
    } catch (error) {
      console.error("Error creating internship", error);
      toast.error("Ooops! Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAllInternships = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/internships`);
      setInternships(res.data);
    } catch (error) {
      console.log("Error getting internships", error);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyInternships = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/internships/company/" + company?.id);
      setCompany({
        ...company,
        internships: res.data,
      });
      setLoading(false);
    } catch (error) {
      console.log("Error getting user internships", error);
    } finally {
      setLoading(false);
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
  const getInternshipById = async (id: string) => {
    // setLoading(true);
    // try {
    //   const res = await fetchWithAuth(`/internships/${id}`);
    //   setInternship(res.data);
    //   setLoading(false);
    //   return res.data;
    // } catch (error) {
    //   console.log("Error getting internship by id", error);
    // } finally {
    //   setLoading(false);
    // }
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
  const applyToInternship = async (internshipId: string) => {
    // const internship = internships.find((internship) => internship.id === internshipId);
    // if (internship && internship.applicants.includes(userProfile._id)) {
    //   toast.error("You have already applied to this internship");
    //   return;
    // }
    // try {
    //   await axios.put(`/api/internships/apply/${internshipId}`);
    //   toast.success("Applied to internship successfully");
    //   getInternships();
    // } catch (error) {
    //   console.log("Error applying to internship", error);
    //   toast.error("Error applying to internship");
    // }
  };

  // reset Internship Form for post-internship page
  const resetInternshipForm = () => {
    setInternship({} as Internship);
  };

  //
  const handleSearchChange = (searchName: string, value: string) => {
    //   setSearchQuery((prev) => ({ ...prev, [searchName]: value }));
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
