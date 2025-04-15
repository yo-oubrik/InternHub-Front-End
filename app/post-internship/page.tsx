"use client";
import PostInternshipForm from "@/components/Internship/PostInternshipForm";
import { isCompanyRole } from "@/utils/authUtils";
import { useAuth } from "@/context/authContext";
import { Role } from "@/types/types";
import { Unauthorized } from "@/components/Unauthorized";

function page() {
  const { currentUser } = useAuth();
  const isCompany = isCompanyRole(currentUser?.role as Role);

  return (
    (
      isCompany ? (
        <div className="flex flex-col py-10">
          <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-black">
            Create an Internship Post
          </h2>

          <div className="flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center">
            <PostInternshipForm />
          </div>
        </div>
      ) : (
      <Unauthorized/>
      )
    )
  );
}

export default page;
