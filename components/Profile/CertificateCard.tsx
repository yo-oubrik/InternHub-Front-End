"use client";
import React, { useEffect, useState } from "react";
import PlusButton from "../PlusButton";
import CertificatContent from "./CertificatContent";
import { Certificat } from "@/types/types";
import EditModal from "./EditModal";
import CertificatInfos from "./CertificatInfos";
import toast from "react-hot-toast";
import { useUser } from "@/context/userContext";

const CertificateCard = () => {
  // const initialCertificats: Certificat[] = [
  //   {
  //     id: "1",
  //     title: "Machine Learning Specialization",
  //     thumbnail: "Certificates/Cisco_Networks.jpg",
  //     date: "2023"
  //   },
  //   {
  //     id: "2",
  //     title: "CISCO",
  //     thumbnail: "Certificates/Cisco_Security.jpg",
  //     date: "2024"
  //   }
  // ];

  const { student , createCertificat , updateCertificat , deleteCertificat } = useUser();
  const [certificats, setCertificats] = useState<Certificat[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newCertificat, setNewCertificat] = useState<Certificat>({
    id: "",
    title: "",
    thumbnail: "",
    date: ""
  });

  const handleCertificatUpdate = (updatedCertificat: Certificat) => {
    updateCertificat(updatedCertificat);
    setCertificats(
      (prevCertificats) => 
        prevCertificats.map((certificat) => (certificat.id === updatedCertificat.id ? updatedCertificat : certificat))
    );
  };

  const handleCancel = () => {
    setNewCertificat({
      id: "",
      title: "",
      thumbnail: "",
      date: ""
    });
    setIsOpenModal(false);
  };

  const handleConfirm = async () => {
    if (!newCertificat.title.trim()) {
      toast.error("Please enter a certificate title");
      return;
    }

    // if (!newCertificat.thumbnail) {
    //   toast.error("Please upload a certificate image");
    //   return;
    // }


    const result = await createCertificat(newCertificat);
    setCertificats((prev: Certificat[]) => [...prev, result]);
    setIsOpenModal(false);
    setNewCertificat({
      id: "",
      title: "",
      thumbnail: "",
      date: ""
    });
  };
  
  useEffect(() => {
    if (student.certificates) {
      setCertificats(student.certificates);
    }
  }, [student.certificates]);

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
            setCertificats={setCertificats}
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
