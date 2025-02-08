interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  salaryType: "Year" | "Month" | "Week" | "Hour";
  negotiable: boolean;
  jobType: string[];
  tags: string;
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

export type { Job, User };
