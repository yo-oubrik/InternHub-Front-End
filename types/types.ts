export type Links = {
  motivationLetter?: string;
  linkedin?: string;
  github?: string;
  cv?: string;
  website?: string;
  twitter?: string;
};

export enum Role {
  STUDENT = "STUDENT",
  COMPANY = "COMPANY",
  ADMIN = "ADMIN",
}

export interface BaseEntity {
  createdAt: Date;
  updatedAt: Date;
}
export interface User extends BaseEntity {
  id: string;
  email: string;
  role: Role;
  profilePicture?: string;
}

export interface Admin extends User {
  firstName: string;
  lastName: string;
}

export interface Student extends User {
  profileTitle?: string;
  firstName: string;
  lastName: string;
  school?: string;
  tel?: string;
  location: Location | null;
  links?: Links;
  profileDescription: string | null;
  experiences?: Experience[];
  formations?: Formation[];
  projects?: Project[];
  certificates?: Certificat[];
}


export interface StudentRequest {
  profileTitle?: string;
  firstName: string;
  lastName: string;
  school?: string;
  tel?: string;
  location: Location | null;
  links?: Links;
  profileDescription: string | null;
}

export interface Company extends User {
  name: string;
  location: Location;
  description: string;
  ice: string;
  rc: string;
  phone: string;
  size: string;
  links?: Links;
  internships?: Internship[];
}

export enum WorkMode {
  REMOTE = "REMOTE",
  ON_SITE = "ON_SITE",
  HYBRID = "HYBRID",
}

export enum InternshipType {
  PFA = "PFA",
  PFE = "PFE",
  INITIATION = "INITIATION",
}

export enum SalaryType {
  YEAR = "YEAR",
  MONTH = "MONTH",
  HOUR = "HOUR",
}

export interface Internship {
  id: string;
  company?: Company;
  createdAt: Date;
  description: string;
  duration: number;
  salary: number;
  salaryType: SalaryType;
  title: string;
  workMode: WorkMode;
  tags: InternshipType[];
  skills: string[];
  negotiable: boolean;
  paid: boolean;
  likes: string[];
  applicants: Student[];
}

export interface Application {
  id : string ; 
  student : Student;
  internship : Internship;
  status: ApplicationStatus;
  applicationDate : Date;
  motivationLetter?: string;
  cv?: string;
  interviewDate?: Date;
  interviewDescription? : string;
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export const getColorsByApplicationStatus = (status : ApplicationStatus ) => {
  switch (status) {
    case ApplicationStatus.ACCEPTED:
      return "bg-green-500 hover:bg-green-600";
    case ApplicationStatus.REJECTED:
      return "bg-red-500 hover:bg-red-600";
    case ApplicationStatus.PENDING:
      return "bg-blue-500 hover:bg-blue-600"
  }
};


export interface InternshipRequest {
  companyId?: string;
  description: string;
  duration: number;
  salary: number;
  salaryType: SalaryType;
  domain: string;
  title: string;
  workMode: WorkMode;
  tags: InternshipType[];
  skills: string[];
  negotiable: boolean;
  paid: boolean;
}

export enum flagSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

type BadgeVariant = "default" | "destructive" | "secondary" | "outline";

export const severityMap: Record<flagSeverity, BadgeVariant> = {
  [flagSeverity.HIGH]: "destructive",
  [flagSeverity.MEDIUM]: "secondary",
  [flagSeverity.LOW]: "outline",
};


export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Record<string, string>;
}


export interface Experience {
  id: string,
  poste: string,
  startDate: string,
  endDate: string,
  company: Company,
  description: string,
}

export type ExperienceRequest = {
  poste: string,
  startDate: string,
  endDate: string,
  description: string,
  companyId: string,
  studentId: string,
}

export interface Formation {
  id: string,
  domain: string,
  diploma: string,
  startDate: string,
  endDate: string,
  company: Company,
}

export type FormationRequest = {
  domain: string,
  diploma: string,
  startDate: string,
  endDate: string,
  companyId: string,
  studentId: string,
}


export interface Project {
  id: string;
  title: string;
  image: string;
  link: string;
}

export type ProjectRequest = {
  title: string;
  image: string;
  link: string;
  studentId: string;
}

export interface Certificat {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
}

export type CertificatRequest = {
  title: string;
  thumbnail: string;
  date: string;
  studentId: string;
}

export interface Location {
  address: string;
  city: string;
  country: string;
}
export interface FlaggedStudentOverview {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  unresolvedFlagsCount: number;
  lastFlagDate: Date;
}
export type ReportStatus = "IGNORED" | "UNRESOLVED" | "WARNED";

export const reportStatusMap = (reportStatus: ReportStatus) => {
  switch (reportStatus) {
    case "IGNORED":
      return "outline";
    case "UNRESOLVED":
      return "secondary";
    case "WARNED":
      return "destructive";
    default:
      return "default";
  }
};

export interface StudentFlag {
  id: string;
  reason: string;
  description: string;
  date: Date;
  reportStatus: ReportStatus;
  studentId: string;
  companyId: string;
  firstName: string;
  lastName: string;
  companyName: string;
  studentEmail: string;
  companyEmail: string;
  screenshots: string[];
}
