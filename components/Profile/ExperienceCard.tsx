"use client";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
import { Experience, Role } from "@/types/types";
import { isStudentRole } from "@/utils/authUtils";
import { useEffect, useState } from "react";
import PlusButton from "../PlusButton";
import ExperienceInfos from "./ExperienceInfos";

const ExperienceCard = () => {
  const { student } = useUser();
  const { currentUser } = useAuth();
  const isStudent = isStudentRole(currentUser?.role as Role);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [wantToAdd, setWantToAdd] = useState<boolean>(false);

  useEffect(() => {
    if (student?.experiences) {
      setExperiences(student?.experiences);
    }
  }, [student?.experiences]);

  return (
    <div className="bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-[90%] mx-auto space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-gray-800 font-medium">Experience</h2>
      </div>
      <div className="px-4 space-y-4">
        {experiences.map((experience) => (
          <ExperienceInfos
            key={experience.id}
            object={experience}
            setExperiences={setExperiences}
            setWantToAdd={setWantToAdd}
            FLAG="VIEW"
          />
        ))}
        {isStudent &&
          (wantToAdd ? (
            <ExperienceInfos
              object={null}
              setWantToAdd={setWantToAdd}
              setExperiences={setExperiences}
              FLAG="NEW"
            />
          ) : (
            <PlusButton onClick={() => setWantToAdd(true)} />
          ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
