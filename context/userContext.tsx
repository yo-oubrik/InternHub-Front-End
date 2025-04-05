"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import {
  Certificat,
  CertificatRequest,
  Company,
  Experience,
  ExperienceRequest,
  Formation,
  FormationRequest,
  Project,
  ProjectRequest,
  Role,
  Student,
  StudentRequest,
} from "@/types/types";
import { RequestWithAuth } from "@/utils/auth";

interface UserContextType {
  company: Company;
  companies: Company[];
  student: Student;
  setCompany: (company: Company) => void;
  setStudent: (student: Student) => void;
  getCompany: (id: string) => Promise<void>;
  getStudent: (id: string) => Promise<void>;
  getCompanies: () => Promise<void>;
  updateStudent: (student: Student) => Promise<void>;
  createExperience: (experience: Experience) => Promise<Experience>;
  updateExperience: (experience: Experience) => Promise<Experience>;
  deleteExperience: (experience: Experience) => Promise<void>;
  createFormation: (formation: Formation) => Promise<Formation>;
  updateFormation: (formation: Formation) => Promise<Formation>;
  deleteFormation: (formation: Formation) => Promise<void>;
  createProject: (project: Project) => Promise<Project>;
  updateProject: (project: Project) => Promise<Project>;
  deleteProject: (project: Project) => Promise<void>;
  createCertificat: (certificat: Certificat) => Promise<Certificat>;
  updateCertificat: (certificat: Certificat) => Promise<Certificat>;
  deleteCertificat: (certificat: Certificat) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, currentUser } = useAuth();
  const [company, setCompany] = useState<Company>({} as Company);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [student, setStudent] = useState<Student>({
    firstName: "",
    lastName: "",
  } as Student);

  // console.log("current User : ", currentUser);

  const getCompany = async (id: string) => {
    try {
      const data = await RequestWithAuth(`company/${id}`);
      setCompany(data as Company);
    } catch (error) {
      console.error("Failed to fetch company", error);
    }
  };
  const getCompanies = async () => {
    try {
      const data = await RequestWithAuth("/companies");
      console.log("companies : ", data);
      setCompanies(data as Company[]);
    } catch (error) {
      console.error("Failed to fetch companies", error);
    }
  };
  const getStudent = async (id: string) => {
    try {
      const data = await RequestWithAuth(`students/${id}`);
      setStudent(data as Student);
    } catch (error) {
      console.error("Failed to fetch student", error);
    }
  };
  const updateStudent = async (student: Student) => {
    try {
      const studentRequest: StudentRequest = student as StudentRequest;
      const data = await RequestWithAuth(`students/${student.id}`, {
        method: "PUT",
        body: JSON.stringify(studentRequest),
      });
      setStudent(data as Student);
    } catch (error) {
      console.error("Failed to update student", error);
    }
  };
  const createExperience = async (experience: Experience) => {
    try {
      console.log(
        "created ... " +
          JSON.stringify({
            ...experience,
            companyId: experience.company.id,
            studentId: student.id,
          } as ExperienceRequest)
      );
      return await RequestWithAuth(`/experiences`, {
        method: "POST",
        body: JSON.stringify({
          ...experience,
          companyId: experience.company.id,
          studentId: student.id,
        } as ExperienceRequest),
      });
    } catch (error) {
      console.error("Failed to create experience", error);
    }
  };
  const updateExperience = async (experience: Experience) => {
    try {
      return await RequestWithAuth(`/experiences/${experience.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...experience,
          companyId: experience.company.id,
          studentId: student.id,
        } as ExperienceRequest),
      });
    } catch (error) {
      console.error("Failed to update experience", error);
    }
  };
  const deleteExperience = async (experience: Experience) => {
    try {
      await RequestWithAuth(`/experiences/${experience.id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete experience", error);
    }
  };
  const createFormation = async (formation: Formation) => {
    try {
      return await RequestWithAuth(`/formations`, {
        method: "POST",
        body: JSON.stringify({
          ...formation,
          companyId: formation.company.id,
          studentId: student.id,
        } as FormationRequest),
      });
    } catch (error) {
      console.error("Failed to create formation", error);
    }
  };
  const updateFormation = async (formation: Formation) => {
    try {
      return await RequestWithAuth(`/formations/${formation.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formation,
          companyId: formation.company.id,
          studentId: student.id,
        } as FormationRequest),
      });
    } catch (error) {
      console.error("Failed to update formation", error);
    }
  };
  const deleteFormation = async (formation: Formation) => {
    try {
      await RequestWithAuth(`/formations/${formation.id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };
  const createProject = async (project: Project) => {
    try {
      return await RequestWithAuth(`/projects`, {
        method: "POST",
        body: JSON.stringify({
          ...project,
          studentId: student.id,
        } as ProjectRequest),
      });
    } catch (error) {
      console.error("Failed to create project", error);
    }
  };
  const updateProject = async (project: Project) => {
    try {
      return await RequestWithAuth(`/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...project,
          studentId: student.id,
        } as ProjectRequest),
      });
    } catch (error) {
      console.error("Failed to update project", error);
    }
  };
  const deleteProject = async (project: Project) => {
    try {
      await RequestWithAuth(`/projects/${project.id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };
  const createCertificat = async (certificat: Certificat) => {
    try {
      return await RequestWithAuth(`/certificats`, {
        method: "POST",
        body: JSON.stringify({
          ...certificat,
          studentId: student.id,
        } as CertificatRequest),
      });
    } catch (error) {
      console.error("Failed to create certificat", error);
    }
  };
  const updateCertificat = async (certificat: Certificat) => {
    try {
      return await RequestWithAuth(`/certificats/${certificat.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...certificat,
          studentId: student.id,
        } as CertificatRequest),
      });
    } catch (error) {
      console.error("Failed to update certificat", error);
    }
  };
  const deleteCertificat = async (certificat: Certificat) => {
    try {
      await RequestWithAuth(`/certificats/${certificat.id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete certificat", error);
    }
  };

  useEffect(() => {
    // console.log("current user : ", currentUser);
    if (isAuthenticated && currentUser) {
      if (currentUser.role === Role.COMPANY) {
        getCompany(currentUser.id);
      } else if (currentUser.role === Role.STUDENT) {
        getStudent(currentUser.id);
      }
    }
  }, [isAuthenticated, currentUser]);

  return (
    <UserContext.Provider
      value={{
        company,
        setCompany,
        getCompany,
        companies,
        getCompanies,
        student,
        setStudent,
        getStudent,
        updateStudent,
        createExperience,
        updateExperience,
        deleteExperience,
        createFormation,
        updateFormation,
        deleteFormation,
        createProject,
        updateProject,
        deleteProject,
        createCertificat,
        updateCertificat,
        deleteCertificat,
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
