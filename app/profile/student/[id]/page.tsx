"use client";
import CertificateCard from "@/components/Profile/CertificateCard";
import ExperienceCard from "@/components/Profile/ExperienceCard";
import FormationCard from "@/components/Profile/FormationCard";
import InfosCard from "@/components/Profile/InfosCard";
import PortfolioCard from "@/components/Profile/PortfolioCard";
import ProjectCard from "@/components/Profile/ProjectCard";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { currentUser } = useAuth();
  const params = useParams();
  const studentId = params.id.toString();
  const { checkIsUserProfile, getStudent } = useUser();
  useEffect(() => {
    checkIsUserProfile(studentId);
    getStudent(studentId);
  }, []);
  return (
    <div className="py-11 flex flex-col gap-5">
      <PortfolioCard />
      <InfosCard />
      <ExperienceCard />
      <FormationCard />
      <ProjectCard />
      <CertificateCard />
    </div>
  );
};

export default page;
