"use client";
import NotFound from "@/components/not-found";
import CertificateCard from "@/components/Profile/CertificateCard";
import ExperienceCard from "@/components/Profile/ExperienceCard";
import FormationCard from "@/components/Profile/FormationCard";
import InfosCard from "@/components/Profile/InfosCard";
import PortfolioCard from "@/components/Profile/PortfolioCard";
import ProjectCard from "@/components/Profile/ProjectCard";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
import { error } from "console";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const page = () => {
  const params = useParams();
  const studentId = params.id.toString();

  const { currentUser, loading, setLoading } = useAuth();
  const { checkIsUserProfile, getStudent, setStudent, student } = useUser();

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      const response = await getStudent(studentId);
      if (student) {
        setStudent(response);
      }
      checkIsUserProfile(studentId);
      setLoading(false);
    };
    fetchStudent();
  }, [studentId, currentUser]);

  return student && Object.keys(student).length > 0 ? (
    <div className="py-11 flex flex-col gap-5">
      <PortfolioCard />
      <InfosCard />
      <ExperienceCard />
      <FormationCard />
      <ProjectCard />
      <CertificateCard />
    </div>
  ) : (
    <NotFound
      title="User Not Found"
      text="The User you are looking for does not exist."
    />
  );
};

export default page;
