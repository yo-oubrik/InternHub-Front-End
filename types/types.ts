export type Links = {
  motivationLetter?: string;
  linkedin?: string;
  github? : string ; 
  cv? : string ; 
  website? : string ; 
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
  location : Location | null;
  links? : Links ;
  profileDescription : string | null ;
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
  location : Location | null;
  links? : Links ;
  profileDescription : string | null ;
}

export interface Company extends User {
  name: string;
  location: Location;
  applicationDate: Date;
  description: string;
  ice: string;
  rc: string;
  domain: string;
  phone: string;
  size: string;
  links?: Links;
  website: string;
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
  companyId?: string;
  createdAt: Date;
  description: string;
  duration: number;
  salary: number;
  salaryType: SalaryType;
  domain: string;
  location: string;
  title: string;
  updatedAt: Date;
  workMode: WorkMode;
  tags: InternshipType[];
  skills: string[];
  negotiable: boolean;
  renumerated: boolean;
  likes: string[];
  applicants: string[];
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

export interface FlaggedStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  reason: string;
  description: string;
  company: string;
  companyId: string;
  flaggedAt: Date;
  offerId: string;
  severity: flagSeverity;
  studentId: string;
  internshipTitle: string;
  internshipId: string;
  screenshots: string[];
}
export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Record<string, string>;
}


export interface Experience {
  id : string ,
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
  companyId : string,
  studentId : string,
}

export interface Formation {
  id : string,
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
  companyId : string,
  studentId : string,
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