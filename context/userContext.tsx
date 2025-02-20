"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { Company, Student, User } from "@/types/types";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
axios.defaults.withCredentials = true;

interface UserContextType {
    userProfile : User | null  ,
    getUserProfile : ( id : string ) => void ,
    user : User | null , 
    company : Company | null , 
    student : Student | null , 
    getUser : ( id : string ) => void ,
    getCompany : ( id : string ) => void ,
    getStudent : ( id : string ) => void ,
}

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { isAuthenticated , auth0User } = useAuth() ;
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    const [student, setStudent] = useState<Student | null>(null);
  
    const getUserProfile = async (id : string) => {
      try {
        const res = await axios.get(`/api/user/${id}`);
  
        setUserProfile(res.data);
      } catch (error) {
        console.log("Error getting user profile", error);
      }
    };

    const getUser = async (id: string) => {
      try {
        const res = await axios.get<User>(`/api/user/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
  };

    const getCompany = async (id: string) => {
      try {
        const res = await axios.get<Company>(`/api/company/${id}`);
        setCompany(res.data);
      } catch (error) {
        console.error("Failed to fetch company", error);
      }
  };
    const getStudent = async (id: string) => {
      try {
        const res = await axios.get<Student>(`/api/student/${id}`);
        setStudent(res.data);
      } catch (error) {
        console.error("Failed to fetch student", error);
      }
  };
  
  
    useEffect(() => {
      console.log(isAuthenticated ? "Authenticated" : "Not Authenticated");
      if (isAuthenticated && auth0User) {
        getUserProfile(auth0User.id);
      }
    }, [isAuthenticated, auth0User]);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        getUserProfile,
        user,
        getUser,
        company ,
        getCompany ,
        student ,
        getStudent ,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  
  if (!context)
    throw new Error(
      "useUserContext must be used within an UserContextProvider"
    );
  return context;
};
