"use client";
import PostInternshipForm from "@/components/Internship/Form";

function page() {
  return (
    <div className="flex flex-col py-10">
      <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-black">
        Create an Internship Post
      </h2>

      <div className="flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center">
        <PostInternshipForm />
      </div>
    </div>
  );
}

export default page;
