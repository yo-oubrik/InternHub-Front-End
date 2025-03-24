import { WorkMode, SalaryType, InternshipType, Location } from "@/types/types";
  const formatWorkMode = ( activeInternshipType: WorkMode): string => {
    if (!activeInternshipType) return "Not set";
    return activeInternshipType === WorkMode.REMOTE
      ? "Remote"
      : activeInternshipType === WorkMode.ON_SITE
      ? "On site"
      : "Hybrid";
  };

const formatSalary = (renumerated: boolean, salary: number, salaryType: SalaryType, negotiable: boolean): string => {
    if (!renumerated) return "Not Renumerated";
    if (!salary) return "Not set";
    return `${salary} ${salaryType.toLowerCase()}${negotiable ? " (Negotiable)" : ""}`;
  };

  const formatLocation = (location: Location): string => {
    const parts = [location.address, location.city, location.country].filter(Boolean);
    if (parts.length === 0) return "Not set";
    return parts.join(", ");
  };

  const formatDuration = (duration: number): string => {
    if (!duration) return "Not set";
    return `${duration} months`;
  };

  const formatTitle = (InternshipTitle: string): string => {
    if (!InternshipTitle) return "Not set";
    return InternshipTitle;
  };

  const formatTags = (tags: InternshipType[]): InternshipType[] | "Not set" => {
    if (!tags || tags.length === 0) return "Not set";
    return tags;
  };

  const formatSkills = (skills: string[]): string[] | "Not set" => {
    if (!skills || skills.length === 0) return "Not set";
    return skills;
  };

  const formatDescription = (internshipDescription: string): string => {
    if (!internshipDescription) return "Not set";
    return internshipDescription;
  };

  export { formatWorkMode, formatSalary, formatLocation, formatDuration, formatTitle, formatTags, formatSkills, formatDescription };

