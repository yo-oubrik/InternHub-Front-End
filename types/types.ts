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

  constructor(id: string, email: string, role: Role) {
    this.id = id;
    this.email = email;
    this.role = role;
  }
}

export class Admin extends User {
  firstName: string;
  lastName: string;
  profilePicture: string;
  constructor(id: string, email: string, role = Role.ADMIN, firstName: string, lastName: string, profilePicture: string) {
    super(id, email, role);
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePicture = profilePicture;
  }
}

export class Student extends User {
  firstName: string;
  lastName: string;
  profilePicture: string;
  ecole : string ; 
  constructor(id: string, email: string, role = Role.STUDENT, firstName: string, lastName: string, profilePicture: string , ecole : string ) {
    super(id, email, role);
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePicture = profilePicture;
    this.ecole = ecole ; 
  }
}

export class Company extends User {
  name: string;
  address: string;
  createdAt: Date;
  description: string;
  ice: string;
  rc: string;
  domain: string;
  logo: string;
  phone: string;
  size: string;
  socialLinks?: CompanySocialLinks;
  updatedAt: Date;
  website: string;
  internships: Internship[] = [];

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
    website: string
  ) {
    super(id, email, Role.COMPANY);
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
  createdBy: string;
  company: Company | string;
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
  likes : string[];
  applicants : string[];

  constructor(
    id: string,
    createdBy: string,
    company: Company | string,
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
    likes: string[] = [] ,
    applicants : string[] = []
  ) {
    this.id = id;
    this.createdBy = createdBy;
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
    this.likes = likes ; 
    this.applicants = applicants ; 
  }
}