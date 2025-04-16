"use client";
import React, { useEffect, useRef, useState } from "react";
import { Eye, FolderOpenDot, ImageIcon, Link, Info } from "lucide-react";
import Overlay from "../Overlay";
import EditModal from "./EditModal";
import InputField from "../InputField";
import { Project, Role } from "@/types/types";
import toast from "react-hot-toast";
import CustomTooltip from "./CustomTooltip";
import ProjectInfos from "./ProjectInfos";
import { useUser } from "@/context/userContext";
import {
  deleteFileFromSupabase,
  uploadFileToSupabase,
} from "@/lib/supabaseStorage";
import { useAuth } from "@/context/authContext";

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
  const { currentUser } = useAuth();
  const { student, updateProject, deleteProject, isUserProfile } = useUser();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editedProject, setEditedProject] = useState<Project>({} as Project);
  const [file, setFile] = useState<File | null>(null);

  const handleCancel = () => {
    setEditedProject(project);
    setIsOpenModal(false);
  };

  const handleConfirm = async () => {
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

    if (file) {
      // Extract the filename from the URL
      const urlParts = editedProject.image.split("/");
      const filename = urlParts[urlParts.length - 1];

      console.log("filename : ", filename);
      // Delete from Supabase
      await deleteFileFromSupabase("images", decodeURIComponent(filename));
      console.log("File deleted");
      try {
        const publicUrl = await uploadFileToSupabase(file as File, {
          bucketName: "images",
          fileName: `project-${editedProject.title}-${student?.id}.${file?.name
            .split(".")
            .pop()}`,
        });
        const updatedProject = await updateProject({
          ...editedProject,
          image: publicUrl,
        });
        setEditedProject(updatedProject);
        setProjects(
          projects.map((p: Project) =>
            p.id === project.id ? updatedProject : p
          )
        );
      } catch (error) {
        toast.error("Failed to update project : " + error);
        return;
      }
    } else {
      const updatedProject = await updateProject(editedProject);
      setEditedProject(updatedProject);
      setProjects(
        projects.map((p: Project) => (p.id === project.id ? updatedProject : p))
      );
    }
    setIsOpenModal(false);
  };

  const getFullUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  };

  const handleDelete = async () => {
    try {
      // Extract the filename from the URL
      const urlParts = project.image.split("/");
      const filename = urlParts[urlParts.length - 1];

      console.log("filename : ", filename);
      // Delete from Supabase
      await deleteFileFromSupabase("images", decodeURIComponent(filename));

      // Delete from database
      await deleteProject(project);

      // Update state
      setProjects(projects.filter((p: Project) => p.id !== project.id));

      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  useEffect(() => {
    console.log("project : ", project);
    setEditedProject(project);
  }, [project]);

  return (
    <div className="rounded-lg flex flex-col justify-between border shadow-md hover:scale-105 transition-all duration-300">
      <div className="relative overflow-hidden w-full rounded-t-lg border-b-gray-300 border-[1px] group">
        <a
          href={getFullUrl(project.link)}
          target="_blank"
          rel="noopener noreferrer"
        >
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
            updateEditedProject={setEditedProject}
            setFile={setFile}
          />
        }
      />
    </div>
  );
};

export default ProjectContent;
