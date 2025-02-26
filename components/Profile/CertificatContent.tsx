"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF
import { FileDown } from "lucide-react";
import Overlay from "../Overlay";

interface CertificatContentProps {
  title: string;
  img: string;
  date: string;
}

const CertificatContent: React.FC<CertificatContentProps> = ({ title, img, date }) => {

  const imgToPDF = async () => {
    try {

      const doc = new jsPDF();
      const image = new Image();
      image.src = img;
      image.onload = () => {
        doc.addImage(image, "JPEG", 10, 10, 180, 0); 
        doc.save(`${title}.pdf`);
      };
      image.onerror = (err) => {
      };
    } catch (err) {
      console.error("Error creating PDF:", err);
    }
  };

  return (
    <div className="rounded-lg flex flex-col justify-between border shadow-md">
      <div className="relative overflow-hidden w-full rounded-t-lg border-b-gray-300 border-[1px] group">
        <img
          src={img}
          alt="Thumbnail"
          className="w-full rounded-t-lg h-40 object-cover group-hover:rotate-6 group-hover:scale-110 duration-100 ease-in cursor-pointer"
          onClick={imgToPDF}
        />
        <Overlay children={<FileDown className="w-14 h-14 text-primary-hover" />}/>
      </div>

      <div className="px-2 space-y-4 pt-2 my-2">
        <p className="text-base font-medium text-start">{title}</p>
        <p className="text-base text-end text-gray-500">{date}</p>
      </div>

      <div className="flex w-full font-medium text-primary divide-x-2 divide-primary-hover text-center border-t-primary-hover border-t-[2px]">
        <div className="w-full rounded-bl-lg py-2 cursor-pointer hover:bg-primary hover:text-white">Edit</div>
        <div className="w-full rounded-br-lg py-2 cursor-pointer hover:bg-primary hover:text-white" onClick={imgToPDF}>Download</div>
      </div>
    </div>
  );
};

export default CertificatContent;
