"use client";
import React, { useRef } from "react";
import { FolderOpenDot, ImageIcon, Link, Info } from "lucide-react";
import InputField from "../InputField";
import { Project } from "@/types/types";
import CustomTooltip from "./CustomTooltip";

interface ProjectInfosProps {
  editedProject: Project;
  updateEditedProject: (project: Project) => void;
  isNewProject?: boolean;
}

const ProjectInfos: React.FC<ProjectInfosProps> = ({
  editedProject,
  updateEditedProject,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateEditedProject({ ...editedProject, link: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed h-72 flex flex-col items-center justify-center border-gray-300 rounded-lg bg-background p-2 hover:border-primary cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const file = e.dataTransfer.files[0];
          if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                updateEditedProject({
                  ...editedProject,
                  image: e.target.result as string,
                });
              }
            };
            reader.readAsDataURL(file);
          }
        }}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                if (e.target?.result) {
                  updateEditedProject({
                    ...editedProject,
                    image: e.target.result as string,
                  });
                }
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {editedProject.image ? (
          <img
            src={editedProject.image}
            alt="Project preview"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-40 space-y-2">
            <ImageIcon className="w-12 h-12 text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag and drop an image here, or click to select
            </p>
          </div>
          
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="group flex items-center gap-2 w-full">
          <FolderOpenDot className="text-black group-focus-within:text-primary transition-colors" />
          <InputField
            type="text"
            placeholder="Give a name to your project"
            value={editedProject.title}
            className="w-full focus:outline-none focus:ring-1 focus:ring-primary rounded-md focus:text-black text-muted-foreground placeholder:text-muted-foreground"
            onChange={(e) =>
              updateEditedProject({ ...editedProject, title: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="group flex items-center gap-2 w-full">
          <Link className="text-black group-focus-within:text-primary transition-colors"/>
          <InputField
            type="text"
            placeholder="Link to your project"
            value={editedProject.link}
            className="w-full focus:outline-none focus:ring-1 focus:ring-primary rounded-md focus:text-black text-muted-foreground placeholder:text-muted-foreground"
            onChange={handleLinkChange}
          />
          <CustomTooltip
            trigger={<Info className="w-4 h-4 text-gray-400 cursor-help" />}
            content={
              <div className="space-y-2">
                <p className="font-medium">URL Format Guidelines:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>URLs must begin with https:// or http://</li>
                  <li>HTTPS is recommended for security</li>
                  <li>Most modern sites support both protocols</li>
                  <li>Example: https://www.example.com</li>
                </ul>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectInfos; 