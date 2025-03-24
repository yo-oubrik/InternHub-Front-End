"use client";
import React, { useState } from "react";
import PlusButton from "../PlusButton";
import CertificatContent from "./CertificatContent";
import { Certificat } from "@/types/types";
import EditModal from "./EditModal";
import CertificatInfos from "./CertificatInfos";
import toast from "react-hot-toast";

const CertificateCard = () => {
  const initialCertificats: Certificat[] = [
    {
      id: "1",
      title: "Machine Learning Specialization",
      thumbnail: "Certificates/Cisco_Networks.jpg",
      date: "2023"
    },
    {
      id: "2",
      title: "CISCO",
      thumbnail: "Certificates/Cisco_Security.jpg",
      date: "2024"
    }
  ];

  const [certificats, setCertificats] = useState<Certificat[]>(initialCertificats);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newCertificat, setNewCertificat] = useState<Certificat>({
    id: Date.now().toString(),
    title: "",
    thumbnail: "",
    date: ""
  });

  const handleCertificatUpdate = (updatedCertificats: Certificat[]) => {
    setCertificats(updatedCertificats);
  };

  const handleCancel = () => {
    setNewCertificat({
      id: Date.now().toString(),
      title: "",
      thumbnail: "",
      date: ""
    });
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    if (!newCertificat.title.trim()) {
      toast.error("Please enter a certificate title");
      return;
    }

    if (!newCertificat.thumbnail) {
      toast.error("Please upload a certificate image");
      return;
    }

    setCertificats([...certificats, newCertificat]);
    setIsOpenModal(false);
    setNewCertificat({
      id: Date.now().toString(),
      title: "",
      thumbnail: "",
      date: ""
    });
  };

  return (
    <div className="bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-[90%] mx-auto space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-gray-800 font-medium">Certificates</h2>
      </div>
      <div className="px-4 gap-6 grid grid-cols-4">
        {certificats.map((certificat) => (
          <CertificatContent
            key={certificat.id}
            certificat={certificat}
            certificats={certificats}
            setCertificats={handleCertificatUpdate}
          />
        ))}
        <div className="w-1/2 h-full" onClick={() => setIsOpenModal(true)}>
          <PlusButton className="w-full h-full" />
        </div>
      </div>

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
          />
        }
      />
    </div>
  );
};

export default CertificateCard;
