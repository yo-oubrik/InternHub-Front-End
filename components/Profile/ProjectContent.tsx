"use client";
import React, { useRef, useState } from "react";
import { Eye, FolderOpenDot, ImageIcon, Link, Info } from "lucide-react";
import Overlay from "../Overlay";
import EditModal from "./EditModal";
import InputField from "../InputField";
import { Project } from "@/types/types";
import toast from "react-hot-toast"
import CustomTooltip from "./CustomTooltip";
import ProjectInfos from "./ProjectInfos";

interface ProjectContentProps {
  project: Project;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const ProjectContent: React.FC<ProjectContentProps> = ({
  project,
  projects,
  setProjects,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editedProject, setEditedProject] = useState<Project>(project);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    setEditedProject(project);
    setIsOpenModal(false);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProject({ ...editedProject, link: e.target.value });
  };

  const handleConfirm = () => {
    if (!editedProject.title.trim()) {
      toast.error("Please enter a project title");
      return;
    }

    if (!editedProject.link.trim()) {
      toast.error("Please enter a project link");
      return;
    }

    try {
      new URL(editedProject.link);
    } catch (error) {
      toast.error("Please enter a valid URL");
      return;
    }

    if (!editedProject.image) {
      toast.error("Please add a project image");
      return;
    }

    setProjects(projects.map((p: Project) => (p.id === project.id ? editedProject : p)));
    setIsOpenModal(false);
  };

  const updateEditedProject = (updatedProject: Project) => {
    setEditedProject(updatedProject);
  };

  const getFullUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  return (
    <div className="rounded-lg flex flex-col justify-between border shadow-md hover:scale-105 transition-all duration-300">
      <div className="relative overflow-hidden w-full rounded-t-lg border-b-gray-300 border-[1px] group">
        <a href={getFullUrl(project.link)} target="_blank" rel="noopener noreferrer">
          <img
            src={project.image}
            alt="Thumbnail"
            className="w-full h-40 object-cover group-hover:rotate-2 group-hover:scale-110 duration-100 ease-in cursor-pointer"
          />
          <Overlay
            children={<Eye className="w-14 h-14 text-primary-hover" />}
          />
        </a>
      </div>

      <div className="text-base font-medium text-start px-2 mt-4 mb-6">
        {project.title}
      </div>

      <div className="flex w-full font-medium text-primary divide-x-2 divide-primary-hover text-center border-t-primary-hover border-t-[2px]">
        <div
          className="w-full rounded-bl-lg py-2 cursor-pointer hover:bg-primary hover:text-white"
          onClick={() => setIsOpenModal(true)}
        >
          Edit
        </div>
        <div
          className="w-full rounded-br-lg py-2 cursor-pointer hover:bg-primary hover:text-white"
        >
          Delete
        </div>
      </div>
      <EditModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        className="bg-white max-w-xl min-h-[60vh] flex flex-col"
        title="Edit Project"
        titleClassName="text-2xl font-medium"
        cancelButton="Cancel"
        cancelButtonClassName="bg-gray-200 text-black hover:bg-gray-300"
        onCancel={handleCancel}
        confirmButton="Edit"
        confirmButtonClassName="bg-primary w-20 text-white hover:bg-primary-hover"
        onConfirm={handleConfirm}
        body={
          <ProjectInfos
            editedProject={editedProject}
            updateEditedProject={updateEditedProject}
          />
        }
      />
    </div>
  );
};

export default ProjectContent;