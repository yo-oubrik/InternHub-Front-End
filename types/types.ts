
export type CompanySocialLinks = {
  linkedin?: string;
  twitter?: string;
};

export enum Role {
  STUDENT = "STUDENT",
  COMPANY = "COMPANY",
  ADMIN = "ADMIN",
}

export abstract class User {
  id: string;
  email: string;
  role: Role;
  joinedAt: Date;

  constructor(id: string, email: string, role: Role, registredAt: Date) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.joinedAt = registredAt;
  }
}

export class Admin extends User {
  firstName: string;
  lastName: string;
  profilePicture: string;
  constructor(id: string, email: string, firstName: string, lastName: string, profilePicture: string, joinedAt: Date) {
    super(id, email, Role.ADMIN, joinedAt);
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePicture = profilePicture;
  }
}

export class Student extends User {
  firstName: string;
  lastName: string;
  profilePicture: string;
  school: string;
  constructor(id: string, email: string, role = Role.STUDENT, firstName: string, lastName: string, profilePicture: string, school: string) {
    super(id, email, role);
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePicture = profilePicture;
    this.school = school;
  }
}

export interface StudentToRemove {
  id: string;
  firstName: string;
  lastName: string;
}
export class Company extends User {
  name: string;
  address: string;
  createdAt: Date;
  applicationDate: Date;
  description: string;
  ice: string;
  rc: string;
  domain: string;
  logo: string;
  phone: string;
  size: string;
  socialLinks?: CompanySocialLinks;
  updatedAt?: Date;
  website: string;
  internships?: Internship[] = [];

  constructor(
    id: string,
    email: string,
    logo: string,
    name: string,
    address: string,
    createdAt: Date,
    description: string,
    ice: string,
    rc: string,
    domain: string,
    phone: string,
    size: string,
    updatedAt: Date,
    website: string,
    joinedAt: Date,
    applicationDate: Date
  ) {
    super(id, email, Role.COMPANY, joinedAt);
    this.name = name;
    this.logo = logo;
    this.address = address;
    this.createdAt = createdAt;
    this.description = description;
    this.ice = ice;
    this.rc = rc;
    this.domain = domain;
    this.logo = logo;
    this.phone = phone;
    this.size = size;
    this.updatedAt = updatedAt;
    this.website = website;
    this.applicationDate = applicationDate;
  }
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

export class Internship {
  id: string;
  company: Company;
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

  constructor(
    id: string,
    company: Company,
    createdAt: Date,
    description: string,
    duration: number,
    salary: number,
    salaryType: SalaryType,
    domain: string,
    location: string,
    title: string,
    updatedAt: Date,
    workMode: WorkMode,
    tags: InternshipType[],
    skills: string[],
    negotiable: boolean,
    renumerated: boolean,
    likes: string[] = [],
    applicants: string[] = []
  ) {
    this.id = id;
    this.company = company;
    this.createdAt = createdAt;
    this.description = description;
    this.duration = duration;
    this.salary = salary;
    this.salaryType = salaryType;
    this.domain = domain;
    this.location = location;
    this.title = title;
    this.updatedAt = updatedAt;
    this.workMode = workMode;
    this.tags = tags;
    this.skills = skills;
    this.negotiable = negotiable;
    this.renumerated = renumerated;
    this.likes = likes;
    this.applicants = applicants;
  }
}



export enum flagSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
export const severityMap = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
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