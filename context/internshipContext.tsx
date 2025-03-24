"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "./userContext";
import { Internship, InternshipType, SalaryType, WorkMode } from "@/types/types";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
axios.defaults.withCredentials = true;

interface InternshipContextType {
  internships: Internship[],
  loading: boolean;
  createInternship: (data: Internship) => void;
  InternshipTitle: string;
  internshipDescription: string;
  activeInternshipType: WorkMode;
  salary: number;
  salaryType: SalaryType;
  duration: number;
  negotiable: boolean;
  tags: InternshipType[];
  skills: string[];
  location: { country: string; address: string; city: string };
  renumerated: boolean;
  setInternshipTitle: React.Dispatch<React.SetStateAction<string>>;
  setInternshipDescription: React.Dispatch<React.SetStateAction<string>>;
  setSalary: React.Dispatch<React.SetStateAction<number>>;
  setActiveInternshipType: React.Dispatch<React.SetStateAction<WorkMode>>;
  setSalaryType: React.Dispatch<React.SetStateAction<SalaryType>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>; // durations in months
  setNegotiable: React.Dispatch<React.SetStateAction<boolean>>;
  setTags: React.Dispatch<React.SetStateAction<InternshipType[]>>;
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  setRenumerated: React.Dispatch<React.SetStateAction<boolean>>;
  userInternships: Internship[];
  searchInternships: (location: string, title: string) => void;
  getInternshipById: (id: string) => void;
  likeInternship: (internshipId: string) => void;
  applyToInternship: (id: string) => void;
  deleteInternship: (id: string) => void;
  handleSearchChange: (searchName: string, value: string) => void;
  searchQuery: { location: string, title: string };
  setSearchQuery: React.Dispatch<React.SetStateAction<{ location: string, title: string }>>;
  resetInternshipForm: () => void;
}

export interface Location {
  country: string;
  city: string;
  address: string;
}

const InternshipContext = createContext<InternshipContextType | null>(null);

export const InternshipContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // input state
  const [InternshipTitle, setInternshipTitle] = useState<string>("");
  const [internshipDescription, setInternshipDescription] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [activeInternshipType, setActiveInternshipType] = useState<WorkMode>(WorkMode.ON_SITE);
  const [salaryType, setSalaryType] = useState<SalaryType>(SalaryType.MONTH);
  const [negotiable, setNegotiable] = useState<boolean>(false);
  const [renumerated, setRenumerated] = useState<boolean>(false);
  const [tags, setTags] = useState<InternshipType[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState<Location>({
    country: "",
    city: "",
    address: "",
  });

  // get the user context
  const { userProfile, getUserProfile } = useUser();

  const [internships, setInternships] = useState<Internship[]>([]);
  const [userInternships, setUserInternships] = useState<Internship[]>([]);
  const [searchQuery, setSearchQuery] = useState({
    location: "",
    title: "",
  });

  const resetInternshipForm = () => {
    setInternshipTitle("");
    setInternshipDescription("");
    setSalary(0);
    setDuration(0);
    setActiveInternshipType(WorkMode.ON_SITE);
    setSalaryType(SalaryType.MONTH);
    setNegotiable(false);
    setTags([]);
    setSkills([]);
    setLocation({
      country: "",
      city: "",
      address: "",
    });
  };

  const createInternship = async (data: Internship) => {
    try {
      setLoading(true);
      axios.put("/api/internships", data);
      toast.success("Internship created successfully");
      //take me to profile
      //router.push("/");
    } catch (error) {
      console.error("Error creating internship", error);
      toast.error("Ooops! Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const getInternships = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/internships");
      setInternships(res.data);
    } catch (error) {
      console.log("Error getting internships", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserInternships = async (userId: string) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/internships/user/" + userId);

      setUserInternships(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting user internships", error);
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
      const res = await axios.get(`/api/internships/search?${query.toString()}`);

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
    setLoading(true);
    try {
      const res = await axios.get(`/api/internship/${id}`); // to check

      setLoading(false);
      return res.data;
    } catch (error) {
      console.log("Error getting internship by id", error);
    } finally {
      setLoading(false);
    }
  };

  // like an internship
  const likeInternship = async (internshipId: string) => {
    console.log("internship liked", internshipId);
    try {
      const res = await axios.put(`/api/internships/like/${internshipId}`);

      console.log("internship liked successfully", res);
      toast.success("internship liked successfully");
      getInternships();
    } catch (error) {
      console.log("Error liking the internship", error);
    }
  };

  // apply to a internship
  const applyToInternship = async (internshipId: string) => {
    // const internship = internships.find((internship) => internship.id === internshipId);

    // if (internship && internship.applicants.includes(userProfile._id)) {
    //   toast.error("You have already applied to this internship");
    //   return;
    // }

    try {
      await axios.put(`/api/internships/apply/${internshipId}`);

      toast.success("Applied to internship successfully");
      getInternships();
    } catch (error) {
      console.log("Error applying to internship", error);
      toast.error("Error applying to internship");
    }
  };

  // delete a internship
  const deleteInternship = async (internshipId: string) => {
    try {
      await axios.delete(`/api/internship/${internshipId}`);
      setInternships((prevInternships) => prevInternships.filter((internship) => internship.id !== internshipId));
      setUserInternships((prevInternships) => prevInternships.filter((internship) => internship.id !== internshipId));

      toast.success("internship deleted successfully");
    } catch (error) {
      console.log("Error deleting internship", error);
    }
  };

  //
  const handleSearchChange = (searchName: string, value: string) => {
    setSearchQuery((prev) => ({ ...prev, [searchName]: value }));
  };

  // useEffect(() => {
  //   getInternships();
  // }, []);

  // useEffect(() => {
  //   if (userProfile?.id) {
  //     getUserInternships(userProfile.id);
  //     getUserProfile(userProfile.id);
  //   }
  // }, [userProfile?.id]);

  console.log("internships : ",internships);
  return (
    <InternshipContext.Provider
      value={{
        internships,
        loading,
        InternshipTitle,
        internshipDescription,
        salary,
        duration,
        activeInternshipType,
        salaryType,
        negotiable,
        tags,
        skills,
        location,
        renumerated,
        userInternships,
        createInternship,
        setInternshipTitle,
        setInternshipDescription,
        setActiveInternshipType,
        setSalary,
        setSalaryType,
        setDuration,
        setNegotiable,
        setTags,
        setSkills,
        setLocation,
        setRenumerated,
        searchInternships,
        getInternshipById,
        likeInternship,
        applyToInternship,
        deleteInternship,
        handleSearchChange,
        searchQuery,
        setSearchQuery,
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
