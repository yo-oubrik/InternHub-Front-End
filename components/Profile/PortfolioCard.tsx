"use client";
import React, { useRef, useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import {
  Mail,
  MapPinHouse,
  Pencil,
  Phone,
  RotateCcw,
  University,
  UserPen,
} from "lucide-react";
import { Separator } from "../ui/separator";
import Overlay from "../Overlay";
import AnimatedSocialButton from "./AnimatedSocialButton";
import { useUser } from "@/context/userContext";
import {
  uploadFileToSupabase,
  deleteFileFromSupabase,
} from "@/lib/supabaseStorage";
import toast from "react-hot-toast";
import EditModal from "./EditModal";
import PortfolioInfos from "./PortfolioInfos";

const PortfolioCard = () => {
  const { student, setStudent, updateStudent, isUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log("is user profile", isUserProfile);

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isUserProfile) return;

    const file = event.target.files?.[0];
    if (file) {
      deleteFileFromSupabase(
        "images",
        student.profilePicture?.split(".").pop() || ""
      );

      try {
        // Upload file to Supabase
        const publicUrl = await uploadFileToSupabase(file, {
          bucketName: "images",
          fileName: `profile-picture-${student?.id}-${Date.now()}.${file.name
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
        toast.error("Failed to upload profile picture:" + error);
        // Handle error (show toast, alert, etc.)
      }
    }
  };

  const handleAvatarClick = () => {
    if (!isUserProfile) return;
    fileInputRef.current?.click();
  };

  const handleResetImage = async (e: React.MouseEvent) => {
    if (!isUserProfile) return;
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
                    isUserProfile ? (
                      <Overlay children={<UserPen className="w-20 h-20" />} />
                    ) : undefined
                  }
                />
              </div>
              {isUserProfile && student?.profilePicture && (
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
        {isUserProfile && (
          <Pencil
            className="absolute top-4 right-4 text-primary h-7 w-7 hover:text-primary-hover cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}
        <div className="flex flex-col gap-5 justify-between h-full text-lg">
          <div className="flex flex-col gap-3">
            <div className="flex justify-start items-center gap-3">
              <University className="mb-2" />
              <p>{student?.school || "Not set"}</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Mail />
              <p>{student?.email}</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Phone />
              <p>{student?.tel ?? "Not set"}</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <MapPinHouse />
              <p>
                {student?.location
                  ? (student?.location?.address ?? "") +
                    ", " +
                    (student?.location?.city ?? "") +
                    ", " +
                    (student?.location?.country ?? "")
                  : "Not set"}
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
          title="Modify Your Infos"
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
