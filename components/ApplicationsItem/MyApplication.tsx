// "use client";
// import React, { useEffect } from "react";
// import Image from "next/image";
// import { formatDates } from "@/utils/fotmatDates";
// import { Pencil, Trash } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { bookmark, bookmarkEmpty } from "@/utils/Icons";
// import { useAuth } from "@/context/authContext";
// import axios from "axios";
// import { CardTitle } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Internship } from "@/types/types";

// interface InternshipProps {
//   internship: Internship;
// }

// function MyApplication({ internship }: InternshipProps) {
//   // const { deleteInternship, likeInternship } = useInternship();
//   // const { userProfile, getUserProfile } = useUser();
//   const { isAuthenticated } = useAuth();
//   const [isLiked, setIsLiked] = React.useState(false);

//   const router = useRouter();

//   const handleLike = (id: string) => {
//     // setIsLiked((prev) => !prev);
//     // likeInternship(id);
//   };

//   // useEffect(() => {
//     // if (isAuthenticated && internship.company?.id) {
//     //   getUserProfile(internship.company.id);
//     // }
//   // }, [isAuthenticated, internship.company?.id]);

//   // useEffect(() => {
//   //   if (userProfile?.id) {
//   //     setIsLiked(internship.likes.includes(userProfile?.id));
//   //   }
//   // }, [internship.likes, userProfile?.id]);

//   return (
//     <div className="p-8 bg-white rounded-xl flex flex-col gap-5">
//       <div className="flex justify-between">
//         <div
//           className="flex items-center space-x-4 mb-2 cursor-pointer"
//           onClick={() => router.push(`/internship/${internship.id}`)}
//         >
//           <Image
//             alt={`logo`}
//             src={internship.company?.profilePicture || "/user.png"}
//             width={48}
//             height={48}
//             className="rounded-full shadow-sm"
//           />

//           <div>
//             <CardTitle className="text-xl font-bold truncate">
//               {internship.title}
//             </CardTitle>
//             <p className="text-sm text-muted-foreground">
//               {internship.company?.name}
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-col items-center">
//           <button
//             className={`text-2xl ${isLiked ? "text-[#7263f3]" : "text-gray-400"
//               } `}
//             onClick={() => {
//               isAuthenticated
//                 ? handleLike(internship.id)
//                 : axios.get("http://localhost:3000/api/login"); {/* to check */ }
//             }}
//           >
//             {isLiked ? bookmark : bookmarkEmpty}
//           </button>
//           <div>{internship.likes.length}</div>
//         </div>
//       </div>
//       <div>
//         <p className="text-sm text-muted-foreground mb-2">{(internship.company?.location.address ?? "") +  (internship.company?.location.city ?? "") + (internship.company?.location.country ?? "")}</p>
//         <p className="text-sm text-muted-foreground mb-4">
//           Posted {formatDates(internship.createdAt)} {/* to check */}
//         </p>

//         <div className="flex justify-between">
//           <div>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {internship.skills.map((skill, index) => (
//                 <Badge key={index} variant="secondary">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {internship.tags.map((tag, index) => (
//                 <Badge key={index} variant="outline">
//                   {tag}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//           {/* {internship.company?.id === company?.id && ( */}
//             <div className="self-end">
//               <Button variant="ghost" size="icon" className="text-gray-500">
//                 <Pencil size={14} />
//                 <span className="sr-only">Edit internship</span>
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-500
//                 hover:text-red-500"
//                 // onClick={() => deleteInternship(internship.id)}
//               >
//                 <Trash size={14} />
//                 <span className="sr-only">Delete internship</span>
//               </Button>
//             </div>
//           {/* )} */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyApplication;
