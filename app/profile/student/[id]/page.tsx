"use client";
import InputField from "@/components/InputField";
import NotFound from "@/components/not-found";
import CertificateCard from "@/components/Profile/CertificateCard";
import EditModal from "@/components/Profile/EditModal";
import ExperienceCard from "@/components/Profile/ExperienceCard";
import { FlagStudentDialog } from "@/components/Profile/FlagStudentDialog";
import FormationCard from "@/components/Profile/FormationCard";
import InfosCard from "@/components/Profile/InfosCard";
import PortfolioCard from "@/components/Profile/PortfolioCard";
import ProjectCard from "@/components/Profile/ProjectCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
import { StudentFlag } from "@/types/types";
import { AlertTriangle, X, Flag } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const studentId = params.id.toString();
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const { currentUser, loading, setLoading } = useAuth();
  const [ flagReason , setFlagReason ] = useState("");
  const [ flagDescription , setFlagDescription ] = useState("");
  const { checkIsUserProfile, getStudent, setStudent, student, isUserProfile } =
    useUser();

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

  const handleFlagUser = () => {
    setIsFlagModalOpen(true);
  };

  const scrollToFlag = () => {
    document
      .getElementById("flag-button")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return student && Object.keys(student).length > 0 ? (
    <div className="py-11 flex flex-col gap-5 px-14">
      {showAlert && !isUserProfile && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <p className="text-yellow-700">
              If you consider this user as fake or suspicious, you can flag it
              by{" "}
              <button
                onClick={scrollToFlag}
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                clicking here
              </button>{" "}
              to report it at the bottom of the profile.
            </p>
          </div>
          <button
            onClick={() => setShowAlert(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      <PortfolioCard />
      <InfosCard />
      <ExperienceCard />
      <FormationCard />
      <ProjectCard />
      <CertificateCard />
      {!isUserProfile && (
        <div className="flex justify-center mt-8">
          <Button
            id="flag-button"
            variant="destructive"
            className="flex items-center gap-2"
            onClick={handleFlagUser}
          >
            <Flag className="h-4 w-4" />
            Flag this user as suspicious
          </Button>
        </div>
      )}
      <EditModal
        isOpenModal={isFlagModalOpen}
        setIsOpenModal={setIsFlagModalOpen}
        className="bg-white max-w-lg flex flex-col text-black"
        title="Flag Student as Suspicious"
        titleClassName="text-xl font-medium"
        cancelButton="Cancel"
        cancelButtonClassName="bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
        onCancel={() => setIsFlagModalOpen(false)}
        confirmButton="Submit Flag"
        confirmButtonClassName="bg-red-600 hover:bg-red-700 text-white"
        onConfirm={() => {
          // Handle flag submission
          setIsFlagModalOpen(false);
          alert("Thank you for your report. Our team will review it shortly.");
        }}
        body={
          <div className="flex flex-col gap-6">
            <div className="bg-gray-100 p-4 -mx-6 -mt-2 border-b border-gray-200">
              <div className="flex gap-3 items-start">
                <div className="bg-orange-600 p-2 rounded-md">
                  <AlertTriangle className="text-white h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Please provide details</p>
                  <p className="text-sm text-gray-500">
                    Explain why you believe this user as suspicious or fake
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="flag-reason">Reason</Label>
                <InputField
                  type="text"
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  placeholder="Select reason..."
                  className="w-full bg-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="flag-description">Description</Label>
                <Textarea
                  value={flagDescription}
                  onChange={(e) => setFlagDescription(e.target.value)}
                  placeholder="Please provide specific details about why you are flagging this company..."
                  className="w-full bg-white"
                />
              </div>

              <div className="bg-yellow-50 p-3 rounded-md text-sm">
                <p className="font-medium text-yellow-800 mb-1">
                  Important Information
                </p>
                <ul className="list-disc list-inside text-yellow-700 space-y-1">
                  <li>
                    Repeatedly flagging legitimate users may result in your
                    account being restricted
                  </li>
                  <li>
                    Please provide specific details that can help us investigate
                  </li>
                  <li>Our team will review your report within 48 hours</li>
                </ul>
              </div>
            </div>
          </div>
        }
      /> 
    </div>
  ) : (
    <NotFound
      title="User Not Found"
      text="The User you are looking for does not exist."
    />
  );
};

export default page;
