import { InternshipType, SalaryType, WorkMode } from "@prisma/client";

interface Internship {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  duration : number ;
  salaryType: SalaryType ;
  negotiable: boolean;
  renumerated : boolean ; 
  workMode: WorkMode;
  tags: InternshipType[] ;
  likes: string[];
  skills: string[];
  applicants: string[];
  createdBy: {
    _id: string;
    profilePicture: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
interface User {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
}

export type { Internship , User };
