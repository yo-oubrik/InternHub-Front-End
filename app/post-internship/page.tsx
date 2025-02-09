"use client";
import Form from "@/Components/Internship/Form";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

function page() {
  //const { isAuthenticated, loading } = useAuth();
  //const router = useRouter();

  //useEffect(() => {
  //if (!loading && !isAuthenticated) {
  //router.push("http://localhost:3000/api/auth/login");
  //}
  //}, [isAuthenticated]);
  return (
    <div className="flex flex-col py-10">
      <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-black">
        Create an Internship Post
      </h2>

      <div className="flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center">
        <Form />
      </div>
    </div>
  );
}

export default page;
