"use client";
import React, { useEffect, useState } from "react";
import PlusButton from "../PlusButton";
import ProjectContent from "./ProjectContent";
import { Project, Role } from "@/types/types";
import EditModal from "./EditModal";
import ProjectInfos from "./ProjectInfos";
import toast from "react-hot-toast";
import { useUser } from "@/context/userContext";
import { useAuth } from "@/context/authContext";
import { isStudentRole } from '@/utils/authUtils';
import { uploadFileToSupabase } from "@/lib/supabaseStorage";

const ProjectCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const { student, createProject } = useUser();
  const { currentUser } = useAuth();
  const isStudent = isStudentRole(currentUser?.role as Role);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newProject, setNewProject] = useState<Project>({} as Project);

  const handleCancel = () => {
    setNewProject({
      id: "",
      title: "",
      image: "",
      link: "",
    });
    setIsOpenModal(false);
  };

  const handleConfirm = async () => {
    if (!newProject.title.trim()) {
      toast.error("Please enter a project title");
      return;
    }

    if (!newProject.link.trim()) {
      toast.error("Please enter a project link");
      return;
    }

    try {
      new URL(newProject.link);
    } catch (error) {
      toast.error("Please enter a valid URL");
      return;
    }

    if (!newProject.image) {
      toast.error("Please add a project image");
      return;
    }

    console.log('new project : ', newProject);
    try {

      const publicUrl = await uploadFileToSupabase(
        file as File,
        {
          bucketName: 'images',
          fileName: `project-${newProject.title}-${student?.id}.${newProject.image.split('.').pop()}`,
        }
      );
      const result = await createProject({
        ...newProject,
        image: publicUrl,
      });
      setProjects((prev: Project[]) => [...prev, result]);
    } catch (error) {
      toast.error("Failed to create project : " + error);
    }
    setIsOpenModal(false);
    setNewProject({
      id: "" ,
      title: "",
      image: "",
      link: "",
    });
  };

  useEffect(() => {
    if (student?.projects) {
      setProjects(student.projects);
    }
  }, [student.projects]);

  return (
    <div className="bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-[90%] mx-auto space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-gray-800 font-medium">Projects</h2>
      </div>
      <div className={`px-4 gap-6 grid grid-cols-4 ${projects.length > 0 ? 'grid-cols-1 text-center' : ''}`}>
        {
            projects.map((project) => (
            <ProjectContent
              key={project.id}
              project={project}
              projects={projects}
              setProjects={setProjects}
            />
            ))
        }
        {projects.length === 0 && !isStudent && (
          <div className="col-span-4 text-center">
            <p className="text-lg text-gray-600">No projects found.</p>
          </div>
        )}
        {isStudent && (
          <div className="w-1/2 h-full" onClick={() => setIsOpenModal(true)}>
            <PlusButton className="w-full h-full" />
          </div>
        )}
      </div>

      {isStudent && (
        <EditModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          className="bg-white max-w-xl min-h-[60vh] flex flex-col"
          title="Add New Project"
          titleClassName="text-2xl font-medium"
          cancelButton="Cancel"
          cancelButtonClassName="bg-gray-200 text-black hover:bg-gray-300"
          onCancel={handleCancel}
          confirmButton="Add"
          confirmButtonClassName="bg-primary w-20 text-white hover:bg-primary-hover"
          onConfirm={handleConfirm}
          body={
            <ProjectInfos
              editedProject={newProject}
              updateEditedProject={setNewProject}
              isNewProject={true}
              setFile={setFile}
            />
          }
        />
      )}
    </div>
  );
};

export default ProjectCard;
