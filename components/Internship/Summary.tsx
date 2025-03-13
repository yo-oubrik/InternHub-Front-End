import React from "react";
import { useInternship } from "@/context/internshipContext";
import { WorkMode, SalaryType, InternshipType } from "@/types/types";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  GraduationCap,
  Code2,
  FileText,
  Building,
  MapPinned,
  Calendar,
  Wallet,
  GraduationCap as GraduationCapIcon,
  Code,
  FileText as FileTextIcon,
  Home,
  Building2 as Office,
  Laptop
} from "lucide-react";
import { formatWorkMode, formatSalary, formatLocation, formatDuration, formatTitle, formatTags, formatSkills, formatDescription } from "@/utils/Formating";

function Summary() {
  const {
    InternshipTitle,
    internshipDescription,
    salaryType,
    activeInternshipType,
    salary,
    duration,
    location,
    skills,
    tags,
    negotiable,
    renumerated,
  } = useInternship();

  

  const getWorkModeIcon = () => {
    switch (activeInternshipType) {
      case WorkMode.REMOTE:
        return <Laptop className="w-4 h-4" />;
      case WorkMode.ON_SITE:
        return <Office className="w-4 h-4" />;
      case WorkMode.HYBRID:
        return <Building2 className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };
  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="p-6 bg-background border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Internship Summary</h3>
            <p className="text-sm text-muted-foreground">
              Please review all the details before posting the internship.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="p-6 bg-background border border-border rounded-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-semibold">Basic Information</h4>
            <p className="text-sm text-muted-foreground">
              Core details about the internship position
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg mt-1">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <div>
                <Label className="text-sm font-medium">Title</Label>
                <p className="text-sm text-muted-foreground mt-1">{formatTitle(InternshipTitle)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg mt-1">
                <GraduationCapIcon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <Label className="text-sm font-medium">Type</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formatTags(tags) === "Not set" ? (
                    <span className="text-sm text-muted-foreground">Not set</span>
                  ) : (
                    (formatTags(tags) as InternshipType[]).map((tag: InternshipType, index: number) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 text-primary rounded-lg mt-1">
                {getWorkModeIcon()}
              </div>
              <div>
                <Label className="text-sm font-medium">Work Mode</Label>
                <p className="text-sm text-muted-foreground mt-1">{formatWorkMode(activeInternshipType)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg mt-1">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <Label className="text-sm font-medium">Duration</Label>
                <p className="text-sm text-muted-foreground mt-1">{formatDuration(duration)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location & Compensation Section */}
      <div className="p-6 bg-background border border-border rounded-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MapPinned className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-semibold">Location & Compensation</h4>
            <p className="text-sm text-muted-foreground">
              Where the internship takes place and compensation details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg mt-1">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <Label className="text-sm font-medium">Location</Label>
              <p className="text-sm text-muted-foreground mt-1">{formatLocation(location)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg mt-1">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <div>
              <Label className="text-sm font-medium">Compensation</Label>
              <p className="text-sm text-muted-foreground mt-1">{formatSalary(renumerated, salary, salaryType, negotiable)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="p-6 bg-background border border-border rounded-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Code className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-semibold">Requirements</h4>
            <p className="text-sm text-muted-foreground">
              Skills and qualifications needed for the position
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg mt-1">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <div>
            <Label className="text-sm font-medium">Required Skills</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {formatSkills(skills) === "Not set" ? (
                <span className="text-sm text-muted-foreground">Not set</span>
              ) : (
                (formatSkills(skills) as string[]).map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="p-6 bg-background border border-border rounded-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileTextIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-semibold">Description</h4>
            <p className="text-sm text-muted-foreground">
              Detailed information about the internship role
            </p>
          </div>
        </div>

        {formatDescription(internshipDescription) === "Not set" ? (
          <p className="text-sm text-muted-foreground">Not set</p>
        ) : (
          <div
            className="text-sm text-muted-foreground prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: internshipDescription }}
          />
        )}
      </div>
    </div>
  );
}

export default Summary; 