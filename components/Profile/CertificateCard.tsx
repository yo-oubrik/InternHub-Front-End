"use client";
import React, { useEffect, useState } from "react";
import PlusButton from "../PlusButton";
import CertificatContent from "./CertificatContent";
import { Certificat, Role } from "@/types/types";
import EditModal from "./EditModal";
import CertificatInfos from "./CertificatInfos";
import toast from "react-hot-toast";
import { useUser } from "@/context/userContext";
import { useAuth } from "@/context/authContext";
import { uploadFileToSupabase } from "@/lib/supabaseStorage";

const CertificateCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const { student, createCertificat, updateCertificat, isUserProfile } =
    useUser();
  const { currentUser } = useAuth();
  const [certificats, setCertificats] = useState<Certificat[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newCertificat, setNewCertificat] = useState<Certificat>(
    {} as Certificat
  );

  const handleCertificatUpdate = (updatedCertificat: Certificat) => {
    if (!isUserProfile) return;
    updateCertificat(updatedCertificat);
    setCertificats((prevCertificats) =>
      prevCertificats.map((certificat) =>
        certificat.id === updatedCertificat.id ? updatedCertificat : certificat
      )
    );
  };

  const handleCancel = () => {
    setNewCertificat({
      id: "",
      title: "",
      thumbnail: "",
      date: "",
    });
    setIsOpenModal(false);
  };

  const handleConfirm = async () => {
    if (!isUserProfile) return;
    if (!newCertificat.title) {
      toast.error("Please enter a certificat title");
      return;
    }

    if (!newCertificat.thumbnail || !file) {
      toast.error("Please upload your certificat image");
      return;
    }

    if (!newCertificat.date) {
      toast.error("Please enter a year when you obtain your certificat");
      return;
    }

    try {
      const publicUrl = await uploadFileToSupabase(file as File, {
        bucketName: "images",
        fileName: `certificate-${newCertificat.title}-${
          student?.id
        }-${Date.now()}.${newCertificat.thumbnail.split(".").pop()}`,
      });
      const result = await createCertificat({
        ...newCertificat,
        thumbnail: publicUrl,
      });
      if (!result) toast.error("Failed to create certificate");
      toast.success("Certificate created successfully");
      setCertificats((prev: Certificat[]) => [...prev, result]);
    } catch (error) {
      toast.error("Failed to create certificate : " + error);
    } finally {
      window.location.reload();
    }
    setIsOpenModal(false);
    setNewCertificat({
      id: "",
      title: "",
      thumbnail: "",
      date: "",
    });
  };

  useEffect(() => {
    if (student?.certificates) {
      setCertificats(student?.certificates);
    }
  }, [student?.certificates]);

  return (
    <div className="bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-full space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-gray-800 font-medium">Certificates</h2>
      </div>
      <div className="px-4 gap-6 grid grid-cols-4">
        {certificats.map((certificat) => (
          <CertificatContent
            key={certificat?.id}
            certificat={certificat}
            certificats={certificats}
            setCertificats={setCertificats}
          />
        ))}
        {certificats.length === 0 && !isUserProfile && (
          <div className="col-span-4 text-center">
            <p className="text-lg text-gray-600">No certificates found.</p>
          </div>
        )}
        {isUserProfile && (
          <div className="w-1/2 h-full" onClick={() => setIsOpenModal(true)}>
            <PlusButton className="w-full h-full" />
          </div>
        )}
      </div>

      {isUserProfile && (
        <EditModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          className="bg-white max-w-xl min-h-[60vh] flex flex-col"
          title="Add New Certificate"
          titleClassName="text-2xl font-medium"
          cancelButton="Cancel"
          cancelButtonClassName="bg-gray-200 text-black hover:bg-gray-300"
          onCancel={handleCancel}
          confirmButton="Add"
          confirmButtonClassName="bg-primary w-20 text-white hover:bg-primary-hover"
          onConfirm={handleConfirm}
          body={
            <CertificatInfos
              editedCertificat={newCertificat}
              updateEditedCertificat={setNewCertificat}
              isNewCertificat={true}
              setFile={setFile}
            />
          }
        />
      )}
    </div>
  );
};

export default CertificateCard;
