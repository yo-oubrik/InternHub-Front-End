"use client";

import React, { useEffect, useState } from "react";
import { Calendar, FileDown } from "lucide-react";
import Overlay from "../Overlay";
import EditModal from "./EditModal";
import { Certificat, Role } from "@/types/types";
import toast from "react-hot-toast";
import CertificatInfos from "./CertificatInfos";
import { useUser } from "@/context/userContext";
import {
  deleteFileFromSupabase,
  uploadFileToSupabase,
} from "@/lib/supabaseStorage";
import { useAuth } from "@/context/authContext";

interface CertificatContentProps {
  certificat: Certificat;
  certificats: Certificat[];
  setCertificats: (certificats: Certificat[]) => void;
}

const CertificatContent: React.FC<CertificatContentProps> = ({
  certificat,
  certificats,
  setCertificats,
}) => {
  const { currentUser } = useAuth();
  const { student, updateCertificat, deleteCertificat, isUserProfile } =
    useUser();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editedCertificat, setEditedCertificat] =
    useState<Certificat>(certificat);
  const [file, setFile] = useState<File | null>(null);

  const handleCancel = () => {
    setEditedCertificat(certificat);
    setIsOpenModal(false);
  };

  const handleConfirm = async () => {
    if (!editedCertificat.title) {
      toast.error("Please enter a certificate title");
      return;
    }

    if (!editedCertificat.thumbnail) {
      toast.error("Please upload your certificat image");
      return;
    }

    if (!editedCertificat.date) {
      toast.error("Please enter the year when you obtain your certificat");
      return;
    }

    if (file) {
      // Extract the filename from the URL
      const urlParts = editedCertificat.thumbnail.split("/");
      const filename = urlParts[urlParts.length - 1];

      console.log("filename : ", filename);
      // Delete from Supabase
      await deleteFileFromSupabase("images", decodeURIComponent(filename));
      console.log("File deleted");
      try {
        const publicUrl = await uploadFileToSupabase(file as File, {
          bucketName: "images",
          fileName: `certificate-${editedCertificat.title}-${
            student?.id
          }-${Date.now()}.${file?.name.split(".").pop()}`,
        });
        const updatedCertificat = await updateCertificat({
          ...editedCertificat,
          thumbnail: publicUrl,
        });
        if (!updatedCertificat) toast.error("Failed to update certificate");
        toast.success("Certificate updated successfully");
        setEditedCertificat(updatedCertificat);
        setCertificats(
          certificats.map((c: Certificat) =>
            c.id === certificat.id ? updatedCertificat : c
          )
        );
      } catch (error) {
        toast.error("Failed to update certificate : " + error);
        return;
      }
    } else {
      const updatedCertificat = await updateCertificat(editedCertificat);
      setCertificats(
        certificats.map((c: Certificat) =>
          c.id === certificat.id ? updatedCertificat : c
        )
      );
    }
    window.location.reload();
    setIsOpenModal(false);
  };

  const handleDelete = async () => {
    try {
      // Extract the filename from the URL
      const urlParts = certificat.thumbnail.split("/");
      const filename = urlParts[urlParts.length - 1];

      console.log("filename : ", filename);
      // Delete from Supabase
      await deleteFileFromSupabase("images", decodeURIComponent(filename));
      console.log("File deleted");
      // Delete from database
      await deleteCertificat(certificat);
      // Update state
      setCertificats(
        certificats.filter((c: Certificat) => c.id !== certificat.id)
      );
      toast.success("Certificate deleted successfully");
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast.error("Failed to delete certificate");
    }
  };

  useEffect(() => {
    console.log("certificat : ", certificat);
    setEditedCertificat(certificat);
  }, [certificat]);

  return (
    <div className="rounded-lg flex flex-col justify-between border shadow-md hover:shadow-primary-hover hover:scale-105 transition-all duration-300">
      <div className="relative overflow-hidden w-full rounded-t-lg border-b-gray-300 border-[1px] group">
        <div className="cursor-pointer">
          <img
            src={certificat?.thumbnail}
            alt="certificat image"
            className="w-full h-40 object-cover group-hover:rotate-2 group-hover:scale-110 duration-100 ease-in"
          />
          <Overlay
            children={<FileDown className="w-14 h-14 text-primary-hover" />}
          />
        </div>
      </div>
      <div className="px-2 mt-4 mb-3 space-y-3">
        <div className="text-base font-medium text-start">
          {certificat?.title}
        </div>
        <div className="flex items-center justify-end gap-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{certificat?.date}</span>
        </div>
      </div>

      {isUserProfile && (
        <div className="flex w-full font-medium text-primary divide-x-2 divide-primary-hover text-center border-t-primary-hover border-t-[2px]">
          <div
            className="w-full rounded-bl-lg py-2 cursor-pointer hover:bg-primary hover:text-white"
            onClick={() => setIsOpenModal(true)}
          >
            Edit
          </div>
          <div
            className="w-full rounded-br-lg py-2 cursor-pointer hover:bg-primary hover:text-white"
            onClick={handleDelete}
          >
            Delete
          </div>
        </div>
      )}

      <EditModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        className="bg-white max-w-xl min-h-[60vh] flex flex-col"
        title="Edit Certificate"
        titleClassName="text-2xl font-medium"
        cancelButton="Cancel"
        cancelButtonClassName="bg-gray-200 text-black hover:bg-gray-300"
        onCancel={handleCancel}
        confirmButton="Edit"
        confirmButtonClassName="bg-primary w-20 text-white hover:bg-primary-hover"
        onConfirm={handleConfirm}
        body={
          <CertificatInfos
            editedCertificat={editedCertificat}
            updateEditedCertificat={setEditedCertificat}
            setFile={setFile}
          />
        }
      />
    </div>
  );
};

export default CertificatContent;
