"use client";
import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
import {
  deleteFileFromSupabase,
  uploadFileToSupabase,
} from "@/lib/supabaseStorage";
import { Role } from "@/types/types";
import { isStudentRole } from "@/utils/authUtils";
import {
  Mail,
  MapPinHouse,
  Pencil,
  Phone,
  RotateCcw,
  University,
  UserPen,
} from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import Overlay from "../Overlay";
import { Separator } from "../ui/separator";
import AnimatedSocialButton from "./AnimatedSocialButton";
import EditModal from "./EditModal";
import PortfolioInfos from "./PortfolioInfos";
import ProfileAvatar from "./ProfileAvatar";

const PortfolioCard = () => {
  const { student, setStudent, updateStudent } = useUser();
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isStudent = isStudentRole(currentUser?.role as Role);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isStudent) return;

    const file = event.target.files?.[0];
    if (file) {
      try {
        // Upload file to Supabase
        const publicUrl = await uploadFileToSupabase(file, {
          bucketName: "images",
          // pop() to get the file extension
          fileName: `profile-picture-${student?.id}.${file.name
            .split(".")
            .pop()}`,
        });
        // Update student? with the new profile picture URL
        updateStudent({
          ...student,
          profilePicture: publicUrl,
        });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        toast.error("Failed to upload profile picture");
        // Handle error (show toast, alert, etc.)
      }
    }
  };

  const handleAvatarClick = () => {
    if (!isStudent) return;
    fileInputRef.current?.click();
  };

  const handleResetImage = async (e: React.MouseEvent) => {
    if (!isStudent) return;
    e.stopPropagation();
    if (student?.profilePicture) {
      try {
        // Extract filename from URL
        const filename = student?.profilePicture.split("/").pop() || "";
        // Delete from Supabase
        await deleteFileFromSupabase("images", filename);
        // Update student?
        updateStudent({
          ...student,
          profilePicture: "",
        });
      } catch (error) {
        console.error("Error deleting profile picture:", error);
        toast.error("Failed to delete profile picture:" + error);
        // Handle error (show toast, alert, etc.)
      }
    } else {
      setStudent({
        ...student,
        profilePicture: "",
      });
    }
  };

  const links = {
    github: "profile/github.png",
    linkedin:
      "data:image/png;base64,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",
    portfolio: "profile/portfolio_link.png",
    cv: "profile/cv_link.png",
  };

  return (
    <div className="flex flex-row-reverse gap-2 w-[90%] mx-auto">
      <div className="flex flex-col items-center gap-2 bg-gray-50 border-primary-hover shadow-sm py-4 px-5 rounded-lg w-[30%]">
        <div className="flex-row-reverse flex justify-around items-center">
          <div className="flex flex-col items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageSelect}
            />
            <div className="relative group">
              <div onClick={handleAvatarClick} className="cursor-pointer">
                <ProfileAvatar
                  className="w-56 h-56 text-5xl bg-gray-400 relative overflow-hidden group"
                  avatarImage={student?.profilePicture ?? ""}
                  avatarFallback={
                    student?.firstName.charAt(0).toUpperCase() +
                    student?.lastName.charAt(0).toUpperCase()
                  }
                  overlay={
                    isStudent ? (
                      <Overlay children={<UserPen className="w-20 h-20" />} />
                    ) : undefined
                  }
                />
              </div>
              {isStudent && student?.profilePicture && (
                <div
                  onClick={handleResetImage}
                  className="absolute -bottom-2 right-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold">
                {student?.firstName + " " + student?.lastName}
              </h1>
              <h3 className="font-mono">{student?.profileTitle}</h3>
            </div>
          </div>
        </div>
        {/* <button className="w-[85%] hover:bg-opacity-80 border-gray-400 border-[1px] bg-gray-200 py-1 rounded-md">Edit profile</button> */}
      </div>
      <div className="bg-gray-50 relative border-primary-hover py-7 px-10 shadow-sm rounded-lg w-[70%]">
        {isStudent && (
          <Pencil
            className="absolute top-4 right-4 text-primary h-7 w-7 hover:text-primary-hover cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}
        <div className="flex flex-col gap-5 justify-between h-full text-lg">
          <div className="flex flex-col gap-3">
            <div className="flex justify-start items-center gap-3">
              <University className="mb-2" />
              <p>{student?.school}</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Mail />
              <p>{student?.email}</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Phone />
              <p>{student?.tel}</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <MapPinHouse />
              <p>
                {student?.location &&
                  (student?.location?.address ?? "") +
                    ", " +
                    (student?.location?.city ?? "") +
                    ", " +
                    (student?.location?.country ?? "")}
              </p>
            </div>
          </div>
          <Separator className="h-[1px] bg-primary-hover mt-4" />
          <div className="flex w-full justify-between items-center">
            <AnimatedSocialButton
              href={student?.links?.github ?? ""}
              platform="github"
              disabled={!student?.links?.github && true}
            />
            <AnimatedSocialButton
              href={student?.links?.linkedin ?? ""}
              platform="linkedin"
              disabled={!student?.links?.linkedin && true}
            />
            <AnimatedSocialButton
              href={student?.links?.website ?? ""}
              platform="portfolio"
              disabled={!student?.links?.website && true}
            />
          </div>
        </div>
      </div>
      {isEditing && (
        <EditModal
          isOpenModal={isEditing}
          setIsOpenModal={setIsEditing}
          className="bg-white max-w-xl min-h-[60vh] flex flex-col"
          title="Add New Project"
          titleClassName="text-2xl font-medium"
          cancelButton="Cancel"
          cancelButtonClassName="bg-gray-200 text-black hover:bg-gray-300"
          onCancel={() => setIsEditing(false)}
          confirmButton="Edit"
          confirmButtonClassName="bg-primary w-20 text-white hover:bg-primary-hover"
          onConfirm={() => {
            updateStudent(student);
            setIsEditing(false);
          }}
          body={<PortfolioInfos />}
        />
      )}
    </div>
  );
};

export default PortfolioCard;
