"use client";
import { Pencil, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import PlusButton from "../PlusButton";
import { Experience, Role } from "@/types/types";
import { useUser } from "@/context/userContext";
import { useAuth } from "@/context/authContext";
import ExperienceInfos from "./ExperienceInfos";

const ExperienceCard = () => {
  const { student, isUserProfile } = useUser();
  const { currentUser } = useAuth();

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
        {experiences.length === 0 && !isUserProfile && (
          <div className="col-span-4 text-center">
            <p className="text-lg text-gray-600">No Experiences found.</p>
          </div>
        )}
        {experiences.map((experience) => (
          <ExperienceInfos
            key={experience.id}
            object={experience}
            setExperiences={setExperiences}
            setWantToAdd={setWantToAdd}
            FLAG="VIEW"
          />
        ))}
        {isUserProfile &&
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
